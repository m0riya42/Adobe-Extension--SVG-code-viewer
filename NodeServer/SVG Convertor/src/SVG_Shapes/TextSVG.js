var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    isRectangleAlignToPage, degreeToRadians,
    radiansToDegrees,
    calcAngleDegrees,
    sortShapePathPoints,
    isDefined
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
var PathSVG = require("./PathSVG.js");

// var bar = new Bar();
const TEXT_TYPE = ["PointType", "AreaType", "PathType"]
class TextSVG extends ShapeSVG {
    constructor({ selectedItem, minTL, svgDefs }) {
        super(selectedItem, null, svgDefs);
        this.getTextType = () => TEXT_TYPE[this.shapeItem.kind];
        this.initText(minTL);
        // console.log('Text Object\n'.help, this);
        // console.log('Text Shape Item\n'.help, this.shapeItem);
    }


    // switch(this.shapeItem.kind){
    //     case 0:
    //         return "PointType"
    // }


    //PointText- default:
    //AreaText - (text inside a shape)
    //PathText- ()text on path)

    initText = (minTL) => {
        this.shapeType = "Text";
        this.TextType = this.getTextType();
        this.generateUID();


        const shapeGeometricBounds = this.shapeItem.geometricBounds;
        const ShapeBottomLeft = [shapeGeometricBounds[0], shapeGeometricBounds[1] - shapeGeometricBounds[3]];

        console.log(this.shapeItem.position, 'position')
        console.log(normalCoordinate(this.shapeItem.position, minTL), 'position normal')
        // console.log(this.shapeItem.characterAttributes)


        this.bottomLeft = normalCoordinate(ShapeBottomLeft, minTL);
        this.anchor = normalCoordinate(this.shapeItem.anchor, minTL);
        console.log('anchor', this.shapeItem.anchor, this.anchor);


        //maybe for translate?
        const ShapeTopLeft = this.shapeItem.geometricBounds.slice(0, 2);
        const ShapeBottomRight = this.shapeItem.geometricBounds.slice(2, 4); //**********/
        this.bottomRight = normalCoordinate(ShapeBottomRight, minTL);
        this.topLeft = normalCoordinate(ShapeTopLeft, minTL);
        this.center = middleLine(this.topLeft, this.bottomRight);

        console.log('translating: TL, BL', this.topLeft, this.bottomLeft);

        // console.log('***************************')
        // console.log('Text positions:\n')
        // const nor = (x) => normalCoordinate(x, minTL);
        // console.log('anchor', this.shapeItem.anchor, nor(this.shapeItem.anchor))
        // console.log('***************************')


        this.text = this.generateTextContent(minTL);
        // this.text = this.shapeItem.textRange.contents;
        this.generateTextRotation();
    }

    generateTextRotation = () => {

        console.log('MATRIX\N', this.shapeItem.matrix)

        const { mValueA,
            mValueB,
            mValueC,
            mValueD,
            mValueTX,
            mValueTY
        } = this.shapeItem.matrix;
        const isAlign = () => mValueA === 1 && mValueB === 0 && mValueC === 0 && mValueD === 1,
            getRotationAngle = () => toFixedNumber(radiansToDegrees(Math.asin(mValueC)), 2);


        this.rotation = isAlign() ? 0 : getRotationAngle();
        console.log(this.rotation)
        console.log(this.bottomRight, this.topLeft, this.shapeItem.width, this.shapeItem.height)
        //     const shapeCoordinates = this.shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
        //     const [path1, , path3] = shapeCoordinates;
        //     this.center = middleLine(path1, path3);
        //     this.hRadius = 0.5 * this.height;
        this.x_transform = toFixedNumber(((this.bottomRight[0]) - this.shapeItem.width) / 2, 2);
        this.y_transform = toFixedNumber(((this.bottomRight[1]) - this.shapeItem.height) / 2, 2);
        //     //maybe?
        //     this.isAlign = isRectangleAlignToPage(shapeCoordinates);
        //     console.log('*************************', this.isAlign)
        //     !this.isAlign && this.generateShapeRotation();


    }

    generatePointTypeText = () => {
        const text = this.shapeItem.textRange.contents, textArray = text.split('\n'),
            //paragraphJust--> for now not in use
            paragraphJust = this.shapeItem.textRange.paragraphAttributes.justification,
            [xLeft] = this.bottomLeft,
            [xRight] = this.bottomRight,
            xCenter = xRight / 2,
            leading = toFixedNumber(this.shapeItem.textRange.leading, 2);

        let x = xLeft;

        // [x] = this.bottomLeft, 



        if (textArray.length === 1)
            return text;






        //TODO: Get Paragraph Justification
        //Create Spans



        /* Justification: {
            LEFT: 0,
            RIGHT: 1,
            CENTER: 2,*/

        // switch (paragraphJust) {
        //     case 0: //LEFT
        //         x = xLeft;
        //         break;
        //     case 1: //RIGHT
        //         x = xRight;
        //         break;
        //     case 2: //CENTER
        //         x = xCenter;
        //         break;
        // }


        console.log('paragraphJust', paragraphJust)
        let acc = `<tspan x="${x}">${textArray[0]}</tspan>\n`;

        for (let i = 1; i < textArray.length; i++) {
            acc += `<tspan x="${x}" dy="${leading}">${textArray[i]}</tspan>\n`;

        }
        console.log(acc)

        return acc;

    }

    generateAreaTypeText = () => { }

    generatePathTypeText = (minTL) => {

        const selectedItem = this.shapeItem.textPath,
            text = this.shapeItem.textRange.contents;

        const shapePathPointsInfo = sortShapePathPoints(
            selectedItem.selectedPathPoints,
            minTL
        );


        //TODO:Add Path to Defs
        this.textPath = new PathSVG({
            shapePathPointsInfo,
            selectedItem,
        });

        const textPath = this.textPath.generateSVG();
        this.saveDefObject(textPath);

        console.log(this.textPath.generateSVG(), '\n', this.textPath.id);
        return `<textPath href="#${this.textPath.id}">\n${text}\n</textPath>\n`

        /*
lengthAdjust:
Where length adjustment should be applied to the text: 
the space between glyphs, or both the space and the glyphs themselves.
Value type: spacing|spacingAndGlyphs; 
Default value: spacing; Animatable: yes

method:
Which method to render individual glyphs along the path. 
Value type: align|stretch ; 
Default value: align; Animatable: yes

side:
Which side of the path the text should be rendered. 
Value type: left|right ; 
Default value: left; Animatable: yes

spacing:
How space between glyphs should be handled. 
Value type: auto|exact ; 
Default value: exact; Animatable: yes

startOffset:
How far the beginning of the text should be offset from the beginning of the path. 
Value type: <length>|<percentage>|<number> ; 
Default value: 0; Animatable: yes

textLength:
The width of the space into which the text will render. 
Value type: <length>|<percentage>|<number> ; 
Default value: auto; Animatable: yes
*/
    }

    generateTextContent = (minTL) => {
        //check for type
        switch (this.TextType) {
            case "PointType":
                return this.generatePointTypeText();
            case "AreaType":
                return this.generateAreaTypeText();
            case "PathType":
                return this.generatePathTypeText(minTL);
        }
    }

    generateSVG = () => {
        console.log(this.shapeItem.rotationAngle);
        const [x] = this.bottomLeft,
            [, y] = this.anchor,
            text = this.text,
            // text = this.generateTextContent(),
            // const [x, y] = this.topLeft,

            // height = this.height,
            // width = this.width,

            rotation = toFixedNumber(this.shapeItem.rotationAngle, 2),
            x_transform = toFixedNumber(this.shapeItem.tX, 2),
            y_transform = toFixedNumber(this.shapeItem.tY, 2),
            // x_transform = this.x_transform,
            // y_transform = this.y_transform,
            center = this.center;
        console.log(`${this.shapeItem.anchor}`.error)


        console.log('trasforms:', x_transform, y_transform)
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let textValues = "";

        // console.log('center:', this.center)
        if ((x !== 0) || (y !== 0))
            textValues += `x="${x}" y="${y}"`;

        if ((rotation !== 0) && (rotation % 180 !== 0))
            textValues += ` transform="rotate(${rotation} ${center[0]} ${center[1]}) translate(${x_transform} ${y_transform})"`
        return `<text ${baseInfo}${textValues}>\n${text}</text>`


    }
}

module.exports = TextSVG;




