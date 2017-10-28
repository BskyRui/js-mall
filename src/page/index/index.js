'use strict';

import $ from 'jquery';
import util from 'util/util.js';
import nav from 'page/common/nav/index.js';
import header from 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';


navSide.init({
    name: 'pass-update'
});

console.log(util.getUrlParam('test'));
console.log(util.renderHtml('<div>{{data}}</div>', {data: 'ccc'}));
// util.request({
//     url: '/product/list.do?keyword=1',
//     success: function(res) {
//         console.log(res);
//     },
//     error: function(errMsg) {
//         console.log(errMsg);
//     }
// });

