'use strict';

angular.module('voiceUp').
    directive('addComment', [
        function () {
            return {
                link: function ($scope, element) {
                    element.on('click', function (event) {
                        $scope.addComment();
                    });
                }
            }
        }]).
     directive('swipeVote', [
            function () {
                return {
                    link: function ($scope, element) {
                        element.on('click', function (event) {
                            $scope.swipeVote();
                        });
                    
                    }
                }
            }]);