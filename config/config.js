'use strict';

var APP_ENVIRONMENT_STATE = 'develop';

var _ = require('lodash'),
    path = require('path'),
    glob = require('glob'),
    assets = require('./assets');

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
                'icon': 'res/icons',
                'font': 'res/fonts',
                'image': 'res/images',
                'style': 'res/styles',
                'data': 'res/json',
                'bower': 'lib'
            },
            favicon: 'favicon.ico',
            sassScss: 'sass',
            sassMain: 'main',

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
                if (!file) file = '';
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

    defaults = _.merge(defaults, config);
    defaults.assets = parseAssets(assets, appState, path.join(defaults.basePath, defaults.publicStatic));
    return defaults;

})(APP_ENVIRONMENT_STATE);

function parseAssets (assets, appState, cwd) {
    var key, js = [], css = [], all = assets.all, state;

    if ((state = assets[appState])) {
        if (state.js) _.extend(all.js, state.js);
        if (state.css) _.extend(all.css, state.css);
        if (state.vendor) {
            if (state.vendor.js) _.extend(all.vendor.js, state.vendor.js);
            if (state.vendor.css) _.extend(all.vendor.css, state.vendor.css)
        }
    }


    for (key in all.vendor.js) {
        if (all.vendor.js.hasOwnProperty(key)) {
            js = js.concat(getFiles(all.vendor.js[key], cwd));
        }
    }
    for (key in all.vendor.css) {
        if (all.vendor.css.hasOwnProperty(key)) {
            css = css.concat(getFiles(all.vendor.css[key], cwd));
        }
    }
    for (key in all.js) {
        if (all.js.hasOwnProperty(key)) {
            js = js.concat(getFiles(all.js[key], cwd));
        }
    }
    for (key in all.css) {
        if (all.css.hasOwnProperty(key)) {
            css = css.concat(getFiles(all.css[key], cwd));
        }
    }
    return {js: js, css: css};
}

function getFiles(mixed, cwd) {
    var files = [];
    if (Array.isArray(mixed)) {
        for (var i = 0, l = mixed.length; i < l; i++) {
            files = files.concat(getFiles(mixed[i], cwd));
        }
    } else if (typeof(mixed) === 'string') {
        if (mixed.indexOf('*') === -1) files.push(mixed);
        else {
            files = glob.sync(mixed, {cwd: cwd});
        }
    }
    return files;
}