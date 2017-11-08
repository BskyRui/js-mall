'use strict';

import './index.scss';
import util from 'util/util.js';
import nav from 'page/common/nav-simple/index.js';
import _user from 'service/user-service.js';

var handleErrorMsg = {
    show: function(errMsg) {
        $('.user-login .error-item').show().find('.err-msg').text(errMsg);
    },

    hide: function() {
        $('.user-login .error-item').hide().text('');
    }
};

var page = {
    init: function() {
        this.bindEvent();
    },

    bindEvent: function() {
        var _this = this;
        $('#submit').on('click', function() {
            _this.submit();
        });

        $('.user-login .user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },

    submit: function() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $('#password').val()
        };
        // validate result data
        var validateResult = this.formValidate(formData);
        
        if (validateResult.status === true) {
            // submit login
            _user.login(formData, function(res) {
                window.location.href = util.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                handleErrorMsg.show(errMsg);
            });
        } else {
            handleErrorMsg.show(validateResult.msg);
        }
    },

    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }

        if (!util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }

        result.status = true;
        result.msg = '通过验证';
        return result;
    }
};

$(function() {
    page.init();
});