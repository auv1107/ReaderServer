'use strict';
var request = require('request');

const URL = "https://m.weibo.cn/api/container/getIndex?containerid=1076031748075785&page=";

var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'normal';
    result.source = 'weibo';
    result.data = [];
    for (var i in data.cards) {
        var item = data.cards[i];
        var content = {
            id: result.source + '_' + item.mblog.id,
            title: item.mblog.raw_text || parseHtml(item.mblog.text),
            display_content: item.scheme,
            read_content: parseHtml(item.mblog.text),
            type: 'multi',
            create_at: item.mblog.created_at
        };
        result.data.push(content);
    }
    result.count = result.data.length;
    return result;
};

var handler = function (req, response, next) {
    var page = req.query.page || 1;
    var url = URL + page;
    request({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            referer: 'https://www.qiushibaike.com/',
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
    })
};

module.exports = handler;