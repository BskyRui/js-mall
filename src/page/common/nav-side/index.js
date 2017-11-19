'use strict';

import './index.scss';
import util from 'util/util.js';
import navListTpl from './nav.tpl';

// 侧边导航
var nav = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
            {name: 'about', desc: '关于Mall', href: './about.html'},
        ]
    },

    init: function(option) {
        // Object.assign({}, source);
        $.extend(this.option, option);
        this.renderNav();
    },

    renderNav: function() {
        // active
        for (var i =0, len = this.option.navList.length; i < len; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        // list
        var navHtml = util.renderHtml(navListTpl, {
            navList: this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
};

export default nav;