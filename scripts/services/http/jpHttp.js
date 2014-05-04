'use strict';

angular.module('voiceUp').
    service('jpHttp', ['$http', 'proxyHttp', 'pubsub', 'settings',
        function ($http, proxyHttp, pubsub, settings) {

            log.service('jpHttp');

            var jpHttpPubsub = pubsub.getInstance();

            var jpHttp;

            // Factory method to choose the http service
            if (settings.api.useProxy) {
                jpHttp = proxyHttp;
            } else {
                jpHttp = $http;

                jpHttp.defaults.headers.common['Content-type'] = 'application/json';
                jpHttp.defaults.headers.common['Accept'] = 'application/json';
            }

            // SET HEADERS

            // Set the Authorization Basic Headers
            // TODO: store the user and password in a cookie
//            jpHttp.defaults.headers.common.Authorization = 'Basic ' + base64.encode(settings.basicCredentials.user + ':' + settings.basicCredentials.password);

//            jpHttp.defaults.headers.common['API-Version'] = '2014-03-11';

            return {
                defaults: {
                    // Set the Default Endpoint
                    endpoint: settings.api.endpointOrigin
                },

                /**
                 * The beforeDownload event
                 *  Needs to be placed before the get() or post() b/c they return a promise
                 *
                 * @param fn
                 * @returns {*}
                 */
                beforeRequest: function (fn) {
                    jpHttpPubsub.subscribe(fn, 'beforeRequest');

                    return this;
                },

                /**
                 * The afterDownload event
                 *  Needs to be placed before the get() or post() b/c they return a promise
                 *
                 * @param fn
                 * @returns {*}
                 */
                afterRequest: function (fn) {
                    jpHttpPubsub.subscribe(fn, 'afterRequest');

                    return this;
                },

                /**
                 * The whenSuccess event is fired on any method(get,post for now) success event.
                 *  Used to track any jpHttp handling
                 *  Needs to be placed before the get() or post() b/c they return a promise
                 *
                 * @param fn
                 * @returns {*}
                 */
                whenSuccess: function (fn) {
                    jpHttpPubsub.subscribe(fn, 'whenSuccess');

                    return this;
                },

                /**
                 * The whenError event is fired on any method(get,post for now) error event.
                 *  Used to track any jpHttp handling
                 *  Needs to be placed before the get() or post() b/c they return a promise
                 *
                 * @param fn
                 * @returns {*}
                 */
                whenError: function (fn) {
                    jpHttpPubsub.subscribe(fn, 'whenError');

                    return this;
                },


                get: function (url, config) {
                    jpHttpPubsub.publish('beforeRequest', {}, ['GET', url]);
                    return jpHttp.get(url, config).
                        success(function () {
                            jpHttpPubsub.publish('whenSuccess', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        }).
                        error(function (data, config) {
                            jpHttpPubsub.publish('whenError', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        });
                },
                post: function (url, data, config) {
                    jpHttpPubsub.publish('beforeRequest', {}, ['POST', url, data]);
                    return jpHttp.post(url, data, config).
                        success(function () {
                            jpHttpPubsub.publish('whenSuccess', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        }).
                        error(function () {
                            jpHttpPubsub.publish('whenError', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        });
                },
                put: function (url, data, config) {
                    jpHttpPubsub.publish('beforeRequest', {}, ['PUT', url, data]);
                    return jpHttp.put(url, data, config).
                        success(function () {
                            jpHttpPubsub.publish('whenSuccess', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        }).
                        error(function () {
                            jpHttpPubsub.publish('whenError', {}, arguments);
                            jpHttpPubsub.publish('afterRequest', {}, arguments);
                        });
                }
            };
        }]);