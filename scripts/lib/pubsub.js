'use strict';

function PubSub() {

    var stacks = [];

    /**
     * Pushes the given subscriber(callbacks) to the given stack
     *  to be looped trough and called once the specific event is published
     *
     * @param subscriber
     * @param stack
     */
    this.subscribe = function (subscriber, stack) {
        if (! _.isFunction(subscriber)) {
            throw 'The subscriber should be a function. ' +
                '"' + subscriber + '"' + ' is a ' + (typeof subscriber);
        }

        pushToStack(subscriber, stack);
    };

    var pushToStack = function (subscriber, stack) {
        if (! stackExists(stack)) {
            createStack(stack);
        }

        stacks[stack].push(subscriber);
    }

    var stackExists = function (stack) {
        return stacks[stack] != undefined;
    }

    /**
     * Calls all the subscribers in the given stack
     *
     * @param stack
     * @param $this
     * @param args
     */
    this.publish = function (stack, $this, args) {
        if (! stackExists(stack)) return;

        for (var i in stacks[stack]) {
            stacks[stack][i].apply($this || {}, args || []);
        }
    }

    var createStack = function (stack) {
        stacks[stack] = [];
    }
}

