'use strict';

const online_version = 0;

var handler = function (req, res, next) {
    var query_version = req.query.versionCode || 9999;
    var result = {
        online_version: online_version,
        query_version: query_version,
        online: online_version >= query_version
    };
    res.json(result);
};

module.exports = handler;