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
        },
        TextAntialias = {
            NONE: 1,
            SHARP: 2,
            CRISP: 3,
            STRONG: 4
        },
        TextOrientation = {
            HORIZONTAL: 0,
            VERTICAL: 1,
        },
        AutoKernType = {
            NOAUTOKERN: 0,
            AUTO: 1,
            OPTICAL: 2,
            METRICSROMANONLY: 3,
        },
        FontCapsOption = {
            NORMALCAPS: 0,
            SMALLCAPS: 1,
            ALLCAPS: 2,
            ALLSMALLCAPS: 3,
        },
        FontBaselineOption = {
            NORMALBASELINE: 0,
            SUPERSCRIPT: 1,
            SUBSCRIPT: 2,
        },
        FontOpenTypePositionOption = {
            OPENTYPEDEFAULT: 0,
            OPENTYPESUPERSCRIPT: 1,
            OPENTYPESUBSCRIPT: 2,
            NUMERATOR: 3,
            DENOMINATOR: 4,
        },
        FigureStyleType = {
            DEFAULTFIGURESTYLE: 0,
            TABULAR: 1,
            PROPORTIONALOLDSTYLE: 2,
            PROPORTIONAL: 3,
            TABULAROLDSTYLE: 4,
        },
        BaselineDirectionType = {
            Standard: 1,
            VerticalRotated: 2,
            TateChuYoko: 3,
        },
        AlternateGlyphsForm = {
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
        StyleRunAlignmentType = {
            bottom: 0,
            icfBottom: 1,
            ROMANBASELINE: 2,
            center: 3,
            icfTop: 4,
            top: 5,
        },
        WariChuJustificationType = {
            Left: 0,
            Right: 1,
            Center: 2,
            WARICHUFULLJUSTIFYLASTLINELEFT: 3,
            WARICHUFULLJUSTIFYLASTLINERIGHT: 4,
            WARICHUFULLJUSTIFYLASTLINECENTER: 5,
            WARICHUFULLJUSTIFY: 6,
            WARICHUAUTOJUSTIFY: 7,
        },
        Justification = {
            LEFT: 0,
            RIGHT: 1,
            CENTER: 2,
            FULLJUSTIFYLASTLINELEFT: 3,
            FULLJUSTIFYLASTLINERIGHT: 4,
            FULLJUSTIFYLASTLINECENTER: 5,
            FULLJUSTIFY: 6
        },
        BurasagariTypeEnum = {
            None: 0,
            Standard: 1,
            Forced: 2,
        },
        KinsokuOrderEnum = {
            PUSHIN: 0,
            PUSHOUTFIRST: 1,
            PUSHOUTONLY: 2,
        },
        AutoLeadingType = {
            BOTTOMTOBOTTOM: 0,
            TOPTOTOP: 1,
        },
        TextType = {
            POINTTEXT: 0,
            AREATEXT: 1,
            PATHTEXT: 2,
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
        case "TextAntialias":
            return TextAntialias[path[1]];
        case "TextOrientation":
            return TextOrientation[path[1]];
        case "AutoKernType":
            return AutoKernType[path[1]];
        case "FontCapsOption":
            return FontCapsOption[path[1]];
        case "FontBaselineOption":
            return FontBaselineOption[path[1]];
        case "FontOpenTypePositionOption":
            return FontOpenTypePositionOption[path[1]];
        case "FigureStyleType":
            return FigureStyleType[path[1]];
        case "BaselineDirectionType":
            return BaselineDirectionType[path[1]];
        case "AlternateGlyphsForm":
            return AlternateGlyphsForm[path[1]];
        case "StyleRunAlignmentType":
            return StyleRunAlignmentType[path[1]];
        case "WariChuJustificationType":
            return WariChuJustificationType[path[1]];
        case "Justification":
            return Justification[path[1]];
        case "BurasagariTypeEnum":
            return BurasagariTypeEnum[path[1]];
        case "KinsokuOrderEnum":
            return KinsokuOrderEnum[path[1]];
        case "AutoLeadingType":
            return AutoLeadingType[path[1]];
        case "TextType":
            return TextType[path[1]];
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
    object.typename == "GroupItem" ? isDefine(object.pageItems) : null;
    //   isDefine(object.pageItems) ? null: null; 

    if (isAdobeEnum(object.typename)) //enums
        return adobeEnumToJsonString(object);

    // var logger;
    // if (isDefine(object.typename))
    //     logger += '//' + object.typename+'\n';
    var logger = '{';

    for (var key in object) {
        // if (key !== "parent") {
        if (key !== "parent" && key !== "story" && key !== "textSelection" && key !== "textRanges") {

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
        return NO_SELECTION;
        // return e;
    }
}