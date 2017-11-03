'use strict';
var request = require('request');

var handler = function (req, res, next) {
    var list = [{
        name: '糗事百科',
        description: '超搞笑的原创糗事笑话分享社区',
        sub_title: '热门排行',
        album_url: 'https://android-artworks.25pp.com/fs08/2017/10/12/11/110_67909199d7f066a11c8c11fbe0be1f85_con.png',
        code: 'qiubai'
    }, {
        name: '知乎日报',
        description: '每天 3 次，每次 7 分钟',
        sub_title: '热门精选',
        album_url: 'http://ou8u8dsau.bkt.clouddn.com/17-11-3/93102250.jpg',
        code: 'zhihu'
    }, {
        name: '知乎专栏',
        description: '有验证的投资',
        sub_title: '科学投资',
        album_url: 'http://ou8u8dsau.bkt.clouddn.com/17-11-3/93102250.jpg',
        code: 'scientific_invest'
    }];
    var result = {
        data: list,
        api_type: 'radios',
        count: list.length
    }
    res.json(result);
};

module.exports = handler;
