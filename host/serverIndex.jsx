function getEnumNumber(enumPath) {
    var StrokeCap = {
            BUTTENDCAP: 1,
            ROUNDENDCAP: 2,
            PROJECTINGENDCAP: 3
        },
        StrokeJoin = {
            MITERENDJOIN: 1,
            ROUNDENDJOIN: 2,
            BEVELENDJOIN: 3
        },
        PolarityValues = {
            NEGATIVE: -1,
            POSITIVE: 1
        },
        BlendModes = {
            NORMAL: 0,
            MULTIPLY: 1,
            SCREEN: 2,
            OVERLAY: 3,
            SOFTLIGHT: 4,
            HARDLIGHT: 5,
            COLORDODGE: 6,
            COLORBURN: 7,
            DARKEN: 8,
            LIGHTEN: 9,
            DIFFERENCE: 10,
            EXCLUSION: 11,
            HUE: 12,
            SATURATIONBLEND: 13,
            COLORBLEND: 14,
            LUMINOSITY: 15,
        },
        KnockoutState = {
            DISABLED: 0,
            ENABLED: 1,
            INHERITED: 2,
            Unknown: -1
        },
        PointType = {
            SMOOTH: 1,
            CORNER: 2,
        },
        PathPointSelection = {
            NOSELECTION: 1,
            ANCHORPOINT: 2,
            LEFTDIRECTION: 3,
            RIGHTDIRECTION: 4,
            LEFTRIGHTPOINT: 5
        },
        ViewType = {
            TRACINGVIEWVECTORTRACINGRESULT: 0,
            TRACINGVIEWVECTOROUTLINESWITHTRACING: 1,
            TRACINGVIEWVECTOROUTLINES: 2,
            TRACINGVIEWVECTORWITHTRANSPARENTIMAGE: 3,
            TRACINGVIEWIMAGE: 4,
        },
        TracingModeType = {
            TRACINGMODECOLOR: 0,
            TRACINGMODEGRAY: 1,
            TRACINGMODEBLACKANDWHITE: 2

        },
        TracingColorType = {
            TRACINGLIMITEDCOLOR: 0,
            TRACINGFULLCOLOR: 1
        },
        TracingMethodType = {
            TRACINGMETHODABUTTING: 0,
            TRACINGMETHODOVERLAPPING: 1
        };
    var path = enumPath.split('.');
    switch (path[0]) {
        case 'StrokeCap':
            return StrokeCap[path[1]];
        case 'StrokeJoin':
            return StrokeJoin[path[1]];

        case 'PolarityValues':
            return PolarityValues[path[1]];

        case 'BlendModes':
            return BlendModes[path[1]];

        case 'KnockoutState':
            return KnockoutState[path[1]];
        case 'PointType':
            return PointType[path[1]];

        case 'PathPointSelection':
            return PathPointSelection[path[1]];

        case 'ViewType':
            return ViewType[path[1]];
        case 'TracingModeType':
            return TracingModeType[path[1]];
        case 'TracingColorType':
            return TracingColorType[path[1]];
        case 'TracingMethodType':
            return TracingMethodType[path[1]];

    }

}

var NO_SELECTION = "NO_SELECTION";

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
    return obj !== null && obj !== undefined;
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
function objectToString(obj) {
    var log, value;

    if (isArray(obj)) {
        log = "[";
    } else {
        if (isDefine(obj)) { // added--> to prevent null Error   
            if (!isAdobeObject(obj)) { //if ENUM,  for example:  PointType.SMOOTH
                log = getEnumNumber(obj.toString()) + ",";
            } else {
                log = "{";
            }
        }
    }

    try {
        if (isDefine(obj)) { //added

            for (var key in obj) {
                if (!isParent(key)) {
                    try {
                        if (isObject(obj[key]) && isDefine(obj[key])) { // added ' && key!=="parent' ----> in order to Prevent Infinite loop

                            //if the object representing an array of values:
                            line = !isArray(obj) ? '"' + key + '"' + ": " : "";
                            if (isArray(obj[key]) && isKeysNumbers(obj[key])) {
                                line = line + "[" + obj[key] + "],";
                            } else {
                                // if (isDefine(obj[key])) {
                                line = line + objectToString(obj[key], ""); // Recursion
                                //   subObjTab = "";
                                // }
                            }

                            log += line;
                            continue;
                        }

                        if (isString(obj[key])) {
                            line = '"' + key + '"' + ': "' + obj[key] + '",';
                            log += line;
                            continue;
                        }

                        if (isFunction(obj[key])) {
                            value = obj[key].toString(); //.trim();
                            line = '"' + key + '"' + ': "' + value + '",';
                            log += line;
                            continue;
                        }


                        if (obj[key] !== undefined)
                            line = '"' + key + '"' + ": " + obj[key] + ",";
                        else
                            line = '"' + key + '"' + ": " + null + ",";

                        log += line;

                    } catch (e) {}

                } else {
                    //right now only string, later maybe fix it:
                    line = '"' + key + '"' + ': "' + obj[key] + '",';
                    log += line;

                }
            }
        }
    } catch (e) {
        $.writeln(e)
    }
    if (isArray(obj)) {
        if (log[log.length - 1] === ',') {
            log = log.slice(0, -1)
        }
        log += "],";
    } else {
        if (isAdobeObject(obj)) {
            if (log[log.length - 1] === ',') {
                log = log.slice(0, -1)
            }
            log += "},";
        }
    }

    return log;
}



/**************************************************/
/*               Functions                        */
/**************************************************/
function openDocument() {
    var fileRef = new File("~/Downloads/myFile.jpg");
    var docRef = app.open(fileRef);
    return "done server"
}


function getSelection() {
    try {
        if (selection) {
            var logger = objectToString(selection)
            if (logger[logger.length - 1] === ',') {
                logger = logger.slice(0, -1)
            }
            return logger
        }
        return NO_SELECTION;

    } catch (e) {
        return NO_SELECTION;
    }
}