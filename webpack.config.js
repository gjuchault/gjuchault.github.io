const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './assets/', to: './assets/' }
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'gjuchault',
      filename: 'service-worker.js',
      minify: false,
      staticFileGlobs: [ '/index.html' ],
      mergeStaticsConfig: true
    }),
    new GenerateJsonPlugin('manifest.json', {
      'short_name': 'Gabriel Juchault',
      'name': 'Gabriel Juchault Personal website',
      'icons': [],
      'start_url': '/index.html',
      'display': 'standalone',
      'orientation': 'landscape'
    })
  ])
}
