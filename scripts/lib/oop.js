/**
 * Classical Inheritance(by class)
 * source: Pro JavaScript Design Patterns by Ross Hermes and Dustin Diaz
 *
 * To be called after the Subclass's constructor and before defining/overriding any methods
 * Also, the subclass constructor needs to do this in its body:
 *  SubClassName.superclass.constructor.call(this, name);
 *
 * @param subClass
 * @param superClass
 */
function extend(subClass, superClass) {
    var ExtendedObject = function () {} // prevents another superclass to be instantiated
    ExtendedObject.prototype = superClass.prototype;
    subClass.prototype = new ExtendedObject();
    subClass.prototype.constructor = subClass;

    // Set the superclass attribute to be used in the subclass constructor
    subClass.superclass = superClass.prototype;

    // Ensure that the constructor is set corectly on the superclass
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}


/**
 * Prototypical Inheritance(by Object)
 * source: Pro JavaScript Design Patterns by Ross Hermes and Dustin Diaz
 *
 * This type of inheritance differs a lot from the classical inheritance in how it's constructed and working,
 *  but in the end the API is almost the same.
 *
 * This type is also more resource efficient and more importantly,
 * It can extend an instance at runtime
 *
 * To be called before defining the method of a subObject
 *
 *
 * @param object
 * @returns {ClonedObject}
 */
function clone(object) {
    var ClonedObject = function() {}
    ClonedObject.prototype = object;

    // Keep a reference of the parent object
    // * Any changes to the parent object affects the real object in any other place
    // * So be VERY CAREFUL when doing any changes
    // ClonedObject.prototype.parent = object; // this ain't gonna work because it will be replaced on and on

    return new ClonedObject;
}


/**
 * Mixin Inheritance
 * source: Pro JavaScript Design Patterns by Ross Hermes and Dustin Diaz
 *
 * This type of inheritance is not that much used, and it should only be used on very general methods like:
 * serialize(),
 *
 * @param receivingClass
 * @param givingClass
 */
function augment(receivingClass, givingClass) {
    if (arguments[2]) { // If there are any methods set, only augment that
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } else { // Otherwise Give all methods
        for (methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) { // Make sure it doesn't override anything
                receivingClass.prototype[methodName] = givingClass.prototype[methodName]
            }
        }
    }

}

/**
 * @Constructor
 *
 * Interface Class
 * source: Pro JavaScript Design Patterns by Ross Hermes and Dustin Diaz
 *
 * Create new interfaces by instantiating this class
 * ex: var myInterface = new Interface('MyInterface', ['method1', 'method2', ...])
 *
 * @param name
 * @param method
 * @constructor
 */
var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error('Interface constructor called with '+arguments.length+' arguments, but expected exactly 2.');
    }

    this.name = name;
    this.methods = [];

    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error('Interface constructor expects method names to be passed in as a string.');
        }
        this.methods.push(methods[i]);
    }
}

/**
 * @StaticMethod
 *
 * Ensure Given object implements the instantiated Interface.
 * source: Pro JavaScript Design Patterns by Ross Hermes and Dustin Diaz
 *
 * ex: Interface.ensureImplements(myObject, myInterface)
 *
 * @param object
 */
Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error('Function Interface.ensureImplements called with '+arguments.length+' arguments, but expected at least 2');
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var intf = arguments[i];
        if (intf.constructor !== Interface) {
            throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');
        }

        for (var j = 0, methodsLen = intf.methods.length; j < methodsLen; j++) {
            var method = intf.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error('Function Interface.ensureImplements: object '
                    + 'does no implement the ' + intf.name
                    + ' interface. Method ' + method + ' was not found.');
            }
        }
    }
}

