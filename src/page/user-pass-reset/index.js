'use strict';

import './index.scss';
import util from 'util/util.js';
import nav from 'page/common/nav-simple/index.js';
import _user from 'service/user-service.js';

var handleErrorMsg = {
    show: function(errMsg) {
        $('.user-pass-reset .error-item').show().find('.err-msg').text(errMsg);
    },

    hide: function() {
        $('.user-pass-reset .error-item').hide().find('.err-msg').text('');
    }
};

var page = {

    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    bindEvent: function() {
        var _this = this;
        // username submit
        $('#submit-username').on('click', function() {
            var username = $.trim($('#username').val());
            
            if (username) {
                _user.getQuestion(username, function(response) {
                    _this.data.username = username;
                    _this.data.question = response.data;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    handleErrorMsg.show(errMsg);
                });
            } else {
                handleErrorMsg.show('请输入用户名');
            }
        });

        // answer submit
        $('#submit-question').on('click', function() {
            var answer = $.trim($('#answer').val());
            
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(response) {
                    if (response.status === 0) {
                        _this.data.answer = answer;
                        _this.data.token = response.data;
                        _this.loadStepPassword();
                    } else {
                        handleErrorMsg.show(response.msg);
                    }
                }, function(errMsg) {
                    handleErrorMsg.show(errMsg);
                });
            } else {
                handleErrorMsg.show('请输入密码提示问题答案');
            }
        });

        // password submit
        $('#submit-password').on('click', function() {
            var password = $.trim($('#password').val());
            
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(response) {
                    if (response.status === 0) {
                        window.location.href = './result.html?type=pass-reset';
                    } else {
                        handleErrorMsg.show(response.msg);
                    }
                }, function(errMsg) {
                    handleErrorMsg.show(errMsg);
                });
            } else {
                handleErrorMsg.show('请输入不小于6位的新密码');
            }
        });
    },

    onLoad: function() {
        this.loadStepUsername();
    },

    loadStepUsername: function() {
        $('.user-pass-reset .step-username').show();
    },

    loadStepQuestion: function() {
        handleErrorMsg.hide();
        $('.user-pass-reset .step-username').hide()
            .siblings('.step-question').show()
                .find('.question').text(this.data.question);
    },

    loadStepPassword: function() {
        handleErrorMsg.hide();
        $('.user-pass-reset .step-question').hide()
            .siblings('.step-password').show();
    }
};

$(function() {
    page.init();
});