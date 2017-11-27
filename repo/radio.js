'use strict';
var request = require('request');

var handler = function (req, res, next) {
    var list = [{
        name: '糗事百科',
        description: '超搞笑的原创糗事笑话分享社区',
        sub_title: '热门排行',
        album_url: 'https://android-artworks.25pp.com/fs08/2017/10/12/11/110_67909199d7f066a11c8c11fbe0be1f85_con.png',
        code: 'qiubaihot'
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
        album_url: 'http://ou8u8dsau.bkt.clouddn.com/17-11-3/59320853.jpg',
        code: 'scientific_invest'
    }, {
        name: '百度知道',
        description: '总有一个人知道你问题的答案',
        sub_title: '神讨论',
        album_url: 'http://img-pool2.cdn1.1tu.com/thumbs/3474805/vector/6082/60822917/api_thumb_450.jpg',
        code: 'zhidao'
    }, {
        name: '糗事百科',
        description: '最新最糗的糗事，实时为你献上！',
        sub_title: '最新糗事',
        album_url: 'https://android-artworks.25pp.com/fs08/2017/10/12/11/110_67909199d7f066a11c8c11fbe0be1f85_con.png',
        code: 'qiubainew'
    }, {
        name: '知乎日报',
        description: '每天 3 次，每次 7 分钟',
        sub_title: '每日日报',
        album_url: 'http://ou8u8dsau.bkt.clouddn.com/17-11-27/4089840.jpg',
        code: 'zhihudaily'
    }];
    var result = {
        data: list,
        api_type: 'radios',
        count: list.length
    }
    res.json(result);
};

module.exports = handler;
