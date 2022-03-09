/************************/
/*     Adobe Enums      */
/************************/

const StrokeCap = {
    BUTTENDCAP: 1,
    ROUNDENDCAP: 2,
    PROJECTINGENDCAP: 3
}
const StrokeJoin = {
    MITERENDJOIN: 1,
    ROUNDENDJOIN: 2,
    BEVELENDJOIN: 3
}
const PolarityValues = {
    NEGATIVE: -1,
    POSITIVE: 1
}
const BlendModes = {
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
}
const KnockoutState = {
    DISABLED: 0,
    ENABLED: 1,
    INHERITED: 2,
    Unknown: -1
}
const PointType = {
    SMOOTH: 1,
    CORNER: 2,
}
const PathPointSelection = {
    NOSELECTION: 1,
    ANCHORPOINT: 2,
    LEFTDIRECTION: 3,
    RIGHTDIRECTION: 4,
    LEFTRIGHTPOINT: 5
}



/**************************************************/


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

    }

}


[{
    "closed": true,
    "area": 129383.5859375,
    "length": 1442.85711669922,
    "guides": false,
    "filled": true,
    "fillColor": {
        "cyan": 0,
        "magenta": 0,
        "yellow": 0,
        "black": 0,
        "typename": "CMYKColor"
    },
    "fillOverprint": false,
    "stroked": true,
    "strokeColor": {
        "cyan": 0,
        "magenta": 0,
        "yellow": 0,
        "black": 100,
        "typename": "CMYKColor"
    },
    "strokeOverprint": false,
    "strokeWidth": 1,
    "strokeDashes": [],
    "strokeDashOffset": 0,
    "strokeCap": 1,
    "strokeJoin": 1,
    "strokeMiterLimit": 10,
    "clipping": false,
    "evenodd": false,
    "resolution": 800,
    "selectedPathPoints": [{
        "anchor": [463.285714285714, -511.775510204081],
        "leftDirection": [463.285714285714, -511.775510204081],
        "rightDirection": [463.285714285714, -511.775510204081],
        "pointType": 2,
        "selected": 2,
        "typename": "PathPoint",
        "parent": "[PathItem ]"
    }, {
        "anchor": [129.61224489796, -511.775510204081],
        "leftDirection": [129.61224489796, -511.775510204081],
        "rightDirection": [129.61224489796, -511.775510204081],
        "pointType": 2,
        "selected": 2,
        "typename": "PathPoint",
        "parent": "[PathItem ]"
    }, {
        "anchor": [129.61224489796, -124.020408163266],
        "leftDirection": [129.61224489796, -124.020408163266],
        "rightDirection": [129.61224489796, -124.020408163266],
        "pointType": 2,
        "selected": 2,
        "typename": "PathPoint",
        "parent": "[PathItem ]"
    }, {
        "anchor": [463.285714285714, -124.020408163266],
        "leftDirection": [463.285714285714, -124.020408163266],
        "rightDirection": [463.285714285714, -124.020408163266],
        "pointType": 2,
        "selected": 2,
        "typename": "PathPoint",
        "parent": "[PathItem ]"
    }],
    "polarity": 1,
    "typename": "PathItem",
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
        "absoluteZOrderPosition": 2,
        "sliced": false,
        "blendingMode": 0,
        "isIsolated": false,
        "artworkKnockout": 2,
        "typename": "Layer",
        "parent": "[Document Untitled-1]"
    },
    "locked": false,
    "hidden": false,
    "selected": true,
    "position": [129.61224489796, -124.020408163266],
    "width": 333.673469387754,
    "height": 387.755102040815,
    "geometricBounds": [129.61224489796, -124.020408163266, 463.285714285714, -511.775510204081],
    "visibleBounds": [129.11224489796, -123.520408163266, 463.785714285714, -512.275510204081],
    "controlBounds": [129.11224489796, -123.520408163266, 463.785714285714, -512.275510204081],
    "name": "",
    "blendingMode": 0,
    "opacity": 100,
    "isIsolated": false,
    "artworkKnockout": 0,
    "zOrderPosition": 1,
    "absoluteZOrderPosition": 1,
    "editable": true,
    "sliced": false,
    "top": -123.520408163266,
    "left": 129.11224489796
}],