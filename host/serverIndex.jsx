/***************************************/
/*          PolyFills                  */
/***************************************/

Array.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};

Array.prototype.includes = function(item) {
    for (var i = 0; i < this.length; i++)
        if (this[i] == item) return true;
    return false;
};

/***********************************************************/
/*                     ENUM VALUES                         */
/***********************************************************/
//Requested property is only available for wrapped items.

var ERROR_VALUE = "ERROR_VALUE";


function getEnumNumber(enumPath) {
    var AdobeEnums = {
        StrokeCap: {
            BUTTENDCAP: 1,
            ROUNDENDCAP: 2,
            PROJECTINGENDCAP: 3,
        },
        StrokeJoin: {
            MITERENDJOIN: 1,
            ROUNDENDJOIN: 2,
            BEVELENDJOIN: 3,
        },
        PolarityValues: {
            NEGATIVE: -1,
            POSITIVE: 1,
        },
        BlendModes: {
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
        KnockoutState: {
            DISABLED: 0,
            ENABLED: 1,
            INHERITED: 2,
            Unknown: -1,
        },
        PointType: {
            SMOOTH: 1,
            CORNER: 2,
        },
        PathPointSelection: {
            NOSELECTION: 1,
            ANCHORPOINT: 2,
            LEFTDIRECTION: 3,
            RIGHTDIRECTION: 4,
            LEFTRIGHTPOINT: 5,
        },
        ViewType: {
            TRACINGVIEWVECTORTRACINGRESULT: 0,
            TRACINGVIEWVECTOROUTLINESWITHTRACING: 1,
            TRACINGVIEWVECTOROUTLINES: 2,
            TRACINGVIEWVECTORWITHTRANSPARENTIMAGE: 3,
            TRACINGVIEWIMAGE: 4,
        },
        TracingModeType: {
            TRACINGMODECOLOR: 0,
            TRACINGMODEGRAY: 1,
            TRACINGMODEBLACKANDWHITE: 2,
        },
        TracingColorType: {
            TRACINGLIMITEDCOLOR: 0,
            TRACINGFULLCOLOR: 1,
        },
        TracingMethodType: {
            TRACINGMETHODABUTTING: 0,
            TRACINGMETHODOVERLAPPING: 1,
        },
        TextAntialias: {
            NONE: 1,
            SHARP: 2,
            CRISP: 3,
            STRONG: 4
        },
        TextOrientation: {
            HORIZONTAL: 0,
            VERTICAL: 1,
        },
        AutoKernType: {
            NOAUTOKERN: 0,
            AUTO: 1,
            OPTICAL: 2,
            METRICSROMANONLY: 3,
        },
        FontCapsOption: {
            NORMALCAPS: 0,
            SMALLCAPS: 1,
            ALLCAPS: 2,
            ALLSMALLCAPS: 3,
        },
        FontBaselineOption: {
            NORMALBASELINE: 0,
            SUPERSCRIPT: 1,
            SUBSCRIPT: 2,
        },
        FontOpenTypePositionOption: {
            OPENTYPEDEFAULT: 0,
            OPENTYPESUPERSCRIPT: 1,
            OPENTYPESUBSCRIPT: 2,
            NUMERATOR: 3,
            DENOMINATOR: 4,
        },
        FigureStyleType: {
            DEFAULTFIGURESTYLE: 0,
            TABULAR: 1,
            PROPORTIONALOLDSTYLE: 2,
            PROPORTIONAL: 3,
            TABULAROLDSTYLE: 4,
        },
        BaselineDirectionType: {
            Standard: 1,
            VerticalRotated: 2,
            TateChuYoko: 3,
        },
        AlternateGlyphsForm: {
            DEFAULTFORM: 0,
            TRADITIONAL: 1,
            EXPERT: 2,
            JIS78FORM: 3,
            JIS83FORM: 4,
            HALFWIDTH: 5,
            THIRDWIDTH: 6,
            QUARTERWIDTH: 7,
            FULLWIDTH: 8,
            PROPORTIONALWIDTH: 9,
            JIS90FORM: 10,
            JIS04FORM: 11,
        },
        StyleRunAlignmentType: {
            bottom: 0,
            icfBottom: 1,
            ROMANBASELINE: 2,
            center: 3,
            icfTop: 4,
            top: 5,
        },
        WariChuJustificationType: {
            Left: 0,
            Right: 1,
            Center: 2,
            WARICHUFULLJUSTIFYLASTLINELEFT: 3,
            WARICHUFULLJUSTIFYLASTLINERIGHT: 4,
            WARICHUFULLJUSTIFYLASTLINECENTER: 5,
            WARICHUFULLJUSTIFY: 6,
            WARICHUAUTOJUSTIFY: 7,
        },
        Justification: {
            LEFT: 0,
            RIGHT: 1,
            CENTER: 2,
            FULLJUSTIFYLASTLINELEFT: 3,
            FULLJUSTIFYLASTLINERIGHT: 4,
            FULLJUSTIFYLASTLINECENTER: 5,
            FULLJUSTIFY: 6
        },
        BurasagariTypeEnum: {
            None: 0,
            Standard: 1,
            Forced: 2,
        },
        KinsokuOrderEnum: {
            PUSHIN: 0,
            PUSHOUTFIRST: 1,
            PUSHOUTONLY: 2,
        },
        AutoLeadingType: {
            BOTTOMTOBOTTOM: 0,
            TOPTOTOP: 1,
        },
        TextType: {
            POINTTEXT: 0,
            AREATEXT: 1,
            PATHTEXT: 2,
        },
        GradientType: {
            LINEAR: 1,
            RADIAL: 2,
        },
        GradientsPreservePolicy: {
            AUTOMATICALLYCONVERTGRADIENTS: 4,
            KEEPGRADIENTSEDITABLE: 3,
        },
        LanguageType: {
            ARABIC: 39,
            BENGALIINDIA: 51,
            BOKMALNORWEGIAN: 8,
            BRAZILLIANPORTUGUESE: 11,
            BULGARIAN: 20,
            CANADIANFRENCH: 3,
            CATALAN: 17,
            CHINESE: 29,
            CZECH: 22,
            DANISH: 16,
            DUTCH: 15,
            DUTCH2005REFORM: 43,
            ENGLISH: 0,
            FARSI: 41,
            FINNISH: 1,
            GERMAN2006REFORM: 42,
            GREEK: 25,
            GUJARATI: 53,
            HINDI: 49,
            HUNGARIAN: 28,
            ICELANDIC: 27,
            ITALIAN: 7,
            JAPANESE: 30,
            KANNADA: 57,
            MALAYALAM: 58,
            MARATHI: 50,
            NYNORSKNORWEGIAN: 9,
            OLDGERMAN: 5,
            ORIYA: 54,
            POLISH: 23,
            PUNJABI: 52,
            RUMANIAN: 24,
            RUSSIAN: 18,
            SERBIAN: 21,
            SPANISH: 12,
            STANDARDFRENCH: 2,
            STANDARDGERMAN: 4,
            STANDARDPORTUGUESE: 10,
            SWEDISH: 13,
            SWISSGERMAN: 6,
            SWISSGERMAN2006REFORM: 44,
            TAMIL: 55,
            TELUGU: 56,
            TURKISH: 26,
            UKENGLISH: 14,
            UKRANIAN: 19,

        }

    };

    //E6 Array Destructuring  
    // var [adobeEnum, enumVal] = enumPath.split("."); 
    var path = enumPath.split("."),
        adobeEnum = path[0],
        enumVal = path[1]
    return AdobeEnums[adobeEnum][enumVal];
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
        objName === "TextFrameItems" ||
        objName === "GradientStops"
    );
}

function isText(objName) {

    return objName === 'TextFrame';
}


/***********************************************************/
/*                   UTILS FUNCTION                        */
/***********************************************************/
function sliceTheComma(string) {
    slicedString = string.slice(0, -1);
    return slicedString;
}

function textLineBreakReplace(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '\\n');
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
        logger += mainItemToJsonString(object[i]) + ",";
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

    function isTextKeyOut(key) {
        var textItemExcludeVars = ["story", "textSelection", "textRanges", "characterAttributes", "CharacterStyles", "paragraphStyles"]
        // var textItemExcludeVars = ["story", "textSelection", "textRanges", "characterAttributes", "CharacterStyles", "paragraphAttributes", "paragraphStyles"]
        return textItemExcludeVars.includes(key)
    }

    object.typename == "GroupItem" ? isDefine(object.pageItems) : null;
    object.typename == "CompoundPathItem" ? isDefine(object.pathItems) : null;
    object.typename == "Gradient" ? isDefine(object.gradientStops) : null;
    //   isDefine(object.pageItems) ? null: null; 

    if (isAdobeEnum(object.typename)) //enums
        return adobeEnumToJsonString(object);

    // var logger;
    // if (isDefine(object.typename))
    //     logger += '//' + object.typename+'\n';
    var logger = '{';

    for (var key in object) {
        // if (key !== "parent") {
        if (key !== "parent" && !isTextKeyOut(key)) { // key !== "story" && key !== "textSelection" && key !== "textRanges") {

            try {
                logger += '"' + key + '"' + ':' + mainItemToJsonString(object[key]) + ',';

            } catch (e) {
                logger += '"' + key + '"' + ':' + mainItemToJsonString(ERROR_VALUE) + ',';
                //// zOrderPosition, wrapOffset, wrapInside
                // $.writeln("ERROR KEY IS: " + key + ", Error: " + e);
            }
        } else {

            logger += '"' + key + '"' + ':' + mainItemToJsonString("[" + object[key].typename + "]") + ',';

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


function addAdvanceStrokeOptions(object) {
    try {
        var dup = object.duplicate();
        dup = dup.createOutline();

        //Add Stroke Parameters
        object.strokeDashes = dup.pageItems[0].pathItems[0].strokeDashes;
        object.strokeMiterLimit = dup.pageItems[0].pathItems[0].strokeMiterLimit;
        object.strokeCap = dup.pageItems[0].pathItems[0].strokeCap;
        object.strokeJoin = dup.pageItems[0].pathItems[0].strokeJoin;
        dup.remove();

    } catch (e) {
        $.writeln('Advance Stroke Options in Text Error:\n', e)
    }
}
/******** Main Function ***********/
function mainItemToJsonString(object) {
    // selection[0].pageItems ? null : null;

    var retVal;
    if (!isDefine(object))
        return null;

    if (isArray(object)) {
        return arrayToJsonString(object);
        // retVal = arrayToJsonString(object);
    } else if (isObject(object)) {
        //TODO: Recognize the hidden variables ||==> pageItems , pathItems, placedItems, pluginItems
        //if Text Frame - add stroke options:


        if (isAdobeItemsObject(object.typename))
            return adobeItemsObjectToJsonString(object);

        if (isText(object.typename)) {
            addAdvanceStrokeOptions(object);
        }

        return objectToJsonString(object);


    } else if (isFunction(object)) {

        return functionToJsonString(object);

    } else { //Primitives

        if (isString(object)) {
            return '"' + textLineBreakReplace(object) + '"';
        }
        return object;

    }

}

/**************************************************/
/*              Adobe Functions                   */
/**************************************************/

var NO_SELECTION = "NO_SELECTION";

// function openDocument() {
//     var fileRef = new File("~/Downloads/myFile.jpg");
//     var docRef = app.open(fileRef);
//     return "done server";
// }

function getSelection() {
    try {
        if (selection)
            return mainItemToJsonString(selection)

        // throw NO_SELECTION
        return NO_SELECTION;
    } catch (e) {
        $.writeln(e);
        return NO_SELECTION;
        // return e;
    }
}