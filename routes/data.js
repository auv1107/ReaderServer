'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/qiubaihot', require('../repo/qiubaihot'));
router.get('/zhihu', require('../repo/zhihu'));
router.get('/scientific_invest', require('../repo/scientific_invest'));
router.get('/zhidao', require('../repo/zhidao'));
router.get('/qiubainew', require('../repo/qiubainew'));
router.get('/zhihudaily', require('../repo/zhihudaily'));

router.get('/radio', require('../repo/radio'));

module.exports = router;