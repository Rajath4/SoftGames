const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var CleanCSS = require('clean-css');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "eval-source-map",

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // https: true,
        host: 'localhost', //your ip address
        compress: true,
        open: true,
        port: 8000,
        inline: true,
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [["@babel/preset-env", { "targets": "defaults" }]]
            }
        },
        {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader?minimize=false"
            },],
        },
        {
            test: /\.(png|gif)$/,
            loader: "url-loader",
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx'],
    },
    entry: {
        bundle: './src/js/index.ts',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[contenthash].js', 
        filename: '[name].[hash].js', //Dev
    },
    optimization: {
        moduleIds: 'hashed',
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true,
            compile: true,
            minify: true,
            cache: true,
            chunks: "all",
            excludeChunks: [],
            xhtml: true,
            chunksSortMode: 'none'
        }),
        // new CompressionPlugin(),

        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
            { from: 'src/lib', to: 'lib' },
            { from: 'src/custom', to: 'custom' },
            {
                from: './src/game.css',
                to: '',
                transform: function (content, path) {
                    return new CleanCSS({}).minify(content.toString()).styles;
                },
            },
        ]),
    ],

};