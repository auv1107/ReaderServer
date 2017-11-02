'use strict';
var request = require('request');

const URL = "https://www.qiushibaike.com/?page=";

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'normal';
    result.source = 'qiubai';
    result.data = [];
    for (var i in data) {
        var item = data[i];
        if (item.data && item.data.art_type && item.data.art_type === 'word') {
            var content = {
                id: result.source + '_' + item.data.id,
                title: item.data.title,
                display_content: item.data.content,
                read_content: item.data.content,
                type: 'word',
                create_at: item.data.created_at
            };
            result.data.push(content);
        }
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