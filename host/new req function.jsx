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

b = Result: [{
    "story": "[Story]",
    "contents": "jhgjgj",
    "textRange": {
        "characterOffset": 1,
        "length": 6,
        "contents": "jhgjgj",
        "kerning": "ERROR_VALUE",
        "story": "[Story]",
        "textSelection": "[undefined]",
        "characterAttributes": {
            "textFont": {
                "name": "MyriadHebrew-Regular",
                "family": "Myriad Hebrew",
                "style": "Regular",
                "typename": "TextFont",
                "parent": "[Application]"
            },
            "size": 12,
            "horizontalScale": 100,
            "verticalScale": 100,
            "autoLeading": true,
            "leading": 14.4000005722046,
            "tracking": 0,
            "baselineShift": 0,
            "rotation": 0,
            "kerningMethod": 1,
            "capitalization": 0,
            "baselinePosition": 0,
            "openTypePosition": 0,
            "ligature": true,
            "discretionaryLigature": false,
            "contextualLigature": true,
            "fractions": false,
            "ordinals": false,
            "swash": false,
            "titling": false,
            "connectionForms": true,
            "stylisticAlternates": false,
            "ornaments": false,
            "figureStyle": 0,
            "proportionalMetrics": false,
            "italics": false,
            "baselineDirection": 1,
            "language": "ERROR_VALUE",
            "alternateGlyphs": 0,
            "Tsume": 0,
            "alignment": 2,
            "wariChuEnabled": false,
            "wariChuLines": 2,
            "wariChuLineGap": 0,
            "wariChuScale": 50,
            "wariChuCharactersBeforeBreak": 2,
            "wariChuCharactersAfterBreak": 2,
            "wariChuJustification": 7,
            "tateChuYokoVertical": 0,
            "tateChuYokoHorizontal": 0,
            "akiLeft": -1,
            "akiRight": -1,
            "noBreak": false,
            "fillColor": {
                "cyan": 0,
                "magenta": 0,
                "yellow": 0,
                "black": 100,
                "typename": "CMYKColor"
            },
            "strokeColor": {
                "typename": "NoColor"
            },
            "overprintStroke": false,
            "overprintFill": false,
            "strokeWeight": 1,
            "underline": false,
            "strikeThrough": false,
            "typename": "CharacterAttributes",
            "parent": "[Story]"
        },
        "paragraphAttributes": {
            "justification": 0,
            "firstLineIndent": 0,
            "leftIndent": 0,
            "rightIndent": 0,
            "spaceBefore": 0,
            "spaceAfter": 0,
            "hyphenation": true,
            "minimumHyphenatedWordSize": 6,
            "minimumBeforeHyphen": 2,
            "minimumAfterHyphen": 2,
            "maximumConsecutiveHyphens": 0,
            "hyphenationZone": 36,
            "hyphenateCapitalizedWords": true,
            "hyphenationPreference": 0.5,
            "desiredWordSpacing": 100,
            "maximumWordSpacing": 133.000004291534,
            "minimumWordSpacing": 80.0000011920929,
            "desiredLetterSpacing": 0,
            "maximumLetterSpacing": 0,
            "minimumLetterSpacing": 0,
            "desiredGlyphScaling": 100,
            "maximumGlyphScaling": 100,
            "minimumGlyphScaling": 100,
            "singleWordJustification": 6,
            "autoLeadingAmount": 120.000004768372,
            "leadingType": 0,
            "tabStops": [],
            "romanHanging": false,
            "bunriKinshi": false,
            "burasagariType": 0,
            "kinsokuOrder": 0,
            "kurikaeshiMojiShori": false,
            "kinsoku": "ERROR_VALUE",
            "mojikumi": "ERROR_VALUE",
            "everyLineComposer": false,
            "typename": "ParagraphAttributes",
            "parent": "[Story]"
        },
        "typename": "TextRange",
        "parent": "[Story]",
        "textFont": {
            "name": "MyriadHebrew-Regular",
            "family": "Myriad Hebrew",
            "style": "Regular",
            "typename": "TextFont",
            "parent": "[Application]"
        },
        "size": 12,
        "horizontalScale": 100,
        "verticalScale": 100,
        "autoLeading": true,
        "leading": 14.4000005722046,
        "tracking": 0,
        "baselineShift": 0,
        "rotation": 0,
        "kerningMethod": 1,
        "capitalization": 0,
        "baselinePosition": 0,
        "openTypePosition": 0,
        "ligature": true,
        "discretionaryLigature": false,
        "contextualLigature": true,
        "fractions": false,
        "ordinals": false,
        "swash": false,
        "titling": false,
        "connectionForms": true,
        "stylisticAlternates": false,
        "ornaments": false,
        "figureStyle": 0,
        "proportionalMetrics": false,
        "italics": false,
        "baselineDirection": 1,
        "language": "ERROR_VALUE",
        "alternateGlyphs": 0,
        "Tsume": 0,
        "alignment": 2,
        "wariChuEnabled": false,
        "wariChuLines": 2,
        "wariChuLineGap": 0,
        "wariChuScale": 50,
        "wariChuCharactersBeforeBreak": 2,
        "wariChuCharactersAfterBreak": 2,
        "wariChuJustification": 7,
        "tateChuYokoVertical": 0,
        "tateChuYokoHorizontal": 0,
        "akiLeft": -1,
        "akiRight": -1,
        "noBreak": false,
        "fillColor": {
            "cyan": 0,
            "magenta": 0,
            "yellow": 0,
            "black": 100,
            "typename": "CMYKColor"
        },
        "strokeColor": {
            "typename": "NoColor"
        },
        "overprintStroke": false,
        "overprintFill": false,
        "strokeWeight": 1,
        "underline": false,
        "strikeThrough": false,
        "typename": "TextRange",
        "parent": "[Story]",
        "justification": 0,
        "firstLineIndent": 0,
        "leftIndent": 0,
        "rightIndent": 0,
        "spaceBefore": 0,
        "spaceAfter": 0,
        "hyphenation": true,
        "minimumHyphenatedWordSize": 6,
        "minimumBeforeHyphen": 2,
        "minimumAfterHyphen": 2,
        "maximumConsecutiveHyphens": 0,
        "hyphenationZone": 36,
        "hyphenateCapitalizedWords": true,
        "hyphenationPreference": 0.5,
        "desiredWordSpacing": 100,
        "maximumWordSpacing": 133.000004291534,
        "minimumWordSpacing": 80.0000011920929,
        "desiredLetterSpacing": 0,
        "maximumLetterSpacing": 0,
        "minimumLetterSpacing": 0,
        "desiredGlyphScaling": 100,
        "maximumGlyphScaling": 100,
        "minimumGlyphScaling": 100,
        "singleWordJustification": 6,
        "autoLeadingAmount": 120.000004768372,
        "leadingType": 0,
        "tabStops": [],
        "romanHanging": false,
        "bunriKinshi": false,
        "burasagariType": 0,
        "kinsokuOrder": 0,
        "kurikaeshiMojiShori": false,
        "kinsoku": "ERROR_VALUE",
        "mojikumi": "ERROR_VALUE",
        "everyLineComposer": false,
        "typename": "TextRange",
        "parent": "[Story]"
    },
    "textSelection": "[undefined]",
    "rowCount": 1,
    "columnCount": 1,
    "rowGutter": 0,
    "columnGutter": 0,
    "flowLinksHorizontally": true,
    "spacing": 0,
    "opticalAlignment": false,
    "kind": undefined,
    "contentVariable": null,
    "orientation": 0,
    "textPath": "ERROR_VALUE",
    "anchor": [137.775390625, -371.9794921875],
    "startTValue": "ERROR_VALUE",
    "endTValue": "ERROR_VALUE",
    "previousFrame": "ERROR_VALUE",
    "nextFrame": "ERROR_VALUE",
    "matrix": {
        "mValueA": 1,
        "mValueB": 0,
        "mValueC": 0,
        "mValueD": 1,
        "mValueTX": -7893,
        "mValueTY": 7770,
        "typename": "Matrix"
    },
    "antialias": 2,
    "firstBaseline": "ERROR_VALUE",
    "firstBaselineMin": "ERROR_VALUE",
    "typename": "TextFrame",
    "uRL": "",
    "note": "",
    "layer": {
        "visible": true,
        "locked": false,
        "printable": true,
        "hasSelectedArtwork": true,
        "preview": true,
        "dimPlacedImages": false,
        "color": {
            "red": 78.6926070038911,
            "green": 127.501945525292,
            "blue": 255,
            "typename": "RGBColor"
        },
        "name": "Layer 1",
        "opacity": 100,
        "zOrderPosition": 1,
        "absoluteZOrderPosition": 3,
        "sliced": false,
        "blendingMode": 0,
        "isIsolated": false,
        "artworkKnockout": 2,
        "typename": "Layer",
        "parent": "[Document]"
    },
    "locked": false,
    "hidden": false,
    "selected": true,
    "position": [108.3759765625, -361.935546875],
    "width": 29.3994140625,
    "height": 13.94384765625,
    "geometricBounds": [108.3759765625, -361.935546875, 137.775390625, -375.87939453125],
    "visibleBounds": [108.3759765625, -361.935546875, 137.775390625, -375.87939453125],
    "controlBounds": [96.2431640625, -360.935546875, 138.775390625, -376.87939453125],
    "name": "",
    "blendingMode": 0,
    "opacity": 100,
    "isIsolated": false,
    "artworkKnockout": 0,
    "zOrderPosition": 2,
    "absoluteZOrderPosition": 2,
    "editable": true,
    "sliced": false,
    "top": -361.935546875,
    "left": 108.3759765625,
    "visibilityVariable": null,
    "pixelAligned": false,
    "wrapped": false,
    "wrapOffset": "ERROR_VALUE",
    "wrapInside": "ERROR_VALUE",
    "parent": "[Layer]"
}]





