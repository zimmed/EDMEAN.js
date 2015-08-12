'use strict';

/** Must add all client dependencies here. **/
/** Order listed is important. **/
module.exports = {

    all: {
        vendor: {
            js: {
                socketio: '/socket.io/socket.io.js',
                angular: 'lib/angular/angular.js',
                jquery: 'lib/jquery/dist/jquery.js',
                bootstrap: 'lib/bootstrap-sass-official/assets/javascripts/bootstrap.js'
            },
            css: {

            }
        },
        js: {
            application: ['config.js', 'application.js'],
            modules: ['modules/*.js', 'modules/*/*.js', 'modules/*/*[!tests]*/*.js']
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
                angular: 'lib/angular/angular.min.js',
                jquery: 'lib/jquery/dist/jquery.min.js',
                bootstrap: 'lib/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'
            }
        }
    }
};