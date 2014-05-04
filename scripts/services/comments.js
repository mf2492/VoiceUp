'use strict'

angular.module('voiceUp').
    factory('comments', ['$cookies',
        function ($cookies) {

            // $log(JSON.parse($cookies.comments))

            var comments = ($cookies.comments) ? JSON.parse($cookies.comments) : [];

            var categories = ['Global', 'Engineering', 'Backend-Engineering'];

            function formatNewComment(text, sentimentObj, color, category) {
                return {
                    text: text,
                    likes: '0',
                    dislikes: '0',
                    timestamp : new Date().getTime() / 1000,
                    comments: [],
                    sentiment: sentimentObj,
                    color: color || '#fff',
                    category: category
                }
            }

            return {

                get: function() {
                    return comments;
                },

                add: function(text, sentimentObj, color, category) {
                    log.info('Comment added', formatNewComment(text, sentimentObj, color));
                    comments.push(formatNewComment(text, sentimentObj, color, category));

                    $cookies.comments = JSON.stringify(comments);
                },

                voteYes: function(commentIndex) {
                    comments[commentIndex].likes++;

                    $cookies.comments = JSON.stringify(comments);
                },

                voteNo: function(commentIndex) {
                    comments[commentIndex].dislikes++;

                    $cookies.comments = JSON.stringify(comments);
                },

                purge: function() {
                    comments = [];
                    $cookies.comments = comments;

                    log.warn('All the comments were deleted!');
                },

                getCategories: function() {
                    return categories;
                }

            }

        }]);