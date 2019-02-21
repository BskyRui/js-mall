'use strict';

import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';

import './index.scss';
import bannerHTML from './banner.tpl';
import 'util/slider/index.js';


$(function() {
    // render banner
    var bannerHtml  = util.renderHtml(bannerHTML);
    $('.index-container .banner-con').html(bannerHtml);
    // initial banner
    var $slider     = $('.index-container .banner').unslider({
        dots: true
    });
    // bind event
    $('.index-container .banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});