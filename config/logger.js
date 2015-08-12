'use strict';

var config = require('./config'),
    process = require('process'),
    colors = require('colors'),
    moment = require('moment'),
    morgan = require('morgan');

module.exports = {};

var sStream = {
    content: '',
    write: function (string) {
        sStream.content += string;
    },
    read: function () {
        var s = this.content;
        this.content = '';
        return s;
    },
    toString: function () {
        return this.content;
    },
    pipe: function (stream) {
        stream.write(sStream.read());
    }
};

var morganLogger = morgan(config.morganFormat, {stream: sStream});
var loggerLevels = {ALL: 0, INFO: 1, WARN: 2, ERROR: 3, FATAL: 4};
var loggerColors = {INFO: 'cyan', WARN: 'yellow', ERROR: 'magenta', FATAL: 'red'};

var log = module.exports.log = function (level, message, error, data) {
    var leval = loggerLevels[level],
        time = moment().format('HH:mm:ss').gray,
        clr = loggerColors[level];
    if (error && !data) data = {};
    else if (!data) data = '';
    if (error) data.error = error;
    if (leval >= loggerLevels[config.loggerVerboseLevel]) {
        config.loggerMethod('[' + time + '] [' + level[clr] + '] ' + message, data);
    }
    if (error) config.loggerMethod(error.stack);
    if (leval >= loggerLevels[config.loggerDieLevel]) {
        process.exit();
    }
};


module.exports.httpLogger = function (req, res, next) {
    morganLogger(req, res, function (err) {
        if (err) {
            log('ERROR', sStream.read(), err);
        } else {
            log('INFO', sStream.read());
        }
        next(err);
    });
};

module.exports.errorLogger = function (error, data, fatal) {
    if (typeof(error) === 'string') error = new Error(error);
    var level = (fatal) ? 'FATAL' : 'ERROR';
    log(level, error.message, error, data);
};

module.exports.logInfo = function (message, data) {
    log('INFO', message, null, data);
};

module.exports.logWarn = function (message, data) {
    log('WARN', message, null, data);
};