const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',   // 开发环境提示效果好
    devServer: {
        contentBase: './dist',
        // open: true,
        port: 8080,
        hot: true,
        // hotOnly: true,
    },
    module: {
        rules: [
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
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(commonConfig,devConfig)