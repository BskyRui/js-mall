'use strict';

import util from 'util/util.js';

var product = {
    getProductList: function(listParam, resolve, reject) {
        util.request({
            url: util.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};

export default product;

