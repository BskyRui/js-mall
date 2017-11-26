'use strict';

import util from 'util/util.js';
import paginationTPL from './template.tpl';
import './index.scss';

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3, // 当前页两边保留的
        selectCallback: null
    };
    // 事件委托到document
    $(document).on('click', '.page-item', function() {
        var $this = $(this);
        // 忽略disabled和active按钮
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return false;
        }
        
        typeof _this.option.selectCallback === 'function' ? _this.option.selectCallback($this.data('value')) : null;
    });
};

Pagination.prototype.render = function(userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否是合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return false;
    }
    
    // 只有1页
    if (this.option.pages <= 1) {
        return false;
    }

    // container为传进来的jQuery对象
    this.option.container.html(this.getPaginationHtml());
};

// |上一页| 2 3 4 =5= 6 7 8 |下一页|  5/9
Pagination.prototype.getPaginationHtml = function() {
    var html = '',
        option = this.option,
        pageArray = [],
        // 起始页, 当前页如果减去保留的页码 < 0 则从1开始
        start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        // 最末页
        end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
    
    // previous
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });

    // number
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    }
    // next
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });

    html = util.renderHtml(paginationTPL, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    
    return html;
};

export default Pagination;

