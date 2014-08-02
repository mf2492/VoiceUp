'use strict'

angular.module('voiceUp').
    config(function ($stateProvider, $urlRouterProvider, settings) {

        $urlRouterProvider.otherwise('/verification');
        // $urlRouterProvider.otherwise('/main');

        $stateProvider.
            state('splash', {
                url        : '/splash',
                templateUrl: settings.paths.views + 'splash.html',
                controller : 'SplashCtrl'
            }).
            state('leftBar', {
                templateUrl: settings.paths.views + 'leftBar.html',
                controller : 'LeftBarCtrl'
            }).
            state('main', {
                url        : '/main/:category',
                templateUrl: settings.paths.views + 'main.html',
                controller : 'MainCtrl'
            }).
            state('add', {
                url        : '/add/:category',
                templateUrl: settings.paths.views + 'add.html',
                controller : 'AddCtrl'
            }).
            state('conversations', {
                url        : '/conversations/:id',
                templateUrl: settings.paths.views + 'conversations.html',
                controller : 'ConversationsCtrl'
            }).
            state('verification', {
                url        : '/verification',
                templateUrl: settings.paths.views + 'verification.html',
                controller : 'VerificationCtrl'
            });
    });
