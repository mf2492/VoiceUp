'use strict'

angular.module('voiceUp').
    factory('comments', [
        function () {

            var comments = [
                {
                    text: 'The food is awful',
                    votes: 0,
                    timestamp: 1399169717,
                    comments: [],
                    sentiment: {
                        sentiment_polarity: 'negative',
                        sentiment_score: -.5
                    }
                },
                {
                    text: 'Upper management is incompetent',
                    votes: 23,
                    timestamp: 1399169234,
                    comments: [],
                    sentiment: {
                        sentiment_polarity: 'neutral',
                        sentiment_score: 0
                    }
                },
                {
                    text: 'I love working here',
                    votes: 4,
                    timestamp: 1399169345,
                    comments: [],
                    sentiment: {
                        sentiment_polarity: 'positive',
                        sentiment_score: .78
                    }
                }
            ];

            function formatNewComment(text, sentimentObj) {
                return {
                    text: text,
                    votes: 0,
                    timestamp : new Date().getTime() / 1000,
                    comments: [],
                    sentiment: sentimentObj
                }
            }

            return {

                get: function() {
                    return comments;
                },

                add: function(text, sentimentObj) {
                    log.info('Comment added', formatNewComment(text, sentimentObj));
                    comments.push(formatNewComment(text, sentimentObj));
                }
            }

        }]);