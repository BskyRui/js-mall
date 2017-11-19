'use strict';

import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _user from 'service/user-service.js';

import './index.scss';


var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        // init left menu
        navSide.init({
            name: 'user-pass-update'
        });
    },

    bindEvent: function() {
        var _this = this;
        // submit userinfo, event delegate
        $(document).on('click', '.user-pass-update .btn-submit', function(e) {
            var userInfo = {
                password: $.trim($('.user-pass-update #password').val()),
                passwordNew: $.trim($('.user-pass-update #password-new').val()),
                passwordConfirm: $.trim($('.user-pass-update #password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            
            if(validateResult.status){
                // update password
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(response) {
                    // success
                    util.successTip();
                }, function(errMsg) {
                    util.errorTip(errMsg);
                });
            } else {
                util.errorTips(validateResult.msg);
            }
        });

    },

    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        
        if(!util.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
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