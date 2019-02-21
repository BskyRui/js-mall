'use strict';

import './index.scss';
import util from 'util/util.js';
import nav from 'page/common/nav-simple/index.js';
import _user from 'service/user-service.js';

var handleErrorMsg = {
    show: function(errMsg) {
        $('.user-register .error-item').show().find('.err-msg').text(errMsg);
    },

    hide: function() {
        $('.user-register .error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function() {
        this.bindEvent();
    },

    bindEvent: function() {
        var _this = this;
        // verify username 
        $('#username').blur(function() {
            var username = $.trim($(this).val());

            if (!username) {
                return false;
            }

            _user.checkUsername(username, function(res) {
                handleErrorMsg.hide();
            }, function(errMsg) {
                handleErrorMsg.show(errMsg);
            });
        });

        // register
        $('#submit').on('click', function() {
            _this.submit();
        });

        $('.user-register .user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },

    submit: function() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $('#password').val(),
            passwordConfirm: $('#password-confirm').val(),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        // validate result data
        var validateResult = this.formValidate(formData);
        
        if (validateResult.status === true) {
            // submit register
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
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

        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }

        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次密码不一致';
            return result;
        }

        if (!util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }

        if (!util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }

        if (!util.validate(formData.question, 'require')) {
            result.msg = '密码提示不能为空';
            return result;
        }

        if (!util.validate(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
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