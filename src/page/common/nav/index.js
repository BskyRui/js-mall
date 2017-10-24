'use strict';

import './index.scss';
import util from 'util/util.js';
import userService from 'service/user-service.js';
import cartService from 'service/cart-service.js';

var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },

    bindEvent: function() {
        // login
        $('.nav .js-login').on('click', function(e) {
            util.doLogin();
        });
        // reg
        $('.nav .js-reg').on('click', function(e) {
            window.location.href = './register.html';
        });
        // logout
        $('.nav .js-logout').on('click', function() {
            userService.logout(function(response) {
                window.location.reload();
            }, function(errMsg) {
                util.errorTip(errMsg);
            });
        });
    },

    loadUserInfo: function() {
        userService.checkLogin(function(response) {
            $('.nav .user.un-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function(errMsg) {
            // nothing
        });
    },

    loadCartCount: function() {
        cartService.getCartCount(function(response) {
            $('.nav .cart-count').text(response.count || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};

export default nav.init();