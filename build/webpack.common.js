const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
];

const files = fs.readdirSync( path.resolve(__dirname,'../dll'))
files.forEach(file => {
    if(/.*\.dll.js/.test(file)) {
        plugins.push(
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname,'../dll',file)
            }),
        )
    }
    if(/.*\.manifest.json/.test(file)) {
        plugins.push(
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname,'../dll',file)
            })
        )
    }
})
console.log('files:',files)

module.exports = {
    entry: {
        main: './src/index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],   // 引入文件没有后缀名，在此配置寻找  会增加性能耗时
        // mainFiles: ['index','child'],  // 只引入到文件夹目录 性能问题
        // alias: {
        //     child: path.resolve(__dirname,'../src/child')
        // }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // include: path.resolve(__dirname,'../src'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(jpg?g|gif|png)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // placeholder 占位符
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                            limit: 2048
                        }
                    },
                ]
            },
            {
                test: /\.(eot|ttf|svg|woff)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            }
        ]
    },
    plugins,
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },  // webpack 低版本，可配置此项
        usedExports: true,    // tree shaking
        splitChunks: {  // 使用默认配置即可
            chunks: 'all',  // async: 只对异步代码生效; all: 同步异步都生效
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                },      // 修改生成chunk的名字
            }
        }
    },
    performance: false,
    output: {
        // publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
    },
}