'use strict';

module.exports = {
    secure: false,
    baseUrl: '//localhost',
    mongoUrl: '//localhost',
    mongoDBName: 'edmean-test',
    serverIP: 'localhost',
    serverPort: '3030',
    loggerVerboseLevel: 'ALL',
    loggerDieLevel: 'ERROR',
    morganFormat: 'dev',
    loggerMethod: console.log,
    favicon: null,

    sessionCookie: {secure: false, maxAge: 15 * 60 * 1000},

    locals: {title: 'EDMEAN.js Application | Dev'}
};
