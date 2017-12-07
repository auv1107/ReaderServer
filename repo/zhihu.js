'use strict';
var request = require('request');
const parse5 = require('parse5');

const URL = "https://news-at.zhihu.com/api/3/news/hot";

var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'webview';
    result.source = 'zhihudaily';
    result.data = [];
    for (var i in data) {
        var item = data[i];
        var content = {
            id: result.source + '_' + item.id,
            title: item.title,
            display_content: item.share_url,
            read_content: parseHtml(item.body),
            type: 'multi',
            image: item.image,
            thumbnail: item.thumbnail,
            share_url: item.share_url,
            image_source: item.image_source,
            script: "javascript:(function(){document.getElementsByClassName(\"header-for-mobile\")[0].style.display=\"none\"}).call()"
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
    if (page > 1) {
        response.json(parseToCommonFormat([]));
        return;
    }
    var url = URL;
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
            var promises = [];
            data.recent.forEach(function (t) {
               promises.push(new Promise(function (resolve) {
                   var url = t.url;
                   getBody(url, resolve);
               }));
            });
            Promise.all(promises).then(function (results) {
               response.json(parseToCommonFormat(results));
            }, function (err) {
               response.send('err ' + err);
            })
        }
    })
};

module.exports = handler;