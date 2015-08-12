'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    express = require('express'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),

    compression = require('compression'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),

    routes = require('../app/routes/init'),
    logger = require('./logger'),
    config = require('./config'),
    app = express();

module.exports = function (mongooseConnection) {

    var server;

    _.extend(app.locals, config.locals);
    app.locals.port = config.serverPort;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    app.use(compression({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 3
    }));

    app.set('showStackError', true);

    app.set('views', path.join(config.basePath, 'app/views'));
    app.set('view engine', 'jade');

    app.use(logger.httpLogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(config.basePath, config.publicStatic)));

    if (config.favicon) {
        app.use(favicon(config.resourcePath('icon', 'favicon.ico')));
    }

    app.use(cookieParser());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecretKey,
        store: new mongoStore({
            mongooseConnection: mongooseConnection,
            collection: config.sessionCollection
        }),
        cookie: config.sessionCookie,
        name: config.sessionName
    }));

    /** Routes **/
    routes(app);
    //logger.log('INFO', "Using routes for: " + routes.join('\n'));


    if (config.secure) {
        app.all('*', function (req, res, next) {
            if (req.secure) return next();
            var port = (config.serverPort !== '443') ? ':' + config.serverPort : ''
            res.redirect('https://' + req.hostname + port + req.url);
        });
        var key = fs.readFileSync(path.join(config.basePath, config.httpsPrivateKey)),
            cert = fs.readFileSync(path.join(config.basePath, config.httpsCertificate));
        server = https.createServer({key: key, cert: cert}, app);
        server.__init = function () {
            return new Promise(function (resolve, reject) {
                try {
                    server.listen(config.serverPort, config.serverIP, function () {
                        resolve(server);
                    });
                } catch (e) {
                    reject(e);
                }
            });
        };
    } else {
        server = http.createServer(app);
        server.__init = function () {
            return new Promise(function (resolve, reject) {
                try {
                    server.listen(config.serverPort, config.serverIP, function () {
                        resolve(server);
                    });
                } catch (e) {
                    reject(e);
                }
            });
        };
    }
    return server;
};

