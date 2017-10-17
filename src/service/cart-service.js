'use strict';

import util from 'util/util.js';

var cart = {
    getCartCount: function(response, reject) {
        util.request({
            url: util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};

export default cart;

