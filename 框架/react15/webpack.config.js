//webpackage.config.js
const webpack = require('webpack'); //增加导入webpack
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, './'),
    publicPath: '/',
    host: '127.0.0.1',
    port: 3000,
    stats: {
      colors: true
    }
  },
  entry: ['./index.js', './dev.js'],
  // 将 jsx 添加到默认扩展名中，省略 jsx
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/, // jsx文件的正则
      exclude: /node_modules/, // 排除 node_modules 文件夹
      use: {
        // loader 是 babel
        loader: 'babel-loader',
        options: {
          // babel 转义的配置选项
          babelrc: false,
          presets: [
            // 添加 preset-react
            require.resolve('@babel/preset-react'),
            [require.resolve('@babel/preset-env'), {
              modules: false
            }]
          ],
          cacheDirectory: true
        }
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
};