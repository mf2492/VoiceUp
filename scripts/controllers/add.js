'use strict';

angular.module('voiceUp')
    .controller('AddCtrl', ['$scope', 'semantria', 'comments',
        function ($scope, semantria, comments) {

            log.ctrl('Main');

            $scope.comment = '';
            $scope.analyzed = null;

            $scope.background = '#fff';

            var comment;

            $scope.$watch('comment', function (newComment, oldComment) {
                if (newComment == oldComment) return;

                comment = newComment;
                if ((comment.length % 3 == 0)) $scope.analyze();
            });

            $scope.analyze = function () {
                return semantria.make(comment).
                    then(function (response) {
                        $log(response[0]);
                        if (response[0]) {
                            $scope.analyzed = response[0];
                            $scope.background = getBackground(response[0].sentiment_score) || $scope.background;
                            log.info('background changed to', $scope.background);
                        }
                    });
            }

            function getBackground(score) {
                var maxPositive = {r:24, g:254, b:0},
                    maxNeutral  = {r:255, g:255, b:255},
                    maxNegative = {r:254, g:17, b:0},
                    r, g, b;

                  if (score < 0) {
                      r = (maxNeutral.r - maxNegative.r) * score;
                      g = (maxNeutral.g - maxNegative.g) * score;
                      b = (maxNeutral.b - maxNegative.b) * score;
                  } else if (score > 0) {
                      r = (maxNeutral.r - maxPositive.r) * score;
                      g = (maxNeutral.g - maxPositive.g) * score;
                      b = (maxNeutral.b - maxPositive.b) * score;
                  } else {
                      r = maxNeutral.r;
                      g = maxNeutral.g;
                      b = maxNeutral.b;
                  }

                $log(score, 'score')

                $log(r, 'r');
                $log(g, 'g');
                $log(b, 'b');


                var hex = rgbToHex(Math.round(r), Math.round(g), Math.round(b));
                $log(hex, 'hex')
                return (hex.length == 7) ? hex : false;
            }

            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }

            $scope.addComment = function () {

                comments.add($scope.comment, {
                    sentiment_score: $scope.analyzed.sentiment_score,
                    sentiment_polarity: $scope.analyzed.sentiment_polarity,
                }, $scope.background);

            }

        }]);
