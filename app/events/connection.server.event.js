'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('connection');

    router.add(function () {
        log('User connected.');
    });
};