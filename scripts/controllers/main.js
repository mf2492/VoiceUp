'use strict';

angular.module('voiceUp')
    .controller('MainCtrl', ['$scope', 'semantria', 'comments',
        function ($scope, semantria, comments) {

            log.ctrl('Main');

            $scope.comments = comments.get();

        }]);
