'use strict';
var request = require('request');

const URL = "http://36kr.com/api/info-flow/main_site/posts?per_page=20&page=";
const POST_URL_PRE = "http://36kr.com/api/post";

var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};

var getPostUrl = function (id) {
    return POST_URL_PRE + "/" + id;
};

var parse36krUnicode = function (content) {
    var ucode = content.replace(/&#x(.+?);/gi, '\%u$1');
    return unescape(ucode);
};

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'webview';
    result.source = '36kr';
    result.data = [];
    for (var i in data) {
        var item = data[i].data;
        var content = {
            id: result.source + '_' + item.id,
            title: item.title || item.summary,
            display_content: item.share_data.default.url,
            read_content: parseHtml(parse36krUnicode(item.content)),
            type: 'multi',
            create_at: item.created_at,
            image: item.cover,
            thumbnail: item.cover,
            share_url: item.share_data.default.url,
            image_source: item.image_source
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
            var promises = [];
            data.data.items.forEach(function (t) {
                promises.push(new Promise(function (resolve) {
                    var url = getPostUrl(t.id);
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