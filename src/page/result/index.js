'use strict';

import './index.scss';
import util from 'util/util.js';
import nav from 'page/common/nav-simple/index.js';

$(function() {
    var type = util.getUrlParam('type') || 'default';
    var $ele = $('.' + type + '-success').show();

});