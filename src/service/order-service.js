'use strict';

import util from 'util/util.js';

var order = {
    getProductList: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },

    createOrder: function(orderInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    }
    
};

export default order;

