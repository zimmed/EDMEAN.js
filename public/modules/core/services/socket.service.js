'use strict';

(function (ctrl, io) {

    ctrl.getModule('core').service('Socket', ['Config', '$timeout',
        function (Config, $timeout) {
            var address = Config.baseUrl + ':' + Config.port;

            this.socket = io(address);

            this.on = function (event, handler) {
                if (this.socket) {
                    this.socket.on(event, function (data) {
                        $timeout(function () { handler(data); });
                    });
                }
            };

            this.emit = function (event, data) {
                if (this.socket && this.socket.connected) {
                    this.socket.emit(event, data);
                }
            };

            this.off = function (event) {
                if (this.socket) {
                    this.socket.removeListener(event);
                }
            };
        }
    ]);

})(window.AppCtrl, window.io);