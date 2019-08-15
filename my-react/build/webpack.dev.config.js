const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /*入口*/
  entry: path.join(__dirname, '../src/index.js'),

  /*区分开发环境和生产环境*/
  mode: 'development',
  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  // webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,  // gzip压缩
    host: '0.0.0.0', // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    port: 8000 // 端口
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, '../src/index.html')
  })],
};
