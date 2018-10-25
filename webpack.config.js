const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({}),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        context: path.resolve(__dirname, 'src'),
        entry: './index.js',
        output: {
            path: devMode ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'docs'),
            filename: './js/main.js'
        },
        devtool: 'inline-source-map',
        plugins: [
            devMode ? new CleanWebpackPlugin(['dist']) : new CleanWebpackPlugin(['docs']),
            new HtmlWebpackPlugin({
                title: 'Onpoint-test-task',
                template: './index.pug',
            }),
            new MiniCssExtractPlugin({
                filename: './css/[name].css',
                chunkFilename: './css/[id].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: [{
                        loader: "pug-loader",
                        options: { pretty: devMode ? true : false }
                    }]
                },
                {
                    test: /\.s?[ca]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: './img',
                            publicPath: '../img'
                        }
                    }
                },
                {
                    test: /\.(otf|ttf)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts',
                            publicPath: '../fonts'
                        }
                    }
                },
            ]
        },
        watch: devMode ? true : false,
        watchOptions: {
            ignored: /node_modules/
        }
    }
};