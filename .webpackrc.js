const path = require('path');
export default {
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
  disableDynamicImport: false,
  hash: true
}
