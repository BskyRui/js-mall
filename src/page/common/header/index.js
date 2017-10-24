'use strict';

import './index.scss';
import util from 'util/util.js';

var header = {
    init: function() {
        this.bindEvent();
    },

    onLoad: function() {
        // 搜索框回填
        var kw = util.getUrlParam('keyword');
        if (kw) {
            $('#search-input').val(kw);
        }
    },

    bindEvent: function() {
        var _this = this;
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });

        $('#search-input').keyup(function(e) {
            // 回车提交
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },

    searchSubmit: function() {
        var kw = $.trim($('#search-input').val());
        if (kw) {
            window.location.href = './list.html?keyword=' + kw;
        } else {
            util.go('/');
        }
    }
};

header.init();
