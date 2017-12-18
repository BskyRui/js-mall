'use strict';

import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _order from 'service/order-service.js';

import DetailTpl from './detail.tpl';

import './index.scss';


var page = {
    data: {
        orderNumber: util.getUrlParam('orderNumber')
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function(){
        // initial left menu
        navSide.init({
            name: 'order-detail'
        });
        this.loadDetail();
    },

    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('确实要取消该订单？')){
                _order.cancelOrder(_this.data.orderNumber, function(response){
                    util.successTip('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg){
                    util.errorTips(errMsg);
                });
            }
        });
    },

    loadDetail: function() {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(response){
            _this.filter(response.data);
            // render html
            orderDetailHtml = util.renderHtml(DetailTpl, response.data);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },

    filter: function(data){
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function(){
    page.init();
});


