const path = require('path');

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
  }
};
