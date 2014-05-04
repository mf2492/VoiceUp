'use strict';

angular.module('voiceUp', [
    'ui.router',
    'ngAnimate',
    'ngCookies' ,
    'ngResource',
    'ngSanitize',
    'ngTouch'
]).
    run(['$rootScope', 'jpHttp',
        function ($rootScope, jpHttp) {

            log.info('JackPocket started!');

            jpHttp.beforeRequest(function (method, url, data) {
                log.outbound(url, method, data);

                f7.showPreloader();
            }).
                afterRequest(function () {
                    f7.hidePreloader();
                }).
                whenSuccess(function (data, status, headers, config) {
                    log.inbound(config.url, config.method, data);
                }).
                whenError(function (data, status, headers, config) {
                    log.error(status + ' from ', config.url);
                    if (data) log.error(' With Data: ', data);
                    log.error(' With Headers: ', config.headers);
                });
        }]);
