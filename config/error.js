'use strict';

var log = require('./logger').errorLogger;

module.exports = {
    handle: function (msg, data, fatal) {
        return function (error) {
            if (msg) {
                error.orig = error.message;
                error.message = msg;
            }
            log(error, data, fatal);
        }
    }
};