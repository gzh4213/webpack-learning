# webpack 

## webpack 是一个模块打包工具，支持ES Module,CommonJS,CMD,AMD模块引入规范,起初只是一个js模块打包工具

## npm info webpack 查看webpack的版本历史


## loader

### webpack默认不支持打包png等格式，如果想支持，可以在配置文件中进行配置相应的loader，loader就是一个打包的方案，webpack本身不知道如何处理的文件，它知道如何把指定的文件进行怎样的打包

### url-loader 可以把图片直接已base64格式打包到js中, limit属性可以控制将小于此值的文件以base64的格式打包


> file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

> url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
 
> css-loader 会分析出css文件之间的关系，并合并成一段css

> style-loader 在得到css-loader生成的一段css后，会把其挂在到页面的head部分, 建议将style-loader和css-loader一起使用

> sass-loader 使用时还需安装node-sass

### loader的执行是有顺序的，按着从下到上，从右到左的顺序执行

> postcss-loader autoprefixer 为css3样式添加厂商前缀，在package.json中指定哪些浏览器添加前缀, 或者创建.browserslistrc配置文件
````
package.json

"browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]


.browserslistrc
not ie < 11
last 2 versions
> 1%
iOS 7
last 3 iOS versions
````

## plugin： 可以在webpack运行到某个时刻（webpack的生命周期，类似vue的生命周期）的时候帮你做一些事情

### htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html中
> template 属性：会以你引用的html模版为基础，生成html文件

### clean-webpack-plugin  会在打包之前把output目录清空


## sourceMap 他是一个映射关系。当代码报错时，可以定位到源代码的位置 例如：现在知道dist目录下main.js文件96行出错，sourceMap就会知道其对应的是src目录下index.js文件中第一行出错了

### cheap-module-eval-source-map 适用于开发环境

### cheap-module-source-map 适用于线上环境

> inline map文件不单独出现，会合并到打包文件中

> cheap 错误定位到行，不精确到列，只负责业务代码，不关心第三方模块

> module 映射第三方模块


## webpack --watch 可以实时监听文件变化，自动重新打包
## webpack-dev-server 不仅可以监听文件变化，自动重新打包，还可以自动刷新浏览器, 支持本地发起ajax请求，方便业务调试
## HMR 更新修改模块部分，写css时，不会重新刷新浏览器，方便调试；
### 开启HMR：devServer.hot 设为true，引入插件 `new webpack.HotModuleReplacementPlugin()`
```
devServer: {
    contentBase: './dist',  // 监听目录
    // open: true, // 是否自动打开浏览器
    port: 8080,
    hot: true,    // 开启hot module replacement
    // hotOnly: true, // 浏览器不自动刷新
},
```

## babel 
## 如果babel配置中使用了"useBuiltIns": "usage"，babel/polyfill 会被自动的引入打包文件中，则打包文件中不需要在引入 'import '@babel/polyfill'

## Tree shaking： 只打包import倒入文件中被使用的模块， 只支持ES Module的引入方式，ES Module底层是静态引入， CommonJs底层是动态引入

> mode: 'development'下，使用tree shaking会把没被使用的exports照样打包
> "sideEffects": false  --对所有模块使用tree shaking，"sideEffects": ["*.css"] -- css文件不使用tree Shaking
```
// 开启tree shaking
// 第一步
//webpack.config.js
optimization : {
  usedExports: true
}

// 第二步
// package.json
"sideEffects": ["*.css"]  // 某些文件不希望做tree shaking处理，没有则设置false

```
> mode: 'production'下不需在webpack中增加配置



## development 和 production模式的区分打包
### sourceMap 配置不同
### production 代码需要压缩

## 代码分割，和webpack无关，某些插件可以帮助实现代码分割
### webpack中实现代码分割，两种方式，默认只对异步代码进行代码分割
> 1.同步代码：只需要在webpack.common.js中做optimization的配置
```
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'async',  //async: 代码分割只对异步代码有效; all:
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        filename: 'vendors.js'
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}
```
> 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，分割代码会放置到新的文件中
### 异步加载中有一种魔法注释的语法，在做代码分割的时候，可以给拆分的文件重命名；格式：`/* webpackChunkName:"lodash"*/`
生成的文件名格式为： vendors~xxxx.js,

```` 
.babelrc

plugins: ['plugin-syntax-dynamic-import]
````
### 异步代码可实现懒加载

### chunk是什么

> 打包生成的每一个js文件都可叫做chunk
### 打包分析 http://webpack.github.io/analyse/，其他分析工具：https://v4.webpack.js.org/guides/code-splitting/#bundle-analysis

### preload
### prefetch 页面文件加载完成后，利用网络空闲预加载，使用migic comment,格式：`/* webpackPrefetch:"lodash"*/`

### 代码利用率 coverPage

### css分割 使用plugin： MiniCssExtractPlugin(线上使用)
参考： https://v4.webpack.js.org/plugins/mini-css-extract-plugin/
```
// webpack.config.js
plugins: [
  new MiniCssExtractPlugin({})
]
```
### css代码压缩：optimize-css-assets-webpack-plugin
```
optimization: {
  minimizer: [
    new OptimizeCssAssetsPlugin({})
  ]
}
```

### 浏览器缓存

### shiming 垫片

### 全局变量 webpack --env.prod

### 库打包

> 外部使用打包好的库可能会有很多使用方式，ES module，commonJS,AMD等等;libraryTarget 和 library可以配合使用，当libraryTarget为‘this‘,library变量会挂载到this上面，还可设置window，global（node环境）

````
// webpack.config.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library',    // 增加此配置，支持script标签引入，生成全局变量
    libraryTarget: 'umd'   // 增加此配置， 支持import require amd引入
  }
````

> 在库打包的时候 设置externals，可以忽略某些依赖的打包
```
// webpack.config.js
externals: ['lodash']

```

更多参考：https://v4.webpack.js.org/guides/author-libraries/

### PWA: 如果你访问一个网站，第一次成功了，第二次再访问挂掉了，pwa技术可以在你本地保留一份缓存，把之前的页面再展示出来

```
安装：workbox-webpack-pligin

// webpack.config.js
plugins: [
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
  })
]
```
> 在打包目录下会生成`service-worker.js` 和 `precache-manifest.js`文件

## 提升打包速度
* 跟上技术迭代（npm, node)
* 在尽可能少的模块上应用loader
* Plugin尽可能少使用，确保可靠性
* resolve 参数合理配置 （例如省略后缀配置，配置目录默认文件名,设置目录别名）
```
// webpack.config.js 
resolve: {
  extensions: ['.js','.jsx'],
  mainFiles: ['index','child'],
  alias: {
    '@': './src'
  }
}
```
* 使用DLLPlugin提高打包速度
* 控制包文件大小
* thread-loader,parallel-webpack,happypack多进程打包
* 合理使用sourceMap
* 结合stats分析打包结果
* 开发环境无用插件剔除