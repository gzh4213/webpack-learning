const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
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
                            modules: true,      // 模块化打包，样式不作用于全局
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    }
}