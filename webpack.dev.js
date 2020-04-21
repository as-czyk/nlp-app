const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')

module.exports = {
    entry: './src/client/app.js',
    mode: 'development',
    devtool: 'sourcemap',
    stats: 'verbose',
    output: {
        filename: 'main.js',
        path: path.resolve('./builds')
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ]
}