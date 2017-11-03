'use strict';
var request = require('request');

const URL = "https://zhuanlan.zhihu.com/api/columns/scientific-invest/posts";
const URL_ZHUANLAN_PREFIX = "https://zhuanlan.zhihu.com";
const PARAM_LIMIT = "limit";
const PARAM_OFFSET = "offset";
const PAGE_SIZE = 15;

var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'normal';
    result.source = 'zhihuzhuanlan';
    result.data = [];
    for (var i in data) {
        var item = data[i];
        var content = {
            id: result.source + '_' + item.slug,
            title: item.title,
            display_content: URL_ZHUANLAN_PREFIX + item.url,
            read_content: parseHtml(item.content),
            type: 'multi',
            image: item.titleImage,
            thumbnail: item.titleImage,
            share_url: URL_ZHUANLAN_PREFIX + item.url,
            image_source: item.title
        };
        result.data.push(content);
    }
    result.count = result.data.length;
    return result;
};

var getBody = function (url, resolve) {
    return request(url, function (err, res, body) {
        resolve(JSON.parse(body));
    })
};

var handler = function (req, response, next) {
    var page = req.query.page || 1;
    var limit = PAGE_SIZE;
    var offset = (page - 1) * PAGE_SIZE;
    var url = URL + '?limit=' + limit + '&offset=' + offset;
    request({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    }, function (err, res, body) {
        if (err) {
            response.send('Request failed with response code ' + res.statusCode);
        } else {
            var data = JSON.parse(body);
            var result = parseToCommonFormat(data);
            response.json(result);
        }
    });
};

module.exports = handler;