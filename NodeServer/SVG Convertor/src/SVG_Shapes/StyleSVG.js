const { isDefined, toFixedNumber } = require('../utils.jsx');
var {
    AdobeColorItemToString,
    getAdobeStrokeCap,
    getAdobeStrokeJoin
} = require('./svgShape_utils.js')

var { CLASS_ELEMENT } = require('../ENUM');
const { uid } = require('uid');
const { isEmpty } = require('lodash');
class StyleSVG {
    constructor(shapeItem, saveClassObject) {
        this.shapeItem = shapeItem;
        this.shapeType = shapeItem.typename;
        this.saveClassObject = saveClassObject;
        this.isText = () => this.shapeType === 'TextFrame';
        this.initStyle();
    }



    initStyle = () => {
        if (this.isText()) {
            this.generateText();
        }
        this.generateFill();
        this.generateStoke();
        this.generateStyleObject();

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
        else this.fillColor = 'none' //TODO: Maybe no need, check
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
        console.log('text size is: ', this.shapeItem.textRange.size);
        // console.log('\ntext on RECT Path: ', this.shapeItem);
        const fontSize = toFixedNumber(this.shapeItem.textRange.size, 2),
            fontFamily = this.shapeItem.textRange.textFont.name,
            letterSpacing = this.shapeItem.textRange.tracking / 1000;

        this.textStyle = { fontSize, fontFamily, letterSpacing }
    }



    generateStyleObject = () => {

        this.styleObj = {};
        const fillColor = this.fillColor,
            stroke = this.stroke;


        if (isDefined(fillColor))
            fillColor !== '#000000' ? this.styleObj.fill = fillColor : null;

        if (isDefined(stroke) && stroke.strokeColor !== 'none') {
            const { strokeColor, strokeWidth, strokeDashArray, strokeMiterLimit, strokeCap, strokeJoin } = this.stroke
            this.styleObj.stroke = strokeColor;
            strokeWidth !== 1 ? this.styleObj.stroke_width = strokeWidth : null
            strokeDashArray.length !== 0 ? this.styleObj.stroke_dasharray = strokeDashArray : null
            strokeMiterLimit !== 10 ? this.styleObj.stroke_miterlimit = strokeMiterLimit : null
            strokeCap !== 'butt' ? this.styleObj.stroke_linecap = strokeCap : null
            strokeJoin !== 'miter' ? this.styleObj.stroke_linejoin = strokeJoin : null
        }

        if (this.isText()) {
            const { fontSize, fontFamily, letterSpacing } = this.textStyle;
            this.styleObj.font_size = fontSize + "px";
            this.styleObj.font_family = fontFamily
            letterSpacing !== 0 ? this.styleObj.letter_spacing = `${letterSpacing}em;` : null;
        }
    }

    generateStyle = () => {

        const styleArray = Object.keys(this.styleObj),
            styleText = this.styleToText(styleArray);

        if (styleArray.length <= 2)
            return '"' + styleText + '"';

        const classId = this.generateClass(styleText)
        return CLASS_ELEMENT + classId;

    }


    generateClass = (styleText) => {
        const classId = `st_${uid(4)}`;
        const styleClass = { classId, style: styleText }
        this.saveClassObject(styleClass);
        return classId;
    }

    styleToText = (styleArray) => {
        let textArray = styleArray.reduce((acc, key) => {
            acc += `${key.replace('_', '-')}: ${this.styleObj[key]}; `
            return acc
        }, '')
        return textArray.slice(0, -1)
    }

}

module.exports = StyleSVG;
