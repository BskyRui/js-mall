'use strict';

import util from 'util/util.js';

var payment = {

    getPaymentInfo : function(orderNumber, resolve, reject){
        util.request({
            url: util.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },

    getPaymentStatus : function(orderNumber, resolve, reject){
        util.request({
            url: util.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
};

export default payment;

