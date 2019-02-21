'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html配置
const getHtmlConfig = function(name, title) {
    return {
        title: title,
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
        'common': ['./page/common/index.js'],
        'index': ['./page/index/index.js'],
        'list': ['./page/list/index.js'],
        'detail': ['./page/detail/index.js'],
        'cart': ['./page/cart/index.js'],
        'order-confirm': ['./page/order-confirm/index.js'],
        'order-list': ['./page/order-list/index.js'],
        'order-detail': ['./page/order-detail/index.js'],
        'payment': ['./page/payment/index.js'],
        'user-login': ['./page/user-login/index.js'],
        'user-register': ['./page/user-register/index.js'],
        'user-pass-reset': ['./page/user-pass-reset/index.js'],
        'user-center': ['./page/user-center/index.js'],
        'user-center-update': ['./page/user-center-update/index.js'],
        'user-pass-update': ['./page/user-pass-update/index.js'],
        'result': ['./page/result/index.js'],
    },

    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.bsky.ink/mall-fe/dist/',
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
                test: /\.(png|jpg|gif|woff|eot|ttf|svg)\??.*$/,
                // \??.*$
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'static/[hash].[ext]',
                        limit: 8192
                    }
                }
            },
            {
                test: /\.tpl$/,
                use: {
                    loader: 'html-loader',
                    query: {
                        minimize: true,
                        removeAttributeQuotes: false
                    }
                }
            }
        ]
    },

    // 提取公共代码到base.js, 同时包括entry中的common
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2,
                    filename: 'js/base.js'
                }
            }
        }
    },

    plugins: [
        // 提取css
        new ExtractTextPlugin('css/[name].css'),
        // 定义区分环境变量
        new webpack.DefinePlugin({
            ENV: JSON.stringify(WEBPACK_ENV)
        }),
        // 处理html模板
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ],

    resolve: {
        alias: {
            util: __dirname + '/src/util',
            img: __dirname + '/src/img',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            node_modules: __dirname + '/node_modules'
        }
    },

    // 运行时从外部获取, 解决 import $ from 'jquery'
    externals: {
        jquery: 'jQuery'
    },

    devServer: {
        port: 8080,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://s.bsky.ink',
                changeOrigin : true
            }
        }
    }
};


module.exports = config;