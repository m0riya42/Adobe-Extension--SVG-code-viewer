var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    isRectangleAlignToPage, degreeToRadians,
    radiansToDegrees,
    calcAngleDegrees
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class TextSVG extends ShapeSVG {
    constructor({ selectedItem, minTL }) {
        super(selectedItem);
        this.initText(minTL);

        // console.log('Text Object\n'.help, this);
        console.log('Text Shape Item\n'.help, this.shapeItem);
    }

    initText = (minTL) => {
        this.shapeType = "Text";
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

        this.text = this.shapeItem.textRange.contents;
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

    generateTextContent = () => {
        const textArray = this.text.split('\n'),
            paragraphJust = this.shapeItem.textRange.paragraphAttributes.justification,
            [xLeft] = this.bottomLeft,
            [xRight] = this.bottomRight,
            xCenter = xRight / 2,
            leading = toFixedNumber(this.shapeItem.textRange.leading, 2);
        let x = xLeft;

        // [x] = this.bottomLeft, 

        if (textArray.length === 1)
            return this.text;

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

    generateSVG = () => {
        const [x] = this.bottomLeft,
            [, y] = this.anchor,
            text = this.generateTextContent(),
            // const [x, y] = this.topLeft,

            // height = this.height,
            // width = this.width,
            rotation = this.rotation,
            x_transform = this.x_transform,
            y_transform = this.y_transform,
            center = this.center;
        console.log(`${this.shapeItem.anchor}`.error)

        // var textArray = this.text.split('\n');
        // console.log(textArray.length > 1);

        console.log('trasforms:', x_transform, y_transform)
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let textValues = "";

        // console.log('center:', this.center)
        if ((x !== 0) || (y !== 0))
            textValues += `x="${x}" y="${y}"`;
        // if ((x !== 0) || (y !== 0))
        //     textValues += `x="${x}" y="${y}"`;

        if ((rotation !== 0) && (rotation % 180 !== 0))
            textValues += ` transform="rotate(${rotation} ${center[0]} ${center[1]}) translate(${x_transform} ${y_transform})"`
        return `<text ${baseInfo} ${textValues}>\n${text}</text>`

        // return `<rect ${baseInfo} ${textValues}/> `

    }
}

module.exports = TextSVG;




