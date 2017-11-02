'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/qiubai', require('../repo/qiubai'));
router.get('/zhihu', require('../repo/zhihu'));
router.get('/radio', require('../repo/radio'));

module.exports = router;