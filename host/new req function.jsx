/***********************************************************/
/*                     ENUM VALUES                         */
/***********************************************************/
//Requested property is only available for wrapped items.

var ERROR_VALUE = "ERROR_VALUE";

function getEnumNumber(enumPath) {
    var StrokeCap = {
            BUTTENDCAP: 1,
            ROUNDENDCAP: 2,
            PROJECTINGENDCAP: 3,
        },
        StrokeJoin = {
            MITERENDJOIN: 1,
            ROUNDENDJOIN: 2,
            BEVELENDJOIN: 3,
        },
        PolarityValues = {
            NEGATIVE: -1,
            POSITIVE: 1,
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
            Unknown: -1,
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
            LEFTRIGHTPOINT: 5,
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
            TRACINGMODEBLACKANDWHITE: 2,
        },
        TracingColorType = {
            TRACINGLIMITEDCOLOR: 0,
            TRACINGFULLCOLOR: 1,
        },
        TracingMethodType = {
            TRACINGMETHODABUTTING: 0,
            TRACINGMETHODOVERLAPPING: 1,
        };
    var path = enumPath.split(".");
    switch (path[0]) {
        case "StrokeCap":
            return StrokeCap[path[1]];
        case "StrokeJoin":
            return StrokeJoin[path[1]];

        case "PolarityValues":
            return PolarityValues[path[1]];

        case "BlendModes":
            return BlendModes[path[1]];

        case "KnockoutState":
            return KnockoutState[path[1]];
        case "PointType":
            return PointType[path[1]];

        case "PathPointSelection":
            return PathPointSelection[path[1]];

        case "ViewType":
            return ViewType[path[1]];
        case "TracingModeType":
            return TracingModeType[path[1]];
        case "TracingColorType":
            return TracingColorType[path[1]];
        case "TracingMethodType":
            return TracingMethodType[path[1]];
    }
}


/***********************************************************/
/*                     IS FUNCTION                         */
/***********************************************************/

function isDefine(obj) {
    return obj !== null && obj !== undefined;
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function isObject(obj) {
    return typeof obj === "object";
}

function isFunction(obj) {
    return typeof obj === "function";
}

function isString(obj) {
    return typeof obj === "string";
}

function isAdobeEnum(objType) {
    var arrayObj = objType.split('.');
    return arrayObj.length > 1
}

function isAdobeItemsObject(objName) {
    return (
        objName === "CompoundPathItems" ||
        objName === "GroupItems" ||
        objName === "MeshItems" ||
        objName === "NonNativeItems" ||
        objName === "PageItems" ||
        objName === "PathItems" ||
        objName === "PluginItems" ||
        objName === "PlacedItems" ||
        objName === "RasterItems" ||
        objName === "SymbolItems" ||
        objName === "TextFrameItems"
    );
}



/***********************************************************/
/*                   UTILS FUNCTION                        */
/***********************************************************/
function sliceTheComma(string) {
    slicedString = string.slice(0, -1);
    return slicedString;
}


/***********************************************************/
/*                    HANDLE FUNCTION                      */
/***********************************************************/
function arrayToJsonString(object) {

    if (object.length === 0)
        return '[]';
    //log it with []
    var logger = "[";
    //forEach Item in Array logger it
    for (var i = 0; i < object.length; i++) {
        logger += adobeItemToJsonString(object[i]) + ",";
    }
    // logger = logger.slice(0, -1);
    logger = sliceTheComma(logger);
    logger += "]";
    return logger;
}

function adobeItemsObjectToJsonString(object) {
    var logger = '{"length": ' + object.length + ',';

    if (object.length === 0)
        return logger + '"items":[]}';
    //'[]'

    logger += '"items"' + ':' + '[';
    for (var i = 0; i < object.length; i++) {
        logger += objectToJsonString(object[i]) + ',';
    }
    logger = sliceTheComma(logger);
    logger += ']}';
    return logger;
}




function objectToJsonString(object) {

    if (isAdobeEnum(object.typename)) //enums
        return adobeEnumToJsonString(object);

    // var logger;
    // if (isDefine(object.typename))
    //     logger += '//' + object.typename+'\n';
    var logger = '{';

    for (var key in object) {
        if (key !== "parent") {
            try {
                logger += '"' + key + '"' + ':' + adobeItemToJsonString(object[key]) + ',';

            } catch (e) {
                logger += '"' + key + '"' + ':' + adobeItemToJsonString(ERROR_VALUE) + ',';
                //// zOrderPosition, wrapOffset, wrapInside
                // $.writeln("ERROR KEY IS: " + key + ", Error: " + e);
            }
        } else {

            logger += '"' + key + '"' + ':' + adobeItemToJsonString("[" + object[key].typename + "]") + ',';

        }
    }
    logger = sliceTheComma(logger);
    logger += '}';
    return logger;

}

function functionToJsonString(object) {
    return object
}

function adobeEnumToJsonString(object) {
    // $.writeln('******************************')
    // $.writeln(object.toString())
    // $.writeln('******************************')
    return getEnumNumber(object.toString());
}

function adobeItemToJsonString(object) {

    var retVal;
    if (!isDefine(object))
        return null;

    if (isArray(object)) {
        return arrayToJsonString(object);
        // retVal = arrayToJsonString(object);
    } else if (isObject(object)) {
        if (isAdobeItemsObject(object.typename))
            return adobeItemsObjectToJsonString(object);
        return objectToJsonString(object);


    } else if (isFunction(object)) {

        return functionToJsonString(object);

    } else { //Primitives

        if (isString(object)) {
            return '"' + object + '"';
        }
        return object;

    }

}

/*
function b() {
    $.writeln('hello world')
}
var a = [b, {
    c: "moriya",
    d: [1, 2, 3],
    a: 3
}, "moriya"]
// adobeItemToJsonString(a)*/
adobeItemToJsonString(selection)

// function 
