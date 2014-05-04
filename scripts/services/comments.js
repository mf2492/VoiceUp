'use strict'

angular.module('voiceUp').
    factory('comments', ['$cookies',
        function ($cookies) {

            // $log(JSON.parse($cookies.comments))

            var comments = ($cookies.comments) ? JSON.parse($cookies.comments) : [];

            function formatNewComment(text, sentimentObj, color) {
                return {
                    text: text,
                    votes: 0,
                    timestamp : new Date().getTime() / 1000,
                    comments: [],
                    sentiment: sentimentObj,
                    color: color || '#fff'
                }
            }

            return {

                get: function() {
                    return comments;
                },

                add: function(text, sentimentObj, color) {
                    log.info('Comment added', formatNewComment(text, sentimentObj, color));
                    comments.push(formatNewComment(text, sentimentObj, color));

                    $cookies.comments = JSON.stringify(comments);
                },

                purge: function() {
                    comments = [];
                    $cookies.comments = comments;

                    log.warn('All the comments were deleted!');
                }
            }

        }]);