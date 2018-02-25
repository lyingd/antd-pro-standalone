import React from 'react'
import { Router, Switch } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getRouterData } from './common/router'
import Authorized from './utils/Authorized'
import styles from './index.less'
import { createPersistorIfNecessary } from './index'

const { AuthorizedRoute } = Authorized

const Loading = <Spin size="large" className={styles.globalSpin} />
dynamic.setDefaultLoadingComponent(() => Loading)

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const UserLayout = routerData['/user'].component
  const BasicLayout = routerData['/'].component
  return (
    <PersistGate persistor={createPersistorIfNecessary(app._store)} loading={Loading}>
      <LocaleProvider locale={zhCN}>
        <Router history={history}>
          <Switch>
            <AuthorizedRoute
              path="/user"
              render={props => <UserLayout {...props} />}
              authority="guest"
              redirectPath="/"
            />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              authority={['admin', 'user']}
              redirectPath="/user/login"
            />
          </Switch>
        </Router>
      </LocaleProvider>
    </PersistGate>
  )
}

export default RouterConfig
