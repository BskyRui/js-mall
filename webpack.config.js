const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        new ExtractTextPlugin('css/[name].css')
    ],

    // 运行时从外部获取, 解决 import $ from 'jquery'
    externals: {
        jquery: 'jQuery'
    }
};

module.exports = config;