'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/version', require('../api/version'));
router.get('/is_online', require('../api/is_online'));

module.exports = router;