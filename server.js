'use strict';

var initDb = require('./config/database'),
    initSocket = require('./config/socket'),
    getServer = require('./config/express'),
    logInfo = require('./config/logger').logInfo,
    handleError = require('./config/error').handle;

initDb(require('mongoose')).then(function (db) {
    logInfo('Connected to database successfully.');

    var server = getServer(db);

    initSocket(server, db).then(function () {
        logInfo('Socket server started.');

        server.__init().then(function (server) {
            var address = server.address().address,
                port = server.address().port;
            logInfo('Server started. Listening at ' + address + ' on port ' + port + '.');

        }, handleError('Failed to initialize http/s server.', null, true))

    }, handleError('Failed to initialize socket server.', null, true));

}, handleError('Failed to establish mongo connection.', null, true));