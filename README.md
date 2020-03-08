# webpack 

## webpack 是一个模块打包工具，支持ES Module,CommonJS,CMD,AMD模块引入规范,起初只是一个js模块打包工具

## npm info webpack 查看webpack的版本历史

## webpack默认不支持打包png等格式，如果想支持，可以在配置文件中进行配置相应的loader，loader就是一个打包的方案，webpack本身不知道如何处理的文件，它知道如何把指定的文件进行怎样的打包

### url-loader 可以把图片直接已base64格式打包到js中, limit属性可以控制将小于此值的文件以base64的格式打包


> file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

> url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
 
> css-loader 会分析出css文件之间的关系，并合并成一段css

> style-loader 在得到css-loader生成的一段css后，会把其挂在到页面的head部分

> sass-loader 使用时还需安装node-sass

### loader的执行是有顺序的，按着从下到上，从右到左的顺序执行