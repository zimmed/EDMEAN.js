'use strict';

var mongoose = require('mongoose'),
    Promise = require('bluebird'),
    config = require('./config');

module.exports = function () {
    var port = (config.mongoPort !== '27017') ? ':' + config.mongoPort : '';
    return new Promise(function (resolve, reject) {
        var db = mongoose.createConnection('mongodb:' + config.mongoUrl + port + '/' + config.mongoDBName);
        db.on('error', function () {
            reject(new Error('Could not connect to mongodb:' + config.mongoUrl + port + '/' + config.mongoDBName));
        });
        db.once('open', function () {
            resolve(db);
        });
    });
};