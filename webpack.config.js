const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'client/src/index.js'),
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'client/src/index.html' },
            ]
        })
        // new HtmlWebpackPlugin({
        //     title: 'Development',
        // }),
    ],
    module: {
        // parser: {
        //     javascript: {
        // commonjs: true, // disable CommonJS
        // commonjsMagicComments: true,
        // requireJs: true, // disable requirejs.*

        //     },
        // },
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'webpack-glob-loader',
                        options: {
                            exclude: /node_modules/,
                            enforce: 'pre',
                            esModule: false,
                        }
                    }
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

    output: {
        path: path.resolve(__dirname, 'client/src'),
        filename: 'svgCodeViewer.bundle.js',
    },
    devServer: {
        // contentBase: path.resolve(__dirname, 'client/src'),
        static: path.resolve(__dirname, 'client/src'),
    }
};