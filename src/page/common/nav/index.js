'use strict';

import './index.scss';
import util from 'util/util.js';

var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCarCount();
        return this;
    },

    bindEvent: function() {
        $('.nav .js-login').on('click', function(e) {
            util.doLogin();
        });

        $('.nav .js-reg').on('click', function(e) {
            window.location.href = './register.html';
        });
    },

    loadUserInfo: function() {

    },

    loadCarCount: function() {

    }
};

export default nav.init();