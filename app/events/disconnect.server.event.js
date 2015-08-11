'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('disconnect');

    router.add(function () {
        log('User disconnected.');
    });
};