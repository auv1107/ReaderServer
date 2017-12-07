'use strict';
var request = require('request');

const BEFORE_URL = "https://news-at.zhihu.com/api/4/news/before";
const DETAIL_URL = "https://news-at.zhihu.com/api/4/news";

var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};

var zFill = function (num) {
    var str = "0" + num;
    return str.substring(str.length - 2, str.length);
};

var getDateByPage = function (page) {
    const dayMillis = 24 * 60 * 60 * 1000;
    var currentTime = new Date().getTime();
    var beforeTime = currentTime + dayMillis - (page - 1) * dayMillis;
    var pageDate = new Date(beforeTime);
    var date = pageDate.getFullYear() + "" + zFill(pageDate.getMonth() + 1) + zFill(pageDate.getDate());
    return date;
};

var getUrl = function (page) {
    var before = getDateByPage(page);
    return BEFORE_URL + "/" + before;
};

var getDetailUrl = function (id) {
    return DETAIL_URL + "/" + id;
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
    var url = getUrl(page);
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
            data.stories.forEach(function (t) {
               promises.push(new Promise(function (resolve) {
                   var url = getDetailUrl(t.id);
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