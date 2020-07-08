- -D 等于--save-dev -S 等于--save
- -D 和-S 两者区别：-D 是你开发时候依赖的东西，--S 是你发布之后还依赖的东西
- -g 是全局安装，方便我们后面使用 webpack 命令（全局安装后依然不能使用的小伙伴，检查下自己的环境变量 PATH）
- npm install 简写 npm i

### init 项目

```
npm init
```

可以填写项目信息，或者一路回车

### webpack

```
npm install -g webpack  全局安装webpack
npm install webpack -D
npm install webpack-cli -D
```

- 根目录创建`build`文件夹
- 新建`webpack.dev.config.js`

```
const path = require('path');
module.exports = {
    /*入口*/
    entry: path.join(__dirname, '../src/index.js'),
    /*输出到dist目录，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    }
};
```

- 根目录创建`src`文件夹
- 新建`index.js`

```
document.getElementById('app').innerHTML = "Hello Word";
```

### 测试 webpack 打包

- 根目录创建`dist`文件夹
- 新建`index.html`

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="./bundle.js" charset="utf-8"></script>
</body>
</html>
```

运行命令
`webpack --config ./build/webpack.dev.config.js`

可以看到`dist`文件夹下生成了一个`bundle.js`

接下来在浏览器打开 `dist`文件下的 `index.html` 就可以看到 hello word 了

### mode

webpack4 需要我们指定 mode 的类型来区分开发环境和生产环境

`webpack.dev.config.js`里面添加`mode`属性

```
entry: path.join(__dirname, '../src/index.js'),
mode:'development',
```

### babel

babel 是高级版本的 JavaScript 向下编译成兼容版本的 JavaScript

这一过程叫做“源码到源码”编译， 也被称为转换编译。

- 安装

```
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

- 新建`babel`文件 这里有两种不同方式新建`babel`的配置文件

1. 根目录新建 `babel`的配置文件`babel.config.js`

```
const babelConfig = {
   presets: ["@babel/preset-react", "@babel/preset-env"],
    plugins: []
}
module.exports = babelConfig;
```

2.新建`babel`配置文件`.babelrc`

```
  {
    "presets": [
    "es2015",
    "react",
    "stage-0"
    ],
    "plugins": []
  }
```

- webpack 配置

在`webpack.dev.config.js` 中增加 `babel-loader`

```
/*src目录下面的以.js结尾的文件，要使用babel解析*/
/*cacheDirectory是用来缓存编译结果，下次编译加速*ra
module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, '../src')
    }]
}
```

- 测试

修改`src/index.js`

```
 /*使用es6的箭头函数*/
  var func = str => {
    document.getElementById('app').innerHTML = str;
  };
  func('我现在在使用Babel!');
```

在执行打包命令

```
webpack --config ./build/webpack.dev.config.js
```

刷新 `dist` 下的`index.html`

### react

- 安装

```
npm i react react-dom -S
```

-测试

修改`src/index.js`

```
 /*使用es6的箭头函数*/
import React from 'react';
import ReactDom from 'react-dom';
ReactDom.render(
  <div>Hello React!</div>, document.getElementById('app')
);
```

在执行打包命令
`webpack --config ./build/webpack.dev.config.js`

刷新 `dist` 下的`index.html`

### 打包命令优化

修改`package.json` 下的`script`对象，增加`build`属性

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/webpack.dev.config.js"
  },
```

### 启动命令优化

之前使用的是本地磁盘路径，并不是 ip+端口的形式，

接下来我们引入 webpack-dev-server 来启动一个简单的服务器。

- 安装

```
npm i webpack-dev-server -D
```

- 修改`webpack.dev.config.js`，增加`webpack-dev-server`配置

```
// webpack-dev-server
devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,  // gzip压缩
    host: '0.0.0.0', // 允许ip访问
    hot:true, // 热更新
    historyApiFallback:true, // 解决启动后刷新404
    port: 8000 // 端口
},
新建启动命令 修改packpage.json
"dev": "webpack-dev-server --config ./build/webpack.dev.config.js",
```

现在想要运行项目直接 `npm run dev` 就行了

### react-router

- 安装

```
npm install --save react-router-dom
```

- 新建页面文件

在`src`下新建`pages`文件夹。然后在新建`home`和`page`两个文件夹，分别在里面新建`index.js`

```
   src
    └─pages
      │
      ├─home
      │  │   index.js
      │
      └─page
         │  index.js

```

```
src/pages/home/index.js
```

```
import React from 'react'
class Home extends React.PureComponent{
  render(){
    return (
      <div>
        this is home
      </div>
    )
  }
}

export default Home
```

```
src/pages/page/index.js
```

```
import React from 'react'
class Page extends React.PureComponent{
  render(){
    return (
      <div>
        this is page
      </div>
    )
  }
}
export default Page
```

- 两个页面搭建好之后，开始创建菜单组件

```
components/Nav/index.js
```

```
import React from 'react'
import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';
export default ()=>{
  return (
    <div>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/page">page</Link></li>
      </ul>
    </div>
  )
}
```

注：使用 Link 组件改变当前路由

- 接下来在是`src` 新建 `router.js`

```
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// 引入页面
import Home from './pages/home';
import Page from './pages/page';

// 路由
const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page" component={Page}/>
    </Switch>
);

export default getRouter;
```

- 然后修改 `src/index.js`

```
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from './components/Nav';
import getRouter from './router';

ReactDom.render(
    <Router>
        <Nav/>
        {getRouter()}
    </Router>,
    document.getElementById('app')
)
```

- 测试

```
 npm run dev
```

### proxy 代理

devServer 下有个 proxy 属性可以设置我们的代理

```
  // webpack-dev-server
  devServer: {
   ...
    proxy: { // 配置服务代理
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },  //可转换
        changeOrigin: true
      }
    },
    port: 8000 // 端口
  },
```

在`localhost:8000` 上有后端服务的话，你可以这样启用代理

请求到`/api/users` 现在会被代理到请求`http://localhost:8000/users`（注意这里的第二个属性，它将'/api'替换成了''）

`changeOrigin: true`可以帮我们解决跨域的问题。

```
// cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
```

### devtool 优化

当启动报错或者像打断点的时候，会发现打包后的代码无从下手。我们在 webpack 里面添加

然后就可以在 srouce 里面能看到我们写的代码，也能打断点调试哦~

```
devtool: 'inline-source-map'
```

### 文件路径优化

使用 webpack 提供的 alias 别名配置

看这里：切记名称不可声明成你引入的其他包名

别名的会覆盖你的包名，导致你无法引用其他包。举个栗子：redux、react 等

```
//=======
//可以直接向这样写
resolve: {
    alias: {
        pages: path.join(__dirname, '../src/pages'),
        components: path.join(__dirname, '../src/components'),
        router: path.join(__dirname, '../src/router')
    }
}

//============
//或者可以在webpack中增加一个方法（vue-cli）就是这种
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

resolve: {
    alias: {
      '@': resolve('src'),
      '&': resolve('src/components'),
      'api': resolve('src/api'),
      'assets': resolve('src/assets')
    }
  },

```

然后 router.js 的路径就可以修改为

```
// 引入页面（修改前）
import Home from './pages/home';
import Page from './pages/page';

// 引入页面（修改后）
import Home from 'pages/home';
import Page from 'pages/page';

//或者（修改后）
import Home from '@/pages/home';
import Page from '@/pages/page';

```

### redux

详细访问 reduxStudy

[https://github.com/Cat-Wong/reduxStudy](https://github.com/Cat-Wong/reduxStudy)

### Html-Webpack-Plugin

plugin 是 webpack 的扩展功能（构建相关）

作用有两个.

1. 为 html 文件中引入的外部资源，如：script，link 等，每次添加 compile 后的 hash，防止引用缓存
2. 生成 html 的入口文件，比如单页面生成一个 html 文件入口，配置多个 plugin 可以生成多个

- 安装

```
    npm i html-webpack-plugin -D
```

- 注释`webpack`下的`contentBase`配置
- 根目录下新建`pubilc`目录
- 将`dist`目录下的 html 模板放到`pubilc`
- 接下来，在 webpack.dev.config.js 加入 plugin 的配置,去掉 html 模板内 bundle.js 的引入

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',  //生成html文件的标题
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',  //输出的html的文件名称
      template: path.join(__dirname, '../public/index.html')  //html模板所在的文件路径
    }),
  ]
```

接下来每次启动都会使用 plugin,webpack 打包后的 js 会自动注入 html 模板中

### css loader

以 less 为例

- 安装

```
 npm install stylus stylus-loader less less-loader sass-loader node-sass css-loader style-loader -D
```

```
 css-loader主要的作用是解析css文件, 像@import等动态语法
 style-loader主要的作用是解析的css文件渲染到html的style标签内
 stylus、less、sass是CSS的常见预处理器
 stylus-loader、less-loader、sass-loader主要是将其对应的语法转换成css语法
```

- 修改`webpack.config.js`配置

```
  module: {
    rules: [
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']  //顺序需要 style->css->less
    }]
  }
```

### CSS Modules 样式私有化

CSS Modules 会将页面中的 calss 转为一个唯一的 class 名字

#### <u>注意'localIdentName'从'css-loader3.0'之后变为了'modules'的一个属性</u>


https://webpack.js.org/loaders/css-loader/

- 页面中class名使用对象的写法

```
import style from './style.css'

class Home extends React.PureComponent{
  render(){
    return (
      <div className={style.nameDiv}>
        this is home
      </div>
    )
  }
}
export default Home

```
- 更新`webpack.config.js`中`css-loader`配置
```
 // "css-loader",
    {
      loader:'css-loader',
      options: {
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        }
      }
    },
```

### CSS 的 PostCSS 优化
自动给css规则添加浏览器的前缀,解决浏览器的兼容问题
- 安装

```
npm install postcss-loader postcss-cssnext -D
```
- `webpack.config.js`中增加`postcss-loader`配置
```
{
  test: /\.less$/,
    use: ["style-loader",
      {
        loader:'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          }
        }
      },
        "less-loader","postcss-loader"]
}
```
- 根目录下增加`postcss.config.js`
```
module.exports = {
    plugins: {
        'postcss-cssnext': {}
    }
};
```

### 图片的加载
- 安装 loader
```
npm install url-loader file-loader -D
```
- `webpack.config.js`中增加图片loader
顺便配置静态文件夹的别名assets
```
{
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }]
}
```
options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
然后在页面中引入图片
```
import jpg from 'assets/a.jpg'

<img src={jpg} style={{width: 50+'px'}}/>
```