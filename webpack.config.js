const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg?g|gif|png)$/i,
            use: [
                {
                    loader: 'file-loader'
                },
            ]
        }]
    }
}