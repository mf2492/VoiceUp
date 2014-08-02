'use strict';

// CURRENT ITEM ID
var current_id;
var comments_array;


function disabled(id){
    $(".list-block.media-list ul li:nth-last-child("+id+") .like").addClass("disabled");
    $(".list-block.media-list ul li:nth-last-child("+id+") .dislike").addClass("disabled");
}

function send_email(){
    var message = $(".item-input textarea").val();
    if($.trim(message).length == 0){
        alert("Invalid Message");
    }else{
        $.ajax({
          type: "POST",
          url: "https://mandrillapp.com/api/1.0/messages/send.json",
          data: {
            'key': 's9eSYaje1Dv629OGNJgizg',
            'message': {
              'from_email': 'chany2.rpi@gmail.com',
              'to': [
                  {
                    'email': 'gary@voiceaupp.com',
                    'name': 'RECIPIENT NAME (OPTIONAL)',
                    'type': 'to'
                  }
                ],
              'autotext': 'true',
              'subject': 'VoiceUp Message',
              'html': message
            }
          }
         }).done(function(response) {
           console.log(response); // if you're into that sorta thing
         });
    }
}

angular.module('voiceUp')
    .controller('MainCtrl', ['$scope', 'semantria', 'comments', '$stateParams', '$timeout', '$state',
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
                console.log(comments.getCommentByID(id));
                current_id = comments.getCommentByID(id).id;
                //alert(current_id);
            }

            $scope.filterNow = function(category) {
                $timeout(function() {
                    $state.transitionTo('main', {category: category});
                }, 500)
            }

        }]);
