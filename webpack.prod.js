const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/client/app.js',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({}), new MiniCssExtractPlugin({})]
    },
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
                loader: "babel-loader"
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}
