var {
    isCirclePathPoints,
    isVerticalWrapper,
    areGradientsVertical,
    middleLine,
    areGradientsAlignsToPage,
    isDefined,
    isInfinity,
    normalCoordinate,
    vectorGradient,
    distance,
    areTripleArraysEqual,
    areArraysValuesEqual,
    removeArrayItem,
    toFixedNumber,
    calcAngleDegrees
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
        const [path1, , path3] = this.shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
        this.center = middleLine(path1, path3);
        console.log('rect center: ' + this.center)
        this.hRadius = 0.5 * this.height;
        this.generateShapeRotation();
    }

    generateSVG = () => {
        const [x, y] = this.topLeft,
            height = this.height,
            width = this.width,
            rotation = this.rotation;
        // const geo_center = middleLine(this.topLeft, this.bottomRight),
        const x_transform = toFixedNumber(((this.bottomRight[0]) - width) / 2,2),
            y_transform = toFixedNumber(((this.bottomRight[1]) - height) / 2,2);


        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let rectangleValues = `width="${width}" height="${height}"`

        if ((x !== 0) && (y !== 0))
            rectangleValues += ` x="${x}" y="${y}"`;

        if ((rotation !== 0) && (rotation % 180 !== 0))
            rectangleValues += ` transform="rotate(${rotation} ${this.center[0]} ${this.center[1]}) translate(${x_transform} ${y_transform})"`

        return `<rect ${baseInfo} ${rectangleValues}/> `

    }
}

module.exports = RectangleSVG;