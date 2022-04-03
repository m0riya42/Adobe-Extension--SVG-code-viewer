
const { distance, middleLine } = require('../utils.jsx')
var convert = require('color-convert');



const calculateCircularParams = (shapePathPoints) => {
    const [path1, path2, path3, path4] = shapePathPoints;
    const width = distance(path1.anchor, path3.anchor),
        height = distance(path2.anchor, path4.anchor),
        center = middleLine(path1.anchor, path3.anchor);

    console.log(height, width, center)

    return [height, width, center]
}


function AdobeColorItemToString(adobeColorItem) {

    switch (adobeColorItem.typename) {
        case 'CMYKColor':
            return convertCMYKcolor(adobeColorItem);
        case 'RGBColor':
            return convertRGBcolor(adobeColorItem);
        case 'GradientColor':
            return;

    }

    // const R= adobeColorItem.red, G=adobeColorItem.green
    // return 
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

module.exports = { calculateCircularParams, AdobeColorItemToString, getAdobeStrokeCap, getAdobeStrokeJoin }

