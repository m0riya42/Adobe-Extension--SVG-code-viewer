var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    isRectangleAlignToPage
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class TextSVG extends ShapeSVG {
    constructor({ selectedItem, minTL }) {
        super(selectedItem);
        this.initText(minTL);

        console.log('Text Object\n'.help, this);
    }

    initText = (minTL) => {
        this.shapeType = "Text";
        // this.id = `"rect_${this.generateUID()}"`;
        this.generateUID();

        // const [path1, path2, path3] = this.shapePathPointsInfo.shapeCoordinates;
        const shapeGeometricBounds = this.shapeItem.geometricBounds;
        const ShapeBottomLeft = [shapeGeometricBounds[0], shapeGeometricBounds[1] - shapeGeometricBounds[3]];

        console.log(this.shapeItem.characterAttributes)


        // const ShapeBottomRight = this.shapeItem.geometricBounds.slice(2, 4); //**********/

        // this.height = toFixedNumber(distance(path2.anchor, path3.anchor), 2);
        // this.width = toFixedNumber(distance(path1.anchor, path2.anchor), 2);
        // this.topLeft = normalCoordinate(ShapeTopLeft, minTL);

        // this.bottomLeft = normalCoordinate(this.shapeItem.anchor, minTL);
        // console.log(`${this.shapeItem.anchor}`.error)

        this.bottomLeft = normalCoordinate(ShapeBottomLeft, minTL);
        // this.bottomRight = normalCoordinate(ShapeBottomRight, minTL); //**********/
        // this.generateRectRotation();

        this.text = this.shapeItem.textRange.contents;
    }

    // generateRectRotation = () => {
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


    // }

    generateSVG = () => {
        const [x, y] = this.bottomLeft,
            // const [x, y] = this.topLeft,
            text = this.text;
        // height = this.height,
        // width = this.width,
        // rotation = this.rotation ?? 0,
        // center = this.center,
        // x_transform = this.x_transform,
        // y_transform = this.y_transform;
        console.log(`${this.shapeItem.anchor}`.error)


        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let textValues = "";// = `width="${width}" height="${height}"`

        if ((x !== 0) && (y !== 0))
            textValues += `x="${x}" y="${y}"`;

        // if ((rotation !== 0) && (rotation % 180 !== 0))
        //     textValues += ` transform="rotate(${rotation} ${center[0]} ${center[1]}) translate(${x_transform} ${y_transform})"`
        return `<text ${baseInfo} ${textValues}>${text}</text>`

        // return `<rect ${baseInfo} ${textValues}/> `

    }
}

module.exports = TextSVG;