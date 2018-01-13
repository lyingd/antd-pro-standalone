import { createElement } from 'react'
import dynamic from 'dva/dynamic'
import memoize from 'lodash/memoize'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import { notification } from 'antd'
import { getMenuData } from './menu'
import nav from './nav'

let routerDataCache

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1)
  })
)

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  const page = isString(component) ? () => import(`../routes${component}`) : component
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (page.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models${model}`).default);
      }
    })
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return createElement(page().default, {
        ...props,
        routerData: routerDataCache,
      })
    }
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return page().then((raw) => {
        const Component = raw.default || raw
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        })
      })
    },
  })
}

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach((item) => {
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
      alertRouteError(`${name || path || page}-> models[${models.join(', ')}] should starts with "/"`)
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
      childrenRet = innerFlatNavData(isArray(children)
        ? children
        : isArray(children.type)
          ? children.type
          : [children], fullPath, app)
    }
    return {
      ...acc,
      ...ret,
      ...childrenRet,
    }
  }, {})
}
const getFlatNavData = memoize(innerFlatNavData)

export const getRouterData = (app) => {
  const routerConfig = getFlatNavData(nav, '', app)
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())
  const routerData = {}
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {}
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    }
  })
  return routerData
}
