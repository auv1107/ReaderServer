'use strict';
var request = require('request');

var handler = function (req, res, next) {
    var list = [{
        name: '糗事百科',
        description: '超搞笑的原创糗事笑话分享社区',
        sub_title: '热门排行',
        album_url: 'https://android-artworks.25pp.com/fs08/2017/10/12/11/110_67909199d7f066a11c8c11fbe0be1f85_con.png',
        code: 'qiubai'
    }];
    var result = {
        data: list,
        api_type: 'radios',
        count: list.length
    }
    res.json(result);
};

module.exports = handler;
