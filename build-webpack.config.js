const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'client/src/index.js'),
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'svgCodeViewer.bundle.js',
    },
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'client/src/index.html' },
                // { from: 'client/src/index.js' },
            ]
        }),
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         '**build/*'
        //     ]
        // }),
        new CleanWebpackPlugin(
            {

                cleanOnceBeforeBuildPatterns: [
                    'client/build/*',
                ]
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

};