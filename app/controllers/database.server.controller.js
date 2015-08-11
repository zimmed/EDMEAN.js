var Promise = require('bluebird'),
    mongoose = require('mongoose'),
    models = require('../models/database.model');

var db = module.exports = {
    save: function (doc) {
        return new Promise(function (resolve, reject) {
            doc.save(function (err) {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    }
};