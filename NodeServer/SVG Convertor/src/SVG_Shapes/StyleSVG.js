const { isDefined, toFixedNumber } = require('../utils.jsx');
var {
    AdobeColorItemToString,
    getAdobeStrokeCap,
    getAdobeStrokeJoin
} = require('./svgShape_utils.js')


class StyleSVG {
    constructor(shapeItem) {
        this.shapeItem = shapeItem;
        this.shapeType = shapeItem.typename;
        this.isText = () => this.shapeType === 'TextFrame';
        this.initStyle();
    }



    initStyle = () => {
        if (this.isText()) {
            this.generateText();
        }
        this.generateFill();
        this.generateStoke();

    }
    /*************************************************/
    /*                   GET FUNCTIONS               */
    /*************************************************/

    // getShapeType = () => this.shapeType;
    // getShapeItem = () => this.shapeItem;

    /*************************************************/
    /*              GENERATE FUNCTIONS               */
    /*************************************************/
    generateFill = () => {
        if (this.shapeItem.filled || this.isText())
            this.fillColor = AdobeColorItemToString(this.isText() ? this.shapeItem.textRange.fillColor : this.shapeItem.fillColor);
    }

    generateStoke = () => {
        if (this.shapeItem.stroked || this.isText()) {
            this.stroke = {
                strokeDashArray: this.shapeItem.strokeDashes,
                strokeMiterLimit: this.shapeItem.strokeMiterLimit,
                strokeCap: getAdobeStrokeCap(this.shapeItem.strokeCap),
                strokeJoin: getAdobeStrokeJoin(this.shapeItem.strokeJoin),
                strokeColor: AdobeColorItemToString(this.isText() ? this.shapeItem.textRange.strokeColor : this.shapeItem.strokeColor),
                strokeWidth: toFixedNumber(this.isText() ? this.shapeItem.textRange.strokeWeight : this.shapeItem.strokeWidth, 2)
            }
        }
    }

    generateText = () => {
        //TODO: B/U/I
        const fontSize = toFixedNumber(this.shapeItem.textRange.size, 2),
            fontFamily = this.shapeItem.textRange.textFont.name;

        this.textStyle = { fontSize, fontFamily }
    }

    generateStyle = () => {
        //TODO: if returns values > 2, create Classes

        let style = '"'
        const fillColor = this.fillColor,
            stroke = this.stroke;


        if (isDefined(fillColor))
            fillColor !== '#000000' ? style += `fill:${fillColor}; ` : null;
        if (isDefined(stroke) && stroke.strokeColor !== 'none') {
            //transparent
            const { strokeColor, strokeWidth, strokeDashArray, strokeMiterLimit, strokeCap, strokeJoin } = this.stroke
            style += `stroke: ${strokeColor}; `
            strokeWidth !== 1 ? style += `stroke-width: ${strokeWidth}; ` : null
            strokeDashArray.length !== 0 ? style += `stroke-dasharray: ${strokeDashArray}; ` : null
            strokeMiterLimit !== 10 ? style += `stroke-miterlimit:: ${strokeMiterLimit}; ` : null
            strokeCap !== 'butt' ? style += `stroke-linecap: ${strokeCap}; ` : null
            strokeJoin !== 'miter' ? style += `stroke-linejoin: ${strokeJoin}; ` : null
        }
        if (this.isText()) {
            const { fontSize, fontFamily } = this.textStyle;
            style += `font-size: ${fontSize}; font-family: '${fontFamily}'; `
        }

        style += '"';
        return style

    }

}

module.exports = StyleSVG;
