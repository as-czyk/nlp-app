const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require ('clean-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/client/app.js',
    mode: 'development',
    devtool: 'sourcemap',
    stats: 'verbose',
    output: {
        filename: 'main.js',
        path: path.resolve('./builds'),
        libraryTarget: 'var',
        library: 'Client'
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
                use: [
                    'style-loader',
                    'css-loader',
                    {
                    loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
}