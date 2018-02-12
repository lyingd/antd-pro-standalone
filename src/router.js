import React from 'react'
import { Router, Switch } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import { persistStore, REHYDRATE } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getRouterData } from './common/router'
import Authorized from './utils/Authorized'
import styles from './index.less'

const { AuthorizedRoute } = Authorized

const Loading = <Spin size="large" className={styles.globalSpin} />
dynamic.setDefaultLoadingComponent(() => Loading)

let persistor
export const getPersistor = (store) => {
  if (!persistor) {
    persistor = persistStore(store)
  }
  if (process.env.NODE_ENV !== 'production') {
    // hmr时，如果不dispatch REHYDRATE，会导致
    // PersistGate的子元素不渲染，页面展示空白
    persistor.dispatch({
      type: REHYDRATE,
    })
  }
  return persistor
}
export const doPersist = () => {
  if (persistor) {
    setTimeout(() => persistor.persist(), 100)
  } else {
    setTimeout(() => doPersist(), 100)
  }
}

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const UserLayout = routerData['/user'].component
  const BasicLayout = routerData['/'].component
  return (
    <PersistGate persistor={getPersistor(app._store)} loading={Loading}>
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
