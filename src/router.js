import React from 'react'
import { routerRedux, Route, Switch } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getRouterData } from './common/router'
import Authorized from './utils/Authorized'
import styles from './index.less'
import { createPersistorIfNecessary } from './index'

const { ConnectedRouter } = routerRedux
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
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user" component={UserLayout} />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              authority={['admin', 'user']}
              redirectPath="/user/login"
            />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    </PersistGate>
  )
}

export default RouterConfig
