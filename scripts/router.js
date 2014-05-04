'use strict'

angular.module('voiceUp').
    config(function ($stateProvider, $urlRouterProvider, settings) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.
            state('home', {
                url        : '/home',
                templateUrl: settings.paths.views + 'main.html',
                controller : 'MainCtrl'
            }).
            state('add', {
                url        : '/add',
                templateUrl: settings.paths.views + 'add.html',
                controller : 'AddCtrl'
            });
    });
