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
    },

    onLoad: function() {
        // init left menu
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },

    loadUserInfo: function() {
        var userHTML = '';
        _user.getUserInfo(function(response) {
            userHTML = util.renderHtml(userInfoTpl, response.data);
            $('.panel-body').html(userHTML);

        }, function(errMsg) {
            util.errorTip(errMsg);
        });
    }
};

$(function() {
    page.init();
});