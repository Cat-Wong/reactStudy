- -D等于--save-dev -S等于--save
- -D和-S两者区别：-D是你开发时候依赖的东西，--S 是你发布之后还依赖的东西
- -g是全局安装，方便我们后面使用webpack命令（全局安装后依然不能使用的小伙伴，检查下自己的环境变量PATH）
- npm  install 简写npm i

### init项目  

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
-  新建`webpack.dev.config.js`


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


-  根目录创建`src`文件夹
-  新建`index.js`

```
document.getElementById('app').innerHTML = "Hello Word";
```

### 测试webpack打包
-  根目录创建`dist`文件夹
-  新建`index.html`

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
webpack4需要我们指定mode的类型来区分开发环境和生产环境

`webpack.dev.config.js`里面添加`mode`属性

```
entry: path.join(__dirname, '../src/index.js'),
mode:'development',
```

### babel
babel是高级版本的JavaScript 向下编译成兼容版本的JavaScript

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

- webpack配置

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

之前使用的是本地磁盘路径，并不是ip+端口的形式，

接下来我们引入webpack-dev-server来启动一个简单的服务器。

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
注：使用Link组件改变当前路由

- 接下来在是`src` 新建 `router.js `

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

### proxy代理
devServer下有个proxy属性可以设置我们的代理

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

请求到` /api/users` 现在会被代理到请求`http://localhost:8000/users`（注意这里的第二个属性，它将'/api'替换成了''）

`changeOrigin: true`可以帮我们解决跨域的问题。



```
// cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
```


### devtool优化
当启动报错或者像打断点的时候，会发现打包后的代码无从下手。我们在webpack里面添加

然后就可以在srouce里面能看到我们写的代码，也能打断点调试哦~

```
devtool: 'inline-source-map'
```


### 文件路径优化
使用webpack提供的alias 别名配置

看这里：切记名称不可声明成你引入的其他包名

别名的会覆盖你的包名，导致你无法引用其他包。举个栗子：redux、react等

```
//=======
//可以直接向这样些
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
