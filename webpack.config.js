const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')

export default function(config) {
  // eslint-disable-next-line
  config.entry.vendor = [
    '@babel/polyfill',
    'react',
    'classnames',
    'react-dom',
    'moment',
    'numeral',
    'bizcharts',
    '@antv/data-set',
  ]
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    })
  )
  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    })
  )
  return config
}
