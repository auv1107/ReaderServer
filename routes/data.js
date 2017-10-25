'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/qiubai', require('../repo/qiubai'));

module.exports = router;