
var convert = require('color-convert');



function AdobeColorItemToString(adobeColorItem) {
    /*CMYKColor
    GradientColor
    GrayColor
    LabColor
    NoColor
    PatternColor
    RGBColor
    SpotColor
    */


    // console.log('in Adobe convert', adobeColorItem)
    switch (adobeColorItem.typename) {
        case 'CMYKColor':
            return convertCMYKcolor(adobeColorItem);
        case 'RGBColor':
            return convertRGBcolor(adobeColorItem);
        case 'GradientColor':
            console.log('gradient', adobeColorItem, adobeColorItem.gradient.gradientStops)
            return;
        case 'NoColor':
            return 'none';
        case 'GrayColor':
            console.log('GrayColor', adobeColorItem.gray)
            return convertGrayColor(adobeColorItem);

    }

}


function convertGrayColor(adobeColorItem) {
    //TODO: Learn how to convert it.

    if (adobeColorItem.gray === 0)
        return 'none';
}
function convertCMYKcolor(adobeColorItem) {
    const { cyan: c, magenta: m, yellow: y, black: k } = adobeColorItem;
    // console.log('convert: *******', convert.cmyk.hex(c, m, y, k));
    // return '#' + rgbToHex.apply(null, CMYKtoRGB(adobeColorItem));
    return '#' + convert.cmyk.hex(c, m, y, k);
}


function convertRGBcolor(adobeColorItem) {
    const { red: r, green: g, blue: b } = adobeColorItem;
    return '#' + convert.rgb.hex(r, g, b);
    // return '#' + rgbToHex(r, g, b);
}

function getAdobeStrokeCap(strokeCapNum) {
    switch (strokeCapNum) {
        case 1:
            return 'butt'
        case 2:
            return 'round'
        case 3:
            return 'square'
    }
}

function getAdobeStrokeJoin(strokeJoin) {
    //arcs | bevel |miter | miter-clip | round
    switch (strokeJoin) {
        case 1:
            return 'miter'
        case 2:
            return 'round'
        case 3:
            return 'bevel'
    }
}

module.exports = { AdobeColorItemToString, getAdobeStrokeCap, getAdobeStrokeJoin }

