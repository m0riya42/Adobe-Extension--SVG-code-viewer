var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    isRectangleAlignToPage, degreeToRadians,
    radiansToDegrees
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class TextSVG extends ShapeSVG {
    constructor({ selectedItem, minTL }) {
        super(selectedItem);
        this.initText(minTL);

        // console.log('Text Object\n'.help, this);
        // console.log('Text Shape Item\n'.help, this.shapeItem);
    }

    initText = (minTL) => {
        this.shapeType = "Text";
        this.generateUID();

        const shapeGeometricBounds = this.shapeItem.geometricBounds;
        const ShapeBottomLeft = [shapeGeometricBounds[0], shapeGeometricBounds[1] - shapeGeometricBounds[3]];

        console.log(this.shapeItem.characterAttributes)


        this.bottomLeft = normalCoordinate(ShapeBottomLeft, minTL);
        this.anchor = normalCoordinate(this.shapeItem.anchor, minTL);

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
            mValueD } = this.shapeItem.matrix;
        const isAlign = () => mValueA === 1 && mValueB === 0 && mValueC === 0 && mValueD === 1,
            // getRotationAngle = () => Math.acos(mValueA);
            getRotationAngle = () => toFixedNumber(radiansToDegrees(Math.acos(mValueA)), 2);



        // isRotate = !(isAlign());
        // mValueA: 1,
        // mValueB: 0,
        // mValueC: 0,
        // mValueD: 1,


        this.rotation = isAlign() ? 0 : getRotationAngle();
        console.log(this.rotation)
        //     const shapeCoordinates = this.shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
        //     const [path1, , path3] = shapeCoordinates;
        //     this.center = middleLine(path1, path3);
        //     this.hRadius = 0.5 * this.height;
        //     this.x_transform = toFixedNumber(((this.bottomRight[0]) - this.width) / 2, 2);
        //     this.y_transform = toFixedNumber(((this.bottomRight[1]) - this.height) / 2, 2);
        //     //maybe?
        //     this.isAlign = isRectangleAlignToPage(shapeCoordinates);
        //     console.log('*************************', this.isAlign)
        //     !this.isAlign && this.generateShapeRotation();


    }

    generateSVG = () => {
        const [x] = this.bottomLeft,
            [, y] = this.anchor,
            // const [x, y] = this.topLeft,
            text = this.text,
            // height = this.height,
            // width = this.width,
            rotation = this.rotation;
        // center = this.center,
        // x_transform = this.x_transform,
        // y_transform = this.y_transform;
        console.log(`${this.shapeItem.anchor}`.error)


        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let textValues = "";

        if ((x !== 0) || (y !== 0))
            textValues += `x="${x}" y="${y}"`;

        if ((rotation !== 0) && (rotation % 180 !== 0))
            textValues += ` transform="rotate(${rotation})" `// ${center[0]} ${center[1]}) translate(${x_transform} ${y_transform})"`
        return `<text ${baseInfo} ${textValues}>${text}</text>`

        // return `<rect ${baseInfo} ${textValues}/> `

    }
}

module.exports = TextSVG;




