const webpack = require('webpack')

export default function(config) {
  // eslint-disable-next-line
  // config.entry.vendor = [
  //   '@babel/polyfill',
  //   'react',
  //   'react-dom',
  //   'moment',
  //   'numeral',
  //   'bizcharts',
  //   '@antv/data-set',
  // ]
  // config.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: Infinity,
  //   })
  // )
  return config
}
