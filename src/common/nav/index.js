import React from 'react'
import Route from 'src/components/Route'
import Home from './home'
import Login from './login'

const Router = [
  Home,
  Login,
  <Route menu={false} name="" layout="BlankLayout">
    <Route name="使用文档" icon="book" target="_blank" path="http://pro.ant.design/docs/getting-started" />
  </Route>,
]

// nav data
export default Router
