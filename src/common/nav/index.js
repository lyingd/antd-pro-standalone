import React from 'react'
import Route from 'src/components/Route'
import dynamic from 'dva/dynamic'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import Home from './home'
import Login from './login'

// models和routes都支持多层目录
const dynamicWrapper = (app, models, page) => dynamic({
  app,
  models: () => models.map(m => import(`../../models/${m.replace(/^\/+/, '')}.js`)),
  component: isString(page) ? () => import(`../../routes/${page.replace(/^\/+/, '')}`) : page,
})

// 纯json方式配置多重路由
const parseStaticNavData = (staticNavDatas, app) => staticNavDatas.map((navData) => {
  const { children, ...props } = navData.props
  if (props.page) {
    props.component = dynamicWrapper(app, props.models || [], props.page)
  }
  if (children) {
    props.children = parseStaticNavData(isArray(children)
      ? children
      : isArray(children.type)
        ? children.type
        : [children], app)
  }
  return props
})

const Router = [
  Home,
  Login,
  <Route menu={false} name="" layout="BlankLayout">
    <Route name="使用文档" icon="book" target="_blank" path="http://pro.ant.design/docs/getting-started" />
  </Route>,
]

// nav data
export default Router
