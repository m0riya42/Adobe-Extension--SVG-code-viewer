const { isDefined, toFixedNumber } = require('../utils.jsx');
var {
    AdobeColorItemToString,
    getAdobeStrokeCap,
    getAdobeStrokeJoin
} = require('./svgShape_utils.js')

// var {
//     // middleLine,
//     // normalCoordinate,
//     // distance,
//     // toFixedNumber,
//     // calcAngleDegrees,
// } = require('../utils.jsx');
// var { uid } = require('uid');

// const EMPTY_SHAPE = 'ShapeSVG';
class StyleSVG {
    constructor(shapeItem) {
        this.shapeItem = shapeItem;
        this.initStyle();
    }



    initStyle = () => {

        this.generateFill();
        this.generateStoke();
        // this.generateStokeColor();


    }
    /*************************************************/
    /*                   GET FUNCTIONS               */
    /*************************************************/

    // getShapeType = () => this.shapeType;
    // getShapeStyle = () => this.style;
    // getShapeItem = () => this.shapeItem;

    /*************************************************/
    /*              GENERATE FUNCTIONS               */
    /*************************************************/
    generateFill = () => {
        this.fillColor = this.shapeItem.filled ? AdobeColorItemToString(this.shapeItem.fillColor) : null;
    }

    generateStoke = () => {

        if (this.shapeItem.stroked) {

            const strokeColor = AdobeColorItemToString(this.shapeItem.strokeColor),
                strokeWidth = toFixedNumber(this.shapeItem.strokeWidth, 2),
                strokeDashArray = this.shapeItem.strokeDashes,
                strokeMiterLimit = this.shapeItem.strokeMiterLimit,
                strokeCap = getAdobeStrokeCap(this.shapeItem.strokeCap),
                strokeJoin = getAdobeStrokeJoin(this.shapeItem.strokeJoin)
            this.stroke = { strokeColor, strokeWidth, strokeDashArray, strokeMiterLimit, strokeCap, strokeJoin }
        }


    }



    generateStyle = () => {
        //TODO: use style from Adobe Function

        let style = '"'
        const fillColor = this.fillColor,
            stroke = this.stroke;

        //TODO: if returns values > 2, create Classes

        if (isDefined(fillColor))
            style += `fill:${fillColor}; `
        if (isDefined(stroke)) {
            style += `stroke: ${stroke.strokeColor}; `
            stroke.strokeWidth !== 1 ? style += `stroke-width: ${stroke.strokeWidth}; ` : null
            stroke.strokeDashArray !== [] ? style += `stroke-dasharray: ${stroke.strokeDashArray}; ` : null
            stroke.strokeMiterLimit !== 10 ? style += `stroke-miterlimit:: ${stroke.strokeMiterLimit}; ` : null
            stroke.strokeCap !== 'butt' ? style += `stroke-linecap: ${stroke.strokeCap}; ` : null
            stroke.strokeJoin !== 'miter' ? style += `stroke-linejoin: ${stroke.strokeJoin}; ` : null
        }


        style += '"';
        return style
    }





}

module.exports = StyleSVG;