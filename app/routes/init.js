'use strict';

module.exports = function (app) {
    /** Set all express routes here **/
    //app.use('/example', require('./example.server.route'));
    app.use('/', require('./index.server.route'));
};