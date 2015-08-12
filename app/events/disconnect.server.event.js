'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('disconnect');

    router.add(function () {
        var io = router.getIO();

        log('User disconnected.');

        this.emit('client-disconnected');

        io.emit('connections-changed', io.sockets.sockets.length);
    });
};