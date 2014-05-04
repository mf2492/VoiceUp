/**
 * Use this func for any log (unit tests like)
 * usage   log('inside coolFunc',this,arguments);
 * inspired from paul irish
 * link    http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
logger = function (config) {

    var debug = window.debug || false,
        turnedOff = false,
        config = config || {},
        self = this;

    this.history = this.history || [];   // store logs to an array for reference
    this.history.push(arguments);


    this.allowingAll = false;

    this.allowonces = {
        debug     : 0,
        info      : 0,
        warn      : 0,
        error     : 0,
        success   : 0,
        inbound   : 0,
        outbound  : 0,
        service   : 0,
        controller: 0
    }

    /**
     * Run the console.log
     *
     * @param msg
     * @param val
     * @param color
     */
    function print(msg, val, color) {
        if (! window.console || ! debug || turnedOff) return;

        var str = "%c";
        str += (config.showTime) ? new Date().getTime() : '';
        str += ' ' + msg;

        console.log(str, "color:#" + color + ";", val);
    }

    /**
     * Shuts it down completely
     */
    this.turnOff = function () {
        turnedOff = true;
    }

    this.allowAll = function (except) {
        for (var i in self.allowonces) {
            self.allowonces[i] = true;
        }

        // If there are exceptions disallow them
        self.disallow(except);
    }

    this.allow = function (options) {
        if (typeof options == 'string') {
            self.allowonces[options] = true;
            return;
        }

        for (var i in options) {
            var option = options[i];

            self.allowonces[option] = true;
        }
    }

    this.disallowAll = function (except) {
        for (var i in self.allowonces) {
            // skip the excepted once
            if (except && _.indexOf(except, self.allowonces[i]) > 0) continue;

            self.allowonces[i] = false;
        }

        // If there are exceptions allow them
        self.allow(except);
    }

    this.disallow = function (options) {
        if (typeof options == 'string') {
            self.allowonces[options] = false;
            return;
        }

        for (var i in options) {
            var option = options[i];

            self.allowonces[option] = false;
        }
    }

    this.showTime = function () {
        config.showTime = true;
    }

    this.hideTime = function() {
        config.showTime = false;
    }

    /**
     * Inspired from UNIXs chmod command
     *
     * @param config
     */
    this.chMod = function (config) {
        if (typeof config == 'string' && config == 'allowAll') {
            self.allowAll();
            return;
        } else if (! config) {
            self.turnOff();
            return;
        }

        self.allowonces.debug = config.debug || 0;

        self.allowonces.info = config.info || 0;
        self.allowonces.warn = config.warn || 0;
        self.allowonces.error = config.error || 0;
        self.allowonces.success = config.success || 0;

        self.allowonces.inbound = config.inbound || 0;
        self.allowonces.outbound = config.outbound || 0;
        self.allowonces.service = config.service || 0;
        self.allowonces.controller = config.controller || 0;
    }

    /**
     * Registers a new custom method to be called
     *
     * @param customName
     * @param bkgColor
     * @param color
     */
    this.register = function (customName, bkgColor, color) {

        // If the customName was already registered
        // Don't let it overwrite the previous registration
        if (typeof self[customName] != 'undefined') return;

        self[customName] = function (msg, val) {
            if (! self.allowonces[customName]) return;

            msg = msg || 'Custom Debug';
            print(customName + ' | ' + msg + ' ', val, (color || '333') + '; background: #' + (bkgColor || 'bbb') + ';');
        }

        self.allowonces[customName] = true;
    }


    /**
     * The debug method works a little different than the others
     * It doesn't show a msg but only a val.
     * That's b/c most of the time we don't care about the msg but the value.
     *
     * You cans still have a msg but it's on the 2nd position
     *
     * @param val
     */
    this.debug = function (val, msg) {
        if (! self.allowonces.debug && ! self.allowingAll) return;

        msg = (msg != undefined) ? msg + ' ' : 'Debug ';
        print(msg, val, 'fff; background: #F222E4;'); // color: white; background: pink
    }
    this.info = function (msg, val) {
        if (self.allowonces.info && ! self.allowingAll)
            print(msg, val || '', '008DC4'); // blue
    }
    this.warn = function (msg, val) {
        if (self.allowonces.warn && ! self.allowingAll)
            print(msg, val || '', 'E68739'); // orange
    }
    this.error = function (msg, val) {
        if (self.allowonces.error && ! self.allowingAll)
            print(msg, val || '', 'fff; background: #E64239'); // red
    }
    this.success = function (msg, val) {
        if (self.allowonces.success && ! self.allowingAll)
            print(msg, val || '', '009E0B'); // green
    }

    this.inbound = function (url, method, receivedData, headers) {
        if (! self.allowonces.inbound && ! self.allowingAll) return;

        print('>>> ' + method + ' ', url, 'fff; background: #6CE076');

        print('   Data Received:', receivedData, '');
//            if (headers)
//                print('   Headers:', headers, '');
    }

    this.outbound = function (url, method, sentData, headers) {
        if (! self.allowonces.outbound && ! self.allowingAll) return;

        print('<<< ' + method + ' ', url, 'fff; background: #FFB00D');

        if (sentData)
            print('   Data Sent:', sentData || 'Nope!', '');

//            if (headers)
//                print('   Headers:', headers, '');
    }

    this.service = function (serviceConstructor, serviceShortName, bkgColor, fontColor) {

        // Register the service profile to be logged
        serviceShortName = serviceShortName || getServiceName(serviceConstructor);
        this.register(serviceShortName,
            bkgColor || '2BC9AE',
            fontColor || 'fff');

        if (! self.allowonces.service && ! self.allowingAll) return;

        this[serviceShortName]('is running', '');
        //print('Running service ', serviceConstructor, 'fff; background: #2BC9AE');
    }

    /**
     * Returns the service name from the given Object Constructor or String
     * Makes the first letter lower case.
     *
     * @param service
     * @returns {*}
     */
    function getServiceName(service) {
        if (typeof service == 'string') {
            return service;
        } else if (typeof service == 'object') {
            return service.constructor.name;
        }
    }

    this.ctrl = function (controller) {
        if (! self.allowonces.controller && ! self.allowingAll) return;

        print('Running Ctrl ', controller, 'fff; background: #0DCBFF');
    }

};
