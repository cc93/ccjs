const path = require('path')

module.exports = {
    entry: './es6/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'app')
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: './dist'
    }
}
