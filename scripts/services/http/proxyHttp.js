'use strict';

angular.module('voiceUp')
    .factory('proxyHttp', ['$http',
        function ($http) {
            log.service('ProxyHttp');

            var proxy = {
                url: 'http://127.0.0.1/jackpocket_phonegap/proxy.php'
            }

            var proxyHttp = clone($http);

            /**
             * Handles all the requests to the proxy
             *
             * @param url
             * @param method
             * @param data
             * @returns {*}
             */
            var proxyRequest = function (url, method, data) {

                method = method || 'GET';

                var promise = $http({
                    method: 'POST',
                    url   : proxy.url,
                    data  : param({
                        endpoint: url,
                        method  : method,
                        data    : data || ''
                    })
                });

                // Overwrite the success callback
                promise.success = function (fn) {
                    promise.then(function (response) {
                        // Overwrite the config url to show the final endpoint not the proxy
                        response.config.url = url;
                        response.config.method = method;
                        fn(response.data, response.status, response.headers, response.config); // normally it returns the private config var
                    });
                    return promise;
                }

                // Overwrite the success callback
                promise.error = function (fn) {
                    promise.then(null, function (response) {
                        response.config.url = url;
                        fn(response.data, response.status, response.headers, response.config); // normally it returns the private config var
                    });
                    return promise;
                }

                return promise;
            }

            // Set the specific headers for the proxy
            proxyHttp.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            proxyHttp.get = function (url) {
                return proxyRequest(url);
            }

            proxyHttp.post = function (url, data) {
                return proxyRequest(url, 'POST', data);
            }

            proxyHttp.put = function (url, data) {
                return proxyRequest(url, 'PUT', data);
            }

            return proxyHttp;
        }]);
