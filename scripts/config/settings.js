'use strict';

angular.module('voiceUp')
    .constant('settings', {
        accessLevels: {
            public: 0,
            user: 1
        },
        api: {
            useProxy: true,
            proxyURL: 'http://127.0.0.1/jackpocket_phonegap/proxy.php'
        },
        paths: {
            root: '',
            styles: 'styles/',
            views: 'scripts/views/',
            scripts: 'scripts/',
            modules: 'scripts/modules/',
            libraries: 'scripts/libraries/',
            directives: 'scripts/directives/',
            filers: 'scripts/filters/',
            services: 'scripts/services/'
        }

    });
