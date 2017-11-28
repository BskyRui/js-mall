import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import _product from 'service/product-service.js';
import _cart from 'service/cart-service.js';
import './index.scss';

import detailTPL from './detail.tpl';
import Pagination from 'util/pagination/index.js';

var page = {
    data: {
        productId : util.getUrlParam('productId') || '',
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        if(!this.data.productId){
            util.go('./index.html');
        }
        this.loadDetail();
    },

    bindEvent: function() {
        var _this = this;
        // img preview
        $(document).on('mouseenter', '.detail-container .p-img-item', function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.detail-container .main-img').attr('src', imageUrl);
        });
        // count
        $(document).on('click', '.detail-container .p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;

            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // add to cart
        $(document).on('click', '.detail-container .cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) {
                util.errorTip(errMsg);
            });
        });
    },

    loadDetail: function() {
        var _this = this,
            html = '',
            $page= $('.detail-container .page-wrap');

        $page.html('<div class="loading"></div>');
        // get detail data
        _product.getProductDetail(this.data.productId, function(response){
            var data = response.data;
            _this.filter(data);
            // cache detail data
            _this.data.detailInfo = data;
            // render
            $page.html(util.renderHtml(detailTPL, data));
        }, function(errMsg){
            $page.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },

    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function() {
    page.init();
});
