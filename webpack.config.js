const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',   // 开发环境提示效果好
    // devtool: 'cheap-module-source-map',   // 线上环境
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
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
        new CleanWebpackPlugin()
    ]
}