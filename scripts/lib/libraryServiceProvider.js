'use strict';

angular.module('voiceUp').
    provider('pubsub', function () {
        log.service('pubsub');
        this.$get = function () {
            return {
                // Builds a new instance of the observer with its own stacks array
                // used instead of dealing with namespaces
                getInstance: function () {
                    return new PubSub();
                }
            }
        };
    })
;
