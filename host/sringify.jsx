// #include "./saveTextToFile.jsx"


(function() {
    "use strict";


    /***************************************/
    /*          PolyFills                  */
    /***************************************/

    // Polyfills for Array methods to make iterating over and working with data much easier

    /*
    Array.prototype.forEach = function(callback) {
        for (var i = 0; i < this.length; i++) callback(this[i], i, this);
    };
    Array.prototype.includes = function(item) {
        for (var i = 0; i < this.length; i++)
            if (this[i] == item) return true;
        return false;
    };
    Array.prototype.filter = function(callback) {
        var filtered = [];
        for (var i = 0; i < this.length; i++)
            if (callback(this[i], i, this)) filtered.push(this[i]);
        return filtered;
    };
    Array.prototype.map = function(callback) {
        var mappedParam = [];
        for (var i = 0; i < this.length; i++)
            mappedParam.push(callback(this[i], i, this));
        return mappedParam;
    };

    */
    // This polyfill will be necessary below.
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        };
    }
    /***************************************/
    /*       Booleans Functions            */
    /***************************************/

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]"
    }

    function isAppParent(obj) {
        return Object.prototype.toString.call(obj) === "[Application Adobe Illustrator]"
    }

    function isObject(obj) {
        return typeof obj === "object"
    }

    function isString(obj) {
        return typeof obj === "string"
    }

    function isFunction(obj) {
        return typeof obj === "function"
    }

    function isDefine(obj) {
        return obj !== null || obj !== undefined;
    }

    function isAdobeObject(obj) {
        return obj.toString()[0] === "["
    }

    function isKeysNumbers(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] !== 'number')
                return false;
        }

        return true;
    }

    function isParent(key) {
        return key === "parent"
    }


    /**
     * Creates a string from the entire object (and sub objects).
     * @param {Object} obj Object to be printed in the console (keys and values).
     * @return {String} The formatted string of the object.
     */
    function objectToString(obj, subObjTab) {
        var log,
            line = "",
            tab = "    ",
            value;
        if (isArray(obj)) {
            log = "[\r"; // + obj.toString() ; //+ "],";
        } else {
            if (isDefine(obj)) { // added--> to prevent null Error   
                if (isAdobeObject(obj)) { //if special adobe object, for example:  [PathPoint], [Layer Layer 1], [RGBColor], 
                    log = "//" + obj.toString() + "\r {\r";
                } else { //if ENUM,  for example:  PointType.SMOOTH
                    log = obj.toString() + ",\r";
                }

            }
        }
        if (!isDefine(subObjTab)) {
            subObjTab = "";
        }
        try {
            if (isDefine(obj)) { //added

                for (var key in obj) {
                    if (!isParent(key)) {
                        if (isObject(obj[key])) { // added ' && key!=="parent' ----> in order to Prevent Infinite loop

                            //if the object representing an array of values:
                            subObjTab = "    ";
                            line = !isArray(obj) ? tab + key + ": " : tab;
                            if (isArray(obj[key]) && isKeysNumbers(obj[key])) {
                                line = line + "[" + obj[key] + "],\r";
                            } else {
                                line = line + objectToString(obj[key], subObjTab); // Recursion
                                subObjTab = "";
                            }

                            log += line;
                            continue;
                        }

                        if (isString(obj[key])) {
                            line = subObjTab + tab + key + ': "' + obj[key] + '",\r';
                            log += line;
                            continue;
                        }

                        if (isFunction(obj[key])) {
                            value = obj[key].toString(); //.trim();
                            line = subObjTab + tab + key + ': "' + value + '",\r' + subObjTab;
                            log += line;
                            continue;
                        }


                        line = subObjTab + tab + key + ": " + obj[key] + ",\r";
                        log += line;
                    } else {
                        //right now only string, later maybe fix it:
                        line = subObjTab + tab + key + ': "' + obj[key] + '",\r';
                        log += line;

                    }
                }
            }
        } catch (e) {
            $.writeln(e)
        }
        if (isArray(obj)) {
            log += subObjTab + "],\r";
        } else {
            if (isAdobeObject(obj)) {
                log += "},\r";
            }
        }

        return log;
    }


})();
//app.documents[0].exportFile
//selection[0].layer.parent
// var logger = objectToString(ExternalObject),
//   scriptFolderPath = "C:\\Users\\moriy\\AppData\\Roaming\\Adobe\\CEP\\extensions\\SvgCodeViewer\\host";
// //saveToFile(scriptFolderPath, "document.js", logger);
// $.writeln(logger);