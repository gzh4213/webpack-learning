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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig,devConfig)