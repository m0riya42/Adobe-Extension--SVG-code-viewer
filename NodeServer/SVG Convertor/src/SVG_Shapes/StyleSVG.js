const { isDefined, toFixedNumber } = require('../utils.jsx');
var {
    AdobeColorItemToString,
    getAdobeStrokeCap,
    getAdobeStrokeJoin
} = require('./svgShape_utils.js')

var { CLASS_ELEMENT } = require('../ENUM');
const { uid } = require('uid');
class StyleSVG {
    constructor(shapeItem, svgDefs) {
        this.shapeItem = shapeItem;
        this.shapeType = shapeItem.typename;
        this.svgDefs = svgDefs;
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
            this.styleObj.font_size = fontSize + "pt";
            this.styleObj.font_family = fontFamily
            letterSpacing !== 0 ? this.styleObj.letter_spacing = `${letterSpacing}em;` : null;
        }
    }

    generateStyle = () => {

        const styleArray = Object.keys(this.styleObj),
            styleText = this.styleToText(styleArray);


        if (styleArray.length < 2)
            return '"' + styleText + '"';

        const classId = this.generateClass(styleText)
        return CLASS_ELEMENT + classId;
        // if (styleArray.length > 2) {
        //TODO: Create Class Id


        // this.svgDefs.style[this.shapeItem.id]?  this.svgDefs.style[this.shapeItem.id].push()


        // return;
        // }

        // return this.styleToText(styleArray);
        // console.log('style numbers', styleArray.length)
        //TODO: if returns values > 2, create Classes



        // let style = '"', styleObj = {};
        // const fillColor = this.fillColor,
        //     stroke = this.stroke;


        // if (isDefined(fillColor)) {

        //     fillColor !== '#000000' ? style += `fill:${fillColor}; ` : null;
        //     fillColor !== '#000000' ? styleObj.fill = fillColor : null;
        // }
        // if (isDefined(stroke) && stroke.strokeColor !== 'none') {
        //     //transparent
        //     const { strokeColor, strokeWidth, strokeDashArray, strokeMiterLimit, strokeCap, strokeJoin } = this.stroke

        //     styleObj.stroke = strokeColor;
        //     style += `stroke: ${strokeColor}; `

        //     strokeWidth !== 1 ? styleObj.stroke_width = strokeWidth : null
        //     strokeWidth !== 1 ? style += `stroke-width: ${strokeWidth}; ` : null

        //     strokeDashArray.length !== 0 ? styleObj.stroke_dasharray = strokeDashArray : null
        //     strokeDashArray.length !== 0 ? style += `stroke-dasharray: ${strokeDashArray}; ` : null

        //     strokeMiterLimit !== 10 ? styleObj.stroke_miterlimit = strokeMiterLimit : null
        //     strokeMiterLimit !== 10 ? style += `stroke-miterlimit: ${strokeMiterLimit}; ` : null

        //     strokeCap !== 'butt' ? styleObj.strok_linecap = strokeCap : null
        //     strokeCap !== 'butt' ? style += `stroke-linecap: ${strokeCap}; ` : null

        //     strokeJoin !== 'miter' ? styleObj.stroke_linejoin = strokeJoin : null
        //     strokeJoin !== 'miter' ? style += `stroke-linejoin: ${strokeJoin}; ` : null
        // }
        // if (this.isText()) {
        //     const { fontSize, fontFamily, letterSpacing } = this.textStyle;

        //     styleObj.font_size = fontSize; styleObj.font_family = fontFamily
        //     style += `font-size: ${fontSize}; font-family: '${fontFamily}'; `

        //     letterSpacing !== 0 ? styleObj.letter_spacing = `${letterSpacing}em;` : null;
        //     letterSpacing !== 0 ? style += `letter-spacing:${letterSpacing}em; ` : null;
        // }



        // const styleArray = Object.keys(styleObj);
        // console.log('style numbers', styleArray.length)

        // let styleTTT = styleArray.reduce((acc, key) => {

        //     acc += `${key.replace('_', '-')}: ${styleObj[key]}; `
        //     return acc
        // }, '')

        // console.log('style', styleTTT)
        // styleArray.forEach(key => console.log(key.replace('_', '-'), styleObj[key]));

        // style += '"';


        // this.styleObj = styleObj;
        // return style

    }


    generateClass = (styleText) => {

        const classId = `st_${uid(4)}`;

        //TODO: Add to SvgDef



        console.log('shapeId: ', this.svgDefs);

        if (isDefined(this.svgDefs.style)) {
            const styleClass = { classId, style: styleText }
            this.svgDefs.style.push(styleClass);
        } else {
            this.svgDefs.style = [styleText];
        }
        // this.svgDefs.style[this.shapeItem.id]?  this.svgDefs.style[this.shapeItem.id].push()

        return classId;


    }

    styleToText = (styleArray) => {
        // const styleArray = Object.keys(this.styleObj);
        // console.log('style numbers', styleArray.length)

        return styleArray.reduce((acc, key) => {

            acc += ` ${key.replace('_', '-')}: ${this.styleObj[key]};`
            return acc
        }, '')

        // console.log('style', styleTTT)
        // styleArray.forEach(key => console.log(key.replace('_', '-'), this.styleObj[key]));

        // style += '"';
    }

}

module.exports = StyleSVG;
