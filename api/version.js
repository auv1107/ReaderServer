'use strict';
var request = require('request');

var debugResult = function () {
    return {
        "app_name": "apk更新demo",
        "download_url": "http://imtt.dd.qq.com/16891/181860FED06EFE7AC47A1A3614987A9C.apk?fsname=com.qq.reader_6.5.7.805_105.apk&csr=1bbd",
        "file_md5": "181860FED06EFE7AC47A1A3614987A9C",
        "file_size": "31227937",
        "is_forced": "1",
        "msg": "",
        "package": "com.lzj.appupdate",
        "remark": "1、全新首页，新视觉 新体验\n2、修复若干bug",
        "status": 0,
        "version_id": "999999",
        "version_name": "v2.0.0"
    };
};

var releaseResult = function () {
    return {
        "app_name": "",
        "download_url": "",
        "file_md5": "",
        "file_size": "0",
        "is_forced": "0",
        "msg": "",
        "package": "app.sctdroid.com.qiubaireader",
        "remark": "",
        "status": 0,
        "version_id": "1",
        "version_name": ""
    };
};

var handler = function (req, response, next) {
    var debug = req.query.debug || "0";
    var result = "";
    if (debug === "1") {
        result = debugResult();
    } else {
        result = releaseResult();
    }
    response.json(result);
};

module.exports = handler;
