'use strict';

(function (ctrl) {

    ctrl.getModule('demo').controller('DemoConnectionController',
        ['Socket', '$scope',
        function (Socket, $scope) {

            $scope.connected = false;
            $scope.numConnected = 0;

            Socket.on('client-connected', function () {
                $scope.connected = true;
            });

            Socket.on('client-disconnected', function () {
                $scope.connected = false;
            });

            Socket.on('connections-changed', function (number) {
                $scope.numConnected = number;
            });

        }]
    );

})(window.AppCtrl);