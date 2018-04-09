import fs from 'fs'
import path from 'path'
import { proxy } from './mock/utils'
import isString from 'lodash/isString'

const methodFilter = method => (pathname, req) => {
  return method ? req.method === method : true;
}

const parseMocks = (mocks) => {
  if (!mocks) {
    return {}
  }
  return mocks.reduce((acc, [key, value]) => {
    let [method, uri] = key.split(/\s+/)
    if (!uri) {
      uri = method
      method = null
    }
    const { target } = value
    acc[uri] = isString(target)
      ? {
        target,
        changeOrigin: true,
      }
      : {
        changeOrigin: true,
        ...target,
      }
    return acc
  }, {})
}

const proxyMock = fs.readdirSync(path.join(__dirname + '/mock'))
  .filter(file => file !== 'utils.js' && file.endsWith('.js'))
  .reduce((acc, file) => {
    const module = require('./mock/' + file)
    let mocks = (module.default || module)
    for (const key in mocks) {
      if (proxy.is(mocks[key])) {
        acc.push([key, mocks[key]])
      }
    }
    return acc
  }, [])

const proxyObject = parseMocks(proxyMock)
// console.log('所有代理接口：')
// console.log(Object.keys(proxyMock))

export default {
  proxy: proxyObject,
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['module-resolver', { 
      'alias': {
        'src': './src'
			}
		}],
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
  ],
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr'
      ],
      devtool: 'cheap-module-eval-source-map'
    },
    // production: {
    //   devtool: 'source-map'
    // }
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs'
  },
  publicPath: '/',
  disableDynamicImport: false,
  hash: true
}
