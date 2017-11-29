'use strict';
var request = require('request');

const URL = "http://www.zhihu.com/api/v4/questions/27165092/answers";
const URL_SUFFIX = "&include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees&data%5B%2A%5D.author.follower_count%2Cbadge%5B%3F%28type=best_answerer%29%5D.topics&data%5B%2A%5D.mark_infos%5B%2A%5D.url=&sort_by=default";
const URL_ZHUANLAN_PREFIX = "https://www.zhihu.com";
const PAGE_SIZE = 20;


var parseHtml = function(html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,' ').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
};
var parseu = function(str) {
    var co = str.replace(/\u/g,'%u');
    return unescape(co);
};
var parseToCommonFormat = function(data) {
    var result = {};
    result.api_type = 'normal';
    result.source = 'zhihuhuida';
    result.data = [];
    for (var i in data) {
        var item = data[i];
        var content = {
            id: result.source + '_' + item.id,
            title: item.question.title,
            display_content: item.url,
            read_content: parseHtml(parseu(item.content)),
            type: 'multi',
            image: item.author.avatar_url_template,
            thumbnail: item.titleImage,
            share_url: item.url,
            image_source: item.author.avatar_url
        };
        result.data.push(content);
    }
    result.count = result.data.length;
    return result;
};

var handler = function (req, response, next) {
    var page = req.query.page || 1;
    var limit = PAGE_SIZE;
    var offset = (page - 1) * PAGE_SIZE;
    var url = URL + '?limit=' + limit + '&offset=' + offset + URL_SUFFIX;
    request({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'authorization': 'Bearer Mi4xTE9JQkFBQUFBQUFBSUlCdUhKT2lDUmNBQUFCaEFsVk5zd0xtV2dEVkZTbmRUZE9XQXJkNkVCMWdJMVNFZkZjTHNR|1509471411|ea18f74678151ae2082307f6737d4bab3e571a47',
            //'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Mobile Safari/537.36'
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    }, function (err, res, body) {
        if (err) {
            response.send('Request failed with response code ' + res.statusCode);
        } else {
            var data = JSON.parse(body);
            var result = parseToCommonFormat(data.data);
            response.json(result);
        }
    });
};

module.exports = handler;