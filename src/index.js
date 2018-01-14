import 'ant-design-pro/dist/ant-design-pro.css'
import '@babel/polyfill'
import dva from 'dva'

import createHistory from 'history/createHashHistory'
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading'
import 'moment/locale/zh-cn'
import FastClick from 'fastclick'
import './rollbar'
import onError from './error'

import './index.less'
// 1. Initialize
const app = dva({
  history: createHistory(),
  onError,
})

// 2. Plugins
app.use(createLoading())

// 3. Register global model
app.model(require('./models/global'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
FastClick.attach(document.body)
