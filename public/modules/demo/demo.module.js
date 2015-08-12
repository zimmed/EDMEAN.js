'use strict';

(function (ctrl) {

    ctrl.createModule('demo', [
        ctrl.getModuleName('config'),
        ctrl.getModuleName('core')
    ]);

})(window.AppCtrl);