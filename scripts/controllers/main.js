'use strict';

angular.module('voiceUp')
    .controller('MainCtrl', ['$scope', 'semantria', 'comments',
        function ($scope, semantria, comments) {

            log.ctrl('Main');

            $scope.comments = comments.get();

            $log($scope.comments)
			//comments.purge();

			$scope.voteYes = function() {
				$(this).find('img').show()
				  	.animate({
					    'margin-left': '35%',
					    'height': "60px",
					    'width': '60px'
				  	})
				 .fadeOut();
			}

			$scope.voteNo = function() {
				$('.vote img').eq(1).show()
			  	.animate({
				    'margin-right': '35%',
				    'height': "60px",
				    'width': '60px'
			  	})
			  	.fadeOut();
			}

        }]);
