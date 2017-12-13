import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';

import './index.scss';
import _cart from 'service/cart-service.js';
import cartTPL from './cart.tpl';


var page = {
    data: {
        
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        this.loadCart();
    },

    bindEvent: function() {
        var _this = this;
        // single select
        $(document).on('click', '.cart-select', function() {
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            // select
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function(response) {
                    _this.renderCart(response.data);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {    
                // unselect
                _cart.unselectProduct(productId, function(response){
                    _this.renderCart(response.data);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // select all
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function(response) {
                    _this.renderCart(response.data);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {    
                // unselect
                _cart.unselectAllProduct(function(response){
                    _this.renderCart(response.data);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });

        // updata count
        $(document).on('click', '.count-btn', function(response) {
            var $this = $(this),
                $count = $this.siblings('.count-input'),
                currentCount = parseInt($count.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($count.data('max')),
                newCount = 0;

            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    util.errorTip('商品数量到达上限~');
                    return false;
                }
                newCount = currentCount + 1;
            } else if(type === 'minus') {
                if (currentCount <= minCount ) {
                    return false;
                }
                newCount = currentCount - 1;
            }

            // updata count
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function(response){
                _this.renderCart(response.data);
            }, function(errMsg){
                _this.showCartError();
            });
        });

        // delete
        $(document).on('click', '.cart-delete', function(response) {
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // delete select
        $(document).on('click', '.delete-selected', function(response) {
            if(window.confirm('确认要删除选中商品？')){
                // 1,2,3
                var productIds = [],
                    $selectedItem = $('.cart-select:checked');
                for (var i = 0; i < $selectedItem.length; i++) {
                    productIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }

                if (productIds.length) {
                    _this.deleteCartProduct(productIds.join(','));
                } else {
                    util.errorTip('没有要删除的商品~');
                }
            }
        });

        // submit
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                util.errorTip('请选择商品后再提交');
            }
        });
    },
    // load cart data
    loadCart: function() {
        var _this = this;
        _cart.getCartList(function(response){
            _this.renderCart(response.data);
        }, function(errMsg){
            _this.showCartError();
        })
    },
    // render cart
    renderCart: function(data) {
        this.filter(data);
        // cache cart data
        this.data.cartInfo = data;
        // generate html
        var cartHtml = util.renderHtml(cartTPL, data);
        $('.cart-container .page-wrap').html(cartHtml);
        // refresh cart number
        nav.loadCartCount();
    },

    deleteCartProduct: function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(response){
            _this.renderCart(response.data);
        }, function(errMsg){
            _this.showCartError();
        });
    },

    showCartError: function(){
        $('.cart-container .page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    },

    filter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    }
};

$(function() {
    page.init();
});
