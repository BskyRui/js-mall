'use strict';

import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';

import _payment from 'service/payment-service.js';
import PaymentTpl from './payment.tpl';

import './index.scss';


var page = {
    data: {
        orderNumber: util.getUrlParam('orderNumber')
    },

    init: function(){
        this.loadPaymentInfo();
    },

    loadPaymentInfo: function() {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');

        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(response){
            // render html
            paymentHtml = util.renderHtml(PaymentTpl, response.data);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },

    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber, function(response){
                if(response.data == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5e3);
    }
};

$(function(){
    page.init();
});


