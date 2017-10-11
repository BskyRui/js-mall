'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html配置
const getHtmlConfig = function(name) {
    return {
        template: 'view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

const config = {
    // webpack编译时的基础目录, 入口起点(entry)会相对于此目录查找
    context: __dirname + '/src',
    // 配置多入口
    entry: {
        common: ['./page/common/index.js'],
        index: ['./page/index/index.js'],
        login: ['./page/login/index.js']
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: 'css-loader'
                })    
            },
            {
                test: /\.scss$/,
                // 'style-loader!css-loader!sass-loader'
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })    
            },
            {
                test: /\.(png|jpg|gif|woff|eot|ttf)$/,
                // \??.*$
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'static/[hash].[ext]',
                        limit: 8192
                    }
                }
            }
        ]
    },

    plugins: [
        // 提取公共代码到base.js, 同时包括entry中的common
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 提取css
        new ExtractTextPlugin('css/[name].css'),
        // 处理html模板
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ],

    resolve: {
        alias: {
            util: __dirname + '/src/util'
        }
    },

    // 运行时从外部获取, 解决 import $ from 'jquery'
    externals: {
        jquery: 'jQuery'
    }
};

// webpack-dev-server
'dev' === WEBPACK_ENV && config.entry.common.push('webpack-dev-server/client?http://localhost:8080');

module.exports = config;