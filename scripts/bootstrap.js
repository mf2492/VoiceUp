window.debug = true;

// Instantiate the logger
var log = new logger({'showTime': true});

// Set the Msg Levels
log.allowAll('service');
//log.disallowAll(['jpState']);
var $log = log.debug;

// Load the Framework7 external library to handle the views
var f7 = new Framework7({
    onBeforePageInit: function (page) {
        // Do something when page just added to DOM
        // console.log(page);
    },
    onPageInit: function (page) {
        // Do something on page init
        // console.log(page);
    },
    onPageAfterAnimation: function (page) {
        // Do something on page before animation start
        // console.log(page);
    },
    onPageBeforeAnimation: function (page) {
        // Do something on page ready(centered)
        // console.log(page);
    }
});

// set params
f7.params.modalTitle = 'voiceUp';

// Add main view
f7.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});


