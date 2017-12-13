import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';

import './index.scss';
import _order from 'service/order-service.js';
import _address from 'service/address-service.js';
import addressModal from './modal.js';


import addressTPL from './address-list.tpl';
import productTPL from './product-list.tpl';

var page = {
    data: {
        selectedAddressId: null
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },

    bindEvent: function() {
        var _this = this;
        // select address item
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });

        // add address
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate: false,
                // refresh address list
                onSuccess: function(){
                    _this.loadAddressList();
                }
            });
        });

        // update
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(response){
                addressModal.show({
                    isUpdate: true,
                    data: response.data,
                    onSuccess: function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                util.errorTip(errMsg);
            });
        });
        // delete
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址？')){
                _address.delete(id, function(response){
                    _this.loadAddressList();
                }, function(errMsg){
                    util.errorTip(errMsg);
                });
            }
        });

        // submit order
        $(document).on('click', '.order-submit', function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId: shippingId
                }, function(response){
                    window.location.href = './payment.html?orderNumber=' + response.data.orderNo;
                }, function(errMsg){
                    util.errorTip(errMsg)
                });
            }else{
                util.errorTip('请选择地址后再提交');
            }
        });
    },

    loadAddressList: function() {
        var _this= this;
        $('.address-con').html('<div class="loading"></div>');
        // get address list
        _address.getAddressList(function(response){
            _this.addressFilter(response.data);
            var addressListHtml = util.renderHtml(addressTPL, response.data);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },

    addressFilter: function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            // 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },

    loadProductList: function() {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        // get product list data
        _order.getProductList(function(response){
            var productListHtml = util.renderHtml(productTPL, response.data);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        })
    }

};

$(function() {
    page.init();
});
