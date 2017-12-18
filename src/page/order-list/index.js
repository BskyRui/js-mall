'use strict';

import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _order from 'service/order-service.js';

import ListTpl from './list.tpl';
import Pagination from 'util/pagination/index.js';

import './index.scss';


var page = {
    data: {
        listParam : {
            pageNum: 1,
            pageSize: 10
        }
    },

    init: function(){
        this.onLoad();
    },

    onLoad : function(){
        // initial left menu
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },

    loadOrderList: function(){
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(response){
            let data = response.data;
            // render html
            orderListHtml = util.renderHtml(ListTpl, data);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: data.hasPreviousPage,
                prePage: data.prePage,
                hasNextPage: data.hasNextPage,
                nextPage: data.nextPage,
                pageNum: data.pageNum,
                pages: data.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },

    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function(){
    page.init();
});


