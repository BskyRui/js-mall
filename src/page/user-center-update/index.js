'use strict';

import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _user from 'service/user-service.js';
import userInfoTpl from './user-info.tpl';

import './index.scss';


var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        // init left menu
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },

    bindEvent: function() {
        var _this = this;
        // submit userinfo, event delegate
        $(document).on('click', '.user-center-update .btn-edit', function(e) {
            var userInfo = {
                phone: $.trim($('.user-center-update #phone').val()),
                email: $.trim($('.user-center-update #email').val()),
                question: $.trim($('.user-center-update #question').val()),
                answer: $.trim($('.user-center-update #answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            
            if(validateResult.status){
                // update userinfo
                _user.updateUserInfo(userInfo, function(response) {
                    util.successTip();
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    util.errorTip(errMsg);
                });
            } else {
                util.errorTips(validateResult.msg);
            }
        });

    },

    loadUserInfo: function() {
        var userHTML = '';
        _user.getUserInfo(function(response) {
            userHTML = util.renderHtml(userInfoTpl, response.data);
            $('.panel-body').html(userHTML);

        }, function(errMsg) {
            util.errorTip(errMsg);
        });
    },

    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
       
        if(!util.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
       
        if(!util.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
       
        if(!util.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
       
        if(!util.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
       
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function() {
    page.init();
});