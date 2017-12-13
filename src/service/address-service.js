'use strict';

import util from 'util/util.js';

var order = {
    getAddressList: function(resolve, reject) {
        util.request({
            url: util.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },

    getAddress: function(shippingId, resolve, reject){
        util.request({
            url: util.getServerUrl('/shipping/select.do'),
            data: {
                shippingId : shippingId
            },
            success: resolve,
            error: reject
        });
    },

    save: function(addressInfo, resolve, reject){
        util.request({
            url: util.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },

    update: function(addressInfo, resolve, reject){
        util.request({
            url: util.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },

    delete: function(shippingId, resolve, reject){
        util.request({
            url: util.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }

};

export default order;

