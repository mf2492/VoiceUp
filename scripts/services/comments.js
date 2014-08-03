'use strict'

angular.module('voiceUp').
    factory('comments', ['$cookies',
        function ($cookies) {

            // $log(JSON.parse($cookies.comments))

            var comments = ($cookies.comments) ? JSON.parse($cookies.comments) : [
        // {
        // $$hashKey: "00L",
        // category: "Global",
        // color: "rgba(255,255,255,0.6)",
        // comments: "",
        // dislikes: "0",
        // id: 3,
        // image: "pic6.png",
        // likes: "0",
        // question: "List one suggestion to improve your role, team or organization?",
        // sentiment: "",
        // text: "11111",
        // timestamp: ""}
];


                
                        // for (var i = 0; i < 10; i++){
                        //     comments.push(formatNewComment("text1", "", "", "Global", "pic6.png", "question1"));
                        // }

            var categories = ['Global', 'Financial Services', 'Backend-Engineering', 'Class-Of-2011', 'C++', 'B2B-Sales', 'Graphic-Design'];
            var images = ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png', 'pic5.png', 'pic6.png'];

            function formatNewComment(text, sentimentObj, color, category, imageIndex, question) {
                return {
                    id : comments.length + 1,
                    text: text,
                    likes: '0',
                    dislikes: '0',
                    timestamp : new Date().getTime() / 1000,
                    comments: ["abc", "abc2", "abc3"],
                    sentiment: sentimentObj,
                    color: color || '#fff',
                    image: imageIndex,
                    category: category || 'Global',
                    question: question
                }
            }

            return {

                get: function() {
                    return comments;
                },

                add: function(text, sentimentObj, color, category, image, question) {
                    log.info('Comment added', formatNewComment(text, sentimentObj, color, image, question));
                    comments.push(formatNewComment(text, sentimentObj, color, category, image, question));
                    console.log(comments);
                    $cookies.comments = JSON.stringify(comments);
                },

                voteYes: function(id) {
                    var comment = this.getCommentByID(id);

                    comment .likes++;

                    $cookies.comments = JSON.stringify(comments);

                    log.info('Liked comment:', comment )
                },

                voteNo: function(id) {
                    var comment = this.getCommentByID(id);

                    comment.dislikes++;

                    $cookies.comments = JSON.stringify(comments);

                    log.info('Disliked comment:', comment )
                },

                purge: function() {
                    comments = [];
                    $cookies.comments = comments;

                    log.warn('All the comments were deleted!');
                },

                getCategories: function() {
                    return categories;
                },

                getImages: function() {
                    return images;
                },

                getRandomImageIndex: function() {
                    return Math.floor(Math.random() * images.length);
                },

                getCommentByID: function(id) {
                    var res = false;
                    comments.map(function(comment) {
                        if (comment.id == id) res = comment;
                    });

                    return res;
                }

            }

        }]);