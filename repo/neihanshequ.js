'use strict';
var request = require('request');

const URL = "http://is.snssdk.com/neihan/stream/mix/v1/?mpic=1&webp=1&essence=1&content_type=-102&message_cursor=-1&am_longitude=110&am_latitude=120&am_city=%E5%8C%97%E4%BA%AC%E5%B8%82&am_loc_time=1489226058493&count=30&min_time=1489205901&screen_width=1450&do00le_col_mode=0&iid=3216590132&device_id=32613520945&ac=wifi&channel=360&aid=7&app_name=joke_essay&version_code=612&version_name=6.1.2&device_platform=android&ssmix=a&device_type=sansung&device_brand=xiaomi&os_api=28&os_version=6.10.1&uuid=326135942187625&openudid=3dg6s95rhg2a3dg5&manifest_version_code=612&resolution=1450*2800&dpi=620&update_version_code=6120";

var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'normal';
    result.source = 'neihanshequ';
    result.data = [];
    for (var i in data) {
        var item = data[i].group;
        if (item) {
            var content = {
                id: result.source + '_' + item.id,
                title: item.text,
                display_content: item.content,
                read_content: item.text,
                type: 'word',
                create_at: item.create_time,
                share_url: item.share_url,
                user: {
                    name: item.user.name,
                    id: item.user.user_id,
                    avatar: item.user.avatar_url
                }
            };
            result.data.push(content);
        }
    }
    result.count = result.data.length;
    return result;
};

var handler = function (req, response, next) {
    // var time = new Date().getTime() / 1000 - 1000*300;
    var url = URL;
    // var url = URL + parseInt(time);
    request({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            referer: 'http://m.neihanshequ.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    }, function (err, res, body) {
        if (err) {
            response.send('Request failed with response code ' + res.statusCode);
        } else {
            var data = JSON.parse(body);
            var result = parseToCommonFormat(data.data.data);
            response.json(result);
        }
    })
};

module.exports = handler;