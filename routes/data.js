'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/qiubaihot', require('../repo/qiubaihot'));
router.get('/zhihu', require('../repo/zhihu'));
router.get('/scientific_invest', require('../repo/scientific_invest'));
router.get('/zhidao', require('../repo/zhidao'));
router.get('/qiubainew', require('../repo/qiubainew'));
router.get('/zhihudaily', require('../repo/zhihudaily'));
router.get('/weibobilibili', require('../repo/weibobilibili'));
router.get('/36krnew', require('../repo/36krnew'));

router.get('/radio', require('../repo/radio'));

module.exports = router;