'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/version', require('../api/version'));

module.exports = router;