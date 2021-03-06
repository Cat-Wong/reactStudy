const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

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

  /*babel*/
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.less$/,
        use: ["style-loader",
          // "css-loader",
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              }
            }
          },
          "less-loader", "postcss-loader"]
      },
      { test: /\.(png|jpg|gif)$/, 
        use: [
          { loader: 'url-loader', options: { limit: 8192 } }
        ]
      }
    ]
  },

  // webpack-dev-server
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    compress: true,  // gzip压缩
    host: '0.0.0.0', // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    proxy: { // 配置服务代理
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },  //可转换
        changeOrigin: true
      }
    },
    port: 8000 // 端口
  },


  /*devtool优化*/
  devtool: 'inline-source-map',
  /*路径优化 使用webpack提供的alias */
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '&': resolve('src/components'),
      'actions': resolve('src/redux/actions'),
      'reducers': resolve('src/redux/reducers'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components'),
      'router': resolve('src/router'),
      'assets': resolve('src/assets')
    }
  },

  /*HtmlWebpackPlugin优化*/
  plugins: [new HtmlWebpackPlugin({
    minify: { // 压缩HTML文件
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符与换行符
      minifyCSS: true// 压缩内联css
    },
    filename: 'index.html',
    template: path.join(__dirname, '../public/index.html')
  })],
};
