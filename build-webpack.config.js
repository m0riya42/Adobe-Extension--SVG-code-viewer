const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const multi = require('multi-loader');
// require("@babel/polyfill");


module.exports = {
    entry: ["@babel/polyfill", path.join(__dirname, 'client/src/index.js')],
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'svgCodeViewer.bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'client/build'),//where contents are served from
    },
    mode: 'development',
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: 'client/src/index.html' },
        //         // { from: 'client/src/index.js' },
        //     ]
        // }),
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         '**build/*'
        //     ]
        // }),
        new CleanWebpackPlugin(
            {

                cleanOnceBeforeBuildPatterns: [
                    './client/build/*',
                ]
            }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // name of html file to be created
            template: './client/src/index.html' // source from which html file would be created
        })
        // new HtmlWebpackPlugin({
        //     title: 'Development',
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            exclude: /(node_modules|bower_components)/,
                            // babelrc: false,
                            presets: [
                                // ["es2015", {
                                // ["@babel/env", {
                                ['@babel/preset-env', {
                                    "targets": {
                                        "chrome": "41"
                                        // 'browsers': ['Chrome >=41']
                                    },
                                    // "modules": false,
                                    // "loose": true
                                }]],

                            // presets: ['@babel/preset-env'],
                            // presets: ['@babel/polyfill'],
                            // presets: ['es2015'],
                            // plugins: ['@babel/plugin-proposal-object-rest-spread'],
                            // useBuiltIns: "usage",
                            // targets: {
                            //     "chrome": "41"
                            //     // esmodules: true
                            // }
                        }
                    },
                    {
                        loader:
                            'webpack-glob-loader',
                        // multi(
                        //     'webpack-glob-loader',
                        //     'babel-loader'
                        // ),
                        options: {
                            exclude: /(node_modules|bower_components)/,
                            enforce: 'pre',
                            esModule: false,
                        }
                    },

                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: 'webpack-glob-loader' }
                ]
            }
        ],
    },

};