'use strict';

/** Must add all client dependencies here. **/
module.exports = {

    all: {
        vendor: {
            js: {
                bootstrap: 'lib/bootstrap-sass-official/javascripts/bootstrap.js',
                jquery: 'lib/jquery/dist/jquery.js'
            },
            css: {

            }
        },
        js: {
            socketio: '/socket.io/socket.io.js',
            application: ['config.js', 'application.js'],
            modules: ['modules/*.js', 'modules/*/*.js', 'modules/*/*![tests]*/*.js']
        },
        css: {
            main: 'res/styles/main.css'
        },
        tests: {
            modules: 'modules/*/tests/*.js'
        }
    },

    develop: {

    },

    release: {
        vendor: {
            js: {
                bootstrap: 'lib/bootstrap-sass-official/javascripts/bootstrap.min.js',
                jquery: 'lib/jquery/dist/jquery.min.js'
            }
        }
    }
};