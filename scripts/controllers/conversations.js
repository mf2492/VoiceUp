'use strict';

angular.module('voiceUp')
    .controller('ConversationsCtrl', ['$scope', 'semantria', 'comments', '$stateParams', '$timeout', '$state',
        function ($scope, semantria, comments, $stateParams, $timeout, $state) {

            log.ctrl('Main');

            $scope.comments = comments.get();
            $scope.categories = comments.getCategories();

            $scope.category = $stateParams.category;

            $log($scope.comments)
//			comments.purge();

			$scope.voteYes = function(id) {
//                $scope.comments[commentIndex].votedUp = true;
                comments.voteYes(id);
                disabled(id);
			}

			$scope.voteNo = function(id) {
//                $scope.comments[commentIndex].votedDown = true;
                comments.voteNo(id);
                disabled(id);
			}
			
			$scope.getCommentByID = function(id) {
//              console.log(comments.getCommentByID(id));
                //current_id = comments.getCommentByID(id).id;
                alert(current_id);
            }

            $scope.checkid = function(item){
                return item.id === parseInt(current_id);
            }

            $scope.filterNow = function(category) {
                $timeout(function() {
                    $state.transitionTo('main', {category: category});
                }, 500)
            }

            $scope.addConversations = function () {

                //comments[current_id].comments.add($scope.add_conversations);
                //alert($scope.add_conversations);
                comments_array = $scope.comments;
                var item_comments = comments_array[current_id-1].comments;
                item_comments.push($scope.add_conversations)
                $(".add-conversations textarea").val("");

            }

        }]);