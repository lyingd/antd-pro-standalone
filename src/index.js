import 'ant-design-pro/dist/ant-design-pro.css'
import '@babel/polyfill'
import dva from 'dva'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createHistory from 'history/createHashHistory'
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading'
import 'moment/locale/zh-cn'
import FastClick from 'fastclick'
import './rollbar'
import onError from './error'
import routerConfig, { doPersist } from './router'

import './index.less'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['global', 'user'],
}

// 1. Initialize
const app = dva({
  onReducer: (rootReducer) => {
    const newReducer = persistReducer(persistConfig, rootReducer)
    doPersist()
    return newReducer
  },
  history: createHistory(),
  onError,
})

// 2. Plugins
app.use(createLoading())

// 3. Register global model
app.model(require('./models/global'))

// 4. Router
app.router(routerConfig)

// 5. Start
app.start('#root')

FastClick.attach(document.body)
