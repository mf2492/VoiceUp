'use strict';

angular.module('voiceUp')
    .controller('AddCtrl', ['$scope', 'semantria', 'comments', '$stateParams',
        function ($scope, semantria, comments, $stateParams) {

            log.ctrl('Main');

            $scope.comment = '';
            $scope.analyzed = null;

            $scope.background = '#fff';

            $scope.category = $stateParams.category;

            $scope.images = comments.getImages();
            $scope.randomImageIndex = comments.getRandomImageIndex();

            $scope.image = $scope.images[$scope.randomImageIndex];

            $scope.shuffle = function() {
                $scope.randomImageIndex = comments.getRandomImageIndex();
                $scope.image = $scope.images[$scope.randomImageIndex];
                $log($scope.image, 'image')
            }

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
                var maxPositive = {r: 24, g: 254, b: 0},
                    maxNeutral = {r: 255, g: 255, b: 255},
                    maxNegative = {r: 254, g: 17, b: 0},
                    r, g, b, a;

                if (score > 0) {
                    r = maxPositive.r;
                    g = maxPositive.g;
                    b = maxPositive.b;
                    a = (score + 2) * .2;
                } else if (score < 0) {
                    r = maxNegative.r;
                    g = maxNegative.g;
                    b = maxNegative.b;
                    a = (score + 2) * .2;
                } else {
                    r = maxNeutral.r;
                    g = maxNeutral.g;
                    b = maxNeutral.b;
                    a = .6;
                }

                $log(score, 'score')

                $log(r, 'r');
                $log(g, 'g');
                $log(b, 'b');
                $log(a, 'a');

                try {
                    return 'rgba('+r+','+g+','+b+','+ a +')';
                    //rgba2hex(r, g, b, Math.round(a));
                } catch (e) {
                    console.error(e);
                }
            }

            function rgba2hex(r, g, b, a) {
                if (r > 255 || g > 255 || b > 255 || a > 255)
                    throw "Invalid color component";
                return '#' + (256 + r).toString(16).substr(1) +((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
            }

            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }

            $scope.addComment = function () {

                comments.add($scope.comment, {
                    sentiment_score: $scope.analyzed.sentiment_score,
                    sentiment_polarity: $scope.analyzed.sentiment_polarity
                }, $scope.background, $scope.category, $scope.image);

            }

        }]);
