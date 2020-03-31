const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,   // 在执行css-loader前，先去执行sass-loader和postcss-loader
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(eot|ttf|svg|woff)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',  // async: 只对异步代码生效; all: 同步异步都生效
            minSize: 30000, // 引入的包大于此大小时，才做代码分割
            maxSize: 0,  // 50KB, lodash 1mb
            minChunks: 1, // 当模块被引用几次后进行代码分割
            maxAsyncRequests: 5,  // 最多同时代码分割的数量，超过不再进行代码分割
            maxInitialRequests: 3,  // 入口文件最多进行的代码分割
            automaticNameDelimiter: '~',  // 文件连接符
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,  // 配置后同步分割才生效
                    priority: -10,    // 优先级
                    // filename: 'vendors.js'
                },
                default: { 
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    // filename: 'common.js'
                }
            }
        }
    },
    output: {
        // publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
}