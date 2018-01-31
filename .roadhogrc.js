import fs from 'fs'
import path from 'path'
import { proxy } from './mock/utils'
import isString from 'lodash/isString'
import httpProxy from 'http-proxy-middleware'

const methodFilter = method => (pathname, req) => {
  return method ? req.method === method : true;
};

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
    // acc[uri] = httpProxy(methodFilter, isString(target)
    //   ? {
    //     target,
    //     changeOrigin: true,
    //   }
    //   : {
    //     changeOrigin: true,
    //     ...target,
    //   })
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

const procyObject = parseMocks(proxyMock)
console.log(procyObject)
export default {
  entry: 'src/index.js',
  proxy: procyObject,
  extraBabelPlugins: [
      ['module-resolver', {
        alias: {
          'src': './src'
        }
      }],
      'transform-runtime',
      'transform-decorators-legacy',
      'transform-class-properties',
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ],
    env: {
      development: {
        extraBabelPlugins: [
          'dva-hmr'
        ],
        devtool: 'eval-source-map'
      },
      production: {
        devtool: 'source-map'
      }
    },
    ignoreMomentLocale: true,
    theme: './src/theme.js',
    html: {
      template: './src/index.ejs'
    },
    publicPath: '/',
    disableDynamicImport: true,
    hash: true
  }
