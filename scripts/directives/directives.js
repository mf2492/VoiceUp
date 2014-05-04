'use strict';

angular.module('voiceUp').
    directive('addComment', [
        function () {
            return {
                link: function ($scope, element) {
                    element.on('click', function (event) {
                        $scope.analyze().then(function () {
                            $scope.addComment();
                        });
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
        }]).
    directive('changeColor', ['$timeout',
        function ($timeout) {
            return {
                link: function ($scope, element) {
                    $scope.$watch('analyzed', function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            element.css('background-color:red');
                            element.addClass('green')
                        }
                    });
                }
            }
        }
    ]).
    directive('thumbDown', [function () {

        return function (scope, element) {
            scope.$watch('comment')
            element.find('img').show()
                .animate({
                    'margin-left': '35%',
                    'height': "60px",
                    'width': '60px'
                })
                .fadeOut();
        }

    }]).
    directive('externalLink', function() {
        return function(scope, element, attributes) {
            element.on('click', function() {
                window.location.href = attributes.href;
                event.preventDefault();
            });
        }
    });
