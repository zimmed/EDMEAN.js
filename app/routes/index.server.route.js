'use strict';

var router = module.exports = require('express').Router();

router.get('', function (req, res, next) {
    res.render('index', req.app.locals);
});