import React from 'react'
import Route from 'src/components/Route'

export default
  <Route name="帐户" path="/user" icon="user" layout="UserLayout" page={() => import('src/layouts/UserLayout')}>
    <Route name="登录" path="/login" models={['/login']} page={() => import('src/pages/User/Login')} />
    <Route name="注册" path="/register" models={['/register']} page={() => import('src/pages/User/Register')} />
    <Route name="注册结果" path="/register-result" page={() => import('src/pages/User/RegisterResult')} />
  </Route>

