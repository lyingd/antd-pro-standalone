import { createElement } from 'react'
import dynamic from 'dva/dynamic'
import memoize from 'lodash/memoize'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import { notification } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { getMenuData } from './menu'
import nav from './nav'

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1)
  })

let routerDataCache

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model.substring(1)}`).default)
      }
    })
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      })
    }
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m.substring(1)}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return component().then(raw => {
        const Component = raw.default || raw
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          })
      })
    },
  })
}
// const dynamicWrapper = (app, models, component) => {
//   return dynamic({
//     app,
//     models: () => models.filter(
//       model => modelNotExisted(app, model)).map(m => import(`../models${m}.js`)
//     ),
//     component: () => {
//       const page = isString(component) ? () => import(`../pages${component}`) : component
//       return page().then((raw) => {
//         const Component = raw.default || raw
//         return props => createElement(Component, {
//           ...props,
//           routerData: getRouterData(app),
//         })
//       })
//     },
//   })
// }

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

function alertRouteError(description) {
  notification.error({
    message: '路由错误',
    description,
    duration: 0,
  })
  throw new Error(description)
}

function innerFlatNavData(navDatas, parentPath, app) {
  return navDatas.reduce((acc, navData) => {
    const { name, children, path = '', models, page } = navData.props
    if (path && !path.startsWith('http') && !path.startsWith('/')) {
      alertRouteError(`${name || page}-> path[${path}] should starts with "/" or "http" or "https"`)
    }
    if (isString(page) && !page.startsWith('/')) {
      alertRouteError(`${name || path}-> page[${page}] should starts with "/"`)
    }
    if (isArray(models) && models.some(model => !model.startsWith('/'))) {
      alertRouteError(
        `${name || path || page}-> models[${models.join(', ')}] should starts with "/"`
      )
    }
    const fullPath = `${parentPath}${path}`.replace(/\/+/g, '/')
    const ret = {}
    if (page) {
      ret[fullPath] = {
        component: dynamicWrapper(app, models || [], page),
      }
    }
    let childrenRet = {}
    if (children) {
      childrenRet = innerFlatNavData(
        isArray(children) ? children : isArray(children.type) ? children.type : [children],
        fullPath,
        app
      )
    }
    return {
      ...acc,
      ...ret,
      ...childrenRet,
    }
  }, {})
}
const getFlatNavData = memoize(innerFlatNavData)

export const getRouterData = memoize(app => {
  const routerConfig = getFlatNavData(nav, '', app)
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())
  const routerData = {}
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))
    let menuItem = {}
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    }
    routerData[path] = router
  })
  return routerData
})
