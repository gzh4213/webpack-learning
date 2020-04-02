const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _join: ['lodash', 'join']
        })
    ],
    optimization: {
        // runtimeChunk: {
        //     name: 'runtime'
        // },  // webpack 低版本，可配置此项
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