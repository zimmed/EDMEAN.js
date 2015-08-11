'use strict';

var _ = require('lodash'),
    path = require('path');

module.exports = (function (appState) {

    var config = {},
        defaults = {
            secure: false,
            baseUrl: '//localhost',
            mongoUrl: '//localhost',
            mongoPort: '27017',
            mongoDBName: 'edmean-test',
            serverIP: 'localhost',
            serverPort: '3030',
            loggerVerboseLevel: 'ALL',
            loggerDieLevel: 'ERROR',
            loggerMethod: console.log,

            httpsPrivateKey: '.ssl/private.key',
            httpsCertificate: '.ssl/certificate.pem',

            sessionCollection: 'sessions',
            sessionSecretKey: '8G!3rf00-1d$',
            sessionCookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000,
            },
            sessionName: 'connect.sid',

            publicStatic: 'public',
            resource: {
                'base': 'res',
                'core' : 'res/core'
            },
            favicon: 'favicon.ico',

            locals: {
                title: 'EDMEAN.js Application',
                description: 'The lightweight, Event-Driven MongoDB/Express/AngularJS/Node.js application framework.',
                keywords: ['Express', 'Node.js', 'MongoDB', 'AngularJS', 'Event-Driven', 'MEAN', 'Framework', 'zimmed'],
                authors: ['zimmed <zimmed@zimmed.io>'],
                email: 'zimmed@zimmed.io',
                license: 'MIT'
            },

            basePath: (function () { return path.join(__dirname, '..'); })(),

            /** Default Methods **/
            resourcePath: function (module, file) {
                return path.join(this.basePath, this.publicStatic, this.resource[module], file);
            },
            getUrl: function () {
                return ((this.secure) ? 'https:' : 'http:') + this.baseUrl;
            }
        };

    if (appState) {
        try {
            config = require('./states/config-' + appState);
        } catch (e) {
            console.log('Warning: No config file for appState: ' + appState);
        }
    }

    return _.merge(defaults, config);

})('develop');