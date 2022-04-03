var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    isRectangleAlignToPage
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class RectangleSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem, minTL }) {
        super(selectedItem, shapePathPointsInfo);
        this.initRectangle(minTL);
    }

    initRectangle = (minTL) => {
        this.shapeType = "Rectangle";

        const [path1, path2, path3] = this.shapePathPointsInfo.shapeCoordinates;
        const ShapeTopLeft = this.shapeItem.geometricBounds.slice(0, 2);
        const ShapeBottomRight = this.shapeItem.geometricBounds.slice(2, 4); //**********/

        this.height = toFixedNumber(distance(path2.anchor, path3.anchor), 2);
        this.width = toFixedNumber(distance(path1.anchor, path2.anchor), 2);
        this.topLeft = normalCoordinate(ShapeTopLeft, minTL);
        this.bottomRight = normalCoordinate(ShapeBottomRight, minTL); //**********/
        this.generateRectRotation();

    }

    generateRectRotation = () => {
        const shapeCoordinates = this.shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
        const [path1, , path3] = shapeCoordinates;
        this.center = middleLine(path1, path3);
        this.hRadius = 0.5 * this.height;
        this.x_transform = toFixedNumber(((this.bottomRight[0]) - this.width) / 2, 2);
        this.y_transform = toFixedNumber(((this.bottomRight[1]) - this.height) / 2, 2);
        //maybe?
        this.isAlign = isRectangleAlignToPage(shapeCoordinates);
        console.log('*************************', this.isAlign)
        !this.isAlign && this.generateShapeRotation();


    }

    generateSVG = () => {
        const [x, y] = this.topLeft,
            height = this.height,
            width = this.width,
            rotation = this.rotation ?? 0,
            center = this.center,
            x_transform = this.x_transform,
            y_transform = this.y_transform;


        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let rectangleValues = `width="${width}" height="${height}"`

        if ((x !== 0) && (y !== 0))
            rectangleValues += ` x="${x}" y="${y}"`;

        if ((rotation !== 0) && (rotation % 180 !== 0))
            rectangleValues += ` transform="rotate(${rotation} ${center[0]} ${center[1]}) translate(${x_transform} ${y_transform})"`

        return `<rect ${baseInfo} ${rectangleValues}/> `

    }
}

module.exports = RectangleSVG;