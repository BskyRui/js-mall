import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import _product from 'service/product-service.js';
import './index.scss';

import listTPL from './list.tpl';
import Pagination from 'util/pagination/index.js';

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
            var data = response.data;
            // render pagenation
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            });

        }, function(errMsg){
            util.errorTip(errMsg);
        });
    },

    loadPagination: function(pageData) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageData, {
            container: $('.list-container .pagination'),
            selectCallback: function(pageNum) {
                // 分页数据更新
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function() {
    page.init();
});
