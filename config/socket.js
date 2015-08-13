'use strict';

var path = require('path'),
    glob = require('glob'),
    Promise = require('bluebird'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),

    config = require('./config'),
    sockets = require('../app/controllers/socket.server.controller');

module.exports = function (server, mongooseConnection) {
    return new Promise(function (resolve, reject) {
        try {
            glob(path.join(config.basePath, 'app', 'events') + '/*', function (err, files) {
                if (err) return reject(err);
                for (var i = 0, l = files.length; i < l; i++) {
                    require(files[i])(sockets.Router);
                }
                sockets.initialize(server, function (socket, next) {
                    var handshake = socket.handshake;
                    if (handshake.headers.cookie) {
                        var req = {headers: {cookie: handshake.headers.cookie}};
                        cookieParser(config.sessionSecretKey)(req, null, function (err) {
                            if (err) return next(err);
                            var sessionID = req.signedCookies[config.sessionName] ||
                                    req.cookies[config.sessionName],
                                sessionStore = new mongoStore({mongooseConnection: mongooseConnection});
                            sessionStore.get(sessionID, function (err, session) {
                                if (err) return next(err);
                                // userData bellow is written once the Express session is created
                                if (session) {
                                    socket.session = session;
                                    return next();
                                } else {
                                    return next(new Error('Invalid Session'));
                                }
                            });
                        });
                    } else {
                        return next(new Error('Missing Cookies'));
                    }
                });
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};