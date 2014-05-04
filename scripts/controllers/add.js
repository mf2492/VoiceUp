'use strict';

angular.module('voiceUp')
    .controller('AddCtrl', ['$scope', 'semantria', 'comments',
        function ($scope, semantria, comments) {

            log.ctrl('Main');

            $scope.comment = '';
            $scope.analyzed = null;


            $scope.$watch('comment', function (newComment, oldComment) {
                if (newComment == oldComment) return;

                var lastChar = newComment.substr(newComment.length - 2, 1);

                if (lastChar == ' ') {
                    semantria.make(newComment).
                        then(function (response) {
                            $log(response[0]);
                            $scope.analyzed = response[0];

                        });
                }
            });

            $scope.addComment = function() {

                comments.add($scope.comment, {
                    sentiment_score: $scope.analyzed.sentiment_score,
                    sentiment_polarity: $scope.analyzed.sentiment_polarity
                });

            }

        }]);
