'use strict';

angular.module('voiceUp')
    .controller('MainCtrl', ['$scope', 'semantria', 'comments', '$stateParams', '$timeout', '$state',
        function ($scope, semantria, comments, $stateParams, $timeout, $state) {

            log.ctrl('Main');

            $scope.comments = comments.get();
            $scope.categories = comments.getCategories();

            $scope.category = $stateParams.category;

            $log($scope.comments)
//			comments.purge();

			$scope.voteYes = function(commentIndex) {
                $scope.comments[commentIndex].votedUp = true;
                comments.voteYes(commentIndex);
			}

			$scope.voteNo = function(commentIndex) {
                $scope.comments[commentIndex].votedDown = true;
                comments.voteNo(commentIndex);
			}

            $scope.filterNow = function(category) {
                $timeout(function() {
                    $state.transitionTo('main', {category: category});
                }, 500)
            }

        }]);
