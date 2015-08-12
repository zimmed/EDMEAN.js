'use strict';

(function (ctrl) {

    ctrl.getModule('demo').directive('demoConnectionViewer',
        ['demoConfig',
        function (config) {
            return  {
                restrict: 'EA',
                templateUrl: config.modulePath + config.partialsPath + 'connection.viewer.partial.html',
                controller: 'DemoConnectionController'
            };
        }]
    );

})(window.AppCtrl);