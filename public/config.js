'use strict';

(function (module, angular, appLocals) {

    var application = null;

    var config = {
        /** Application Configuration Setup **/

        applicationName: 'EDMEAN',

        applicationDependencies: [
            'ngResource'
        ],

        moduleConstants: {
            scriptsPath: 'lib/',
            partialsPath: 'partials/'
        },

        appConstants: {
            secure: appLocals.secure,
            port: appLocals.port,
            title: appLocals.title,
            description: appLocals.description
        }
    };

    var controller = {
        /** Angular Controller Methods **/

        createApp: function () {
            var configModule = angular.module(
                controller.getModuleName('config'),
                []
            ).constant('Config', config.appConstants);

            application = angular.module(
                config.applicationName,
                config.applicationDependencies
            );
            application.requires.push(controller.getModuleName('config'));
            return application;
        },

        getApp: function () {
            return application;
        },

        createModule: function (name, dependencies) {
            var ngModule, ngModuleName = controller.getModuleName(name);

            ngModule = angular.module(
                ngModuleName,
                (dependencies || [])
            ).constant('modConfig', config.moduleConstants);

            application.requires.push(ngModuleName);

            return ngModule;
        },

        getModule: function (name) {
            try {
                return angular.module(controller.getModuleName(name));
            } catch (e) {
                return false;
            }
        },

        getModuleName: function (name) {
            return config.applicationName + '.' + name;
        }
    };

    /** Expose controller **/
    module.AppCtrl = controller;

})(window, window.angular, window.AppLocals);