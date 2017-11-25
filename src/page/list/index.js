import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import _product from 'service/product-service.js';
import './index.scss';

import listTPL from './list.tpl';

var page = {
    data: {
        listParam: {
            keyword: util.getUrlParam('keyword')    || '',
            categoryId: util.getUrlParam('categoryId') || '',
            orderBy: util.getUrlParam('orderBy')    || 'default',
            pageNum: util.getUrlParam('pageNum')    || 1,
            pageSize: util.getUrlParam('pageSize')   || 20
        }
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        this.loadList();
    },

    bindEvent: function() {
        var _this = this;
        $('.list-container .sort-item').on('click', function() {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // default sort
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return false;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
                    _this.data.listParam.orderBy = 'default';
                } 
                // price sort
            } else if ($this.data('type') === 'price') { 
                // active style
                $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
                if ($this.hasClass('asc')) {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                } else {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
            }
            // reload list data
            _this.loadList();
        });
    },

    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $listContainer = $('.p-list-con');
        
        $listContainer.html(`<div class="loading"></div>`);
        // delete unnecessary field
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // fetch product list data
        _product.getProductList(listParam, function(response){
    
            listHtml = util.renderHtml(listTPL, {
                list: response.data.list
            });
            $listContainer.html(listHtml);
            // _this.loadPagination({
            //     hasPreviousPage : response.hasPreviousPage,
            //     prePage         : response.prePage,
            //     hasNextPage     : response.hasNextPage,
            //     nextPage        : response.nextPage,
            //     pageNum         : response.pageNum,
            //     pages           : response.pages
            // });
        }, function(errMsg){
            util.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
});
