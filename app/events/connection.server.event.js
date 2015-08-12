'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('connection');

    router.add(function () {
        var io = router.getIO();

        log('User connected.');

        this.emit('client-connected');

        io.emit('connections-changed', io.sockets.sockets.length);
    });
};