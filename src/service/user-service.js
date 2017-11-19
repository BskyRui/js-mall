'use strict';

import util from 'util/util.js';

var user = {
    login: function(userinfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userinfo,
            success: resolve,
            error: reject
        });
    },

    logout: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },

    register: function(userinfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/register.do'),
            method: 'POST',
            data: userinfo,
            success: resolve,
            error: reject
        });
    }, 

    checkUsername: function(username, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            data: {
                type: 'username',
                str: username
            },
            success: resolve,
            error: reject
        });
    },

    checkLogin: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },

    getUserInfo: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },

    updateUserInfo : function(userinfo, resolve, reject){
        util.request({
            url: util.getServerUrl('/user/update_information.do'),
            data: userinfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    
    getQuestion: function(username, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/forget_get_question.do'),
            method: 'POST',
            data: {
                username: username
            },
            success: resolve,
            error: reject
        });
    },

    checkAnswer: function(userinfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            data: userinfo,
            success: resolve,
            error: reject
        });
    },

    resetPassword: function(userinfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/user/forget_reset_password.do'),
            method: 'POST',
            data: userinfo,
            success: resolve,
            error: reject
        });
    }
};

export default user;

