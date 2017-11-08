'use strict';

var Hogan = require('hogan.js');

var conf = {
    serverHost: ''
};

var method = {
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(response) {
                // 请求成功
                if (0 === response.status) {
                    typeof param.success === 'function' && param.success(response);
                } else if(10 === response.status) {
                    // 未登录
                    _this.doLogin();
                } else if(1 === response.status) {
                    // 请求数据错误
                    typeof param.error === 'function' && param.error(response.msg);
                }
            },
            error: function(error) {
                typeof param.error === 'function' && param.error(error.statusText);
            }
        })
    },

    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    renderHtml: function(tpl, data) {
        var template = Hogan.compile(tpl),
            result = template.render(data);
        return result;
    },

    successTip: function(msg) {
        alert(msg || '操作成功~');
    },

    errorTip: function(msg) {
        alert(msg || '操作成功~');
    },

    validate: function(value, type) {
        // var value = $.trim(value);
        if ('require' === type) {
            return !!value;
        }

        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }

        if ('email' === type) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        }
    },

    go: function(url) {
        window.location.href = url;
    },

    getUrlParam: function(name) {
        // xxx.com/index?keyword=1&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    getServerUrl: function(path) {
        return conf.serverHost + path;
    }
};

export default method;
