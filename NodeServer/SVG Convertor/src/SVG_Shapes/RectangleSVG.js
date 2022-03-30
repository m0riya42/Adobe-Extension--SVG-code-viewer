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
        // return this.generateSVG();
    }

    initRectangle = (minTL) => {
        this.shapeType = "Rectangle";

        const [path1, path2, path3, path4] = this.shapePathPointsInfo.shapeCoordinates;
        const ShapeTopLeft = this.shapeItem.geometricBounds.slice(0, 2);

        this.height = toFixedNumber(distance(path2.anchor, path3.anchor), 2);
        this.width = toFixedNumber(distance(path1.anchor, path2.anchor), 2);
        this.topLeft = normalCoordinate(ShapeTopLeft, minTL);


        // [x, y] = topLeft;

    }

    generateSVG = () => {
        const [x, y] = this.topLeft,
            height = this.height,
            width = this.width;
        //rotation=


        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let rectangleValues = `width="${width}" height="${height}"`

        if ((x !== 0) && (y !== 0))
            rectangleValues += ` x="${x}" y="${y}"`;

        // if (rotation !== 0)
        //     rectangleValues += ` transform="rotate(${rotation} ${geo_center[0]} ${geo_center[1]})"`

        return `<rect ${baseInfo} ${rectangleValues}/> `
        // return `<rect x="${x}" y="${y}" width="${toFixedNumber(width, 2)}" height="${toFixedNumber(height, 2)}"   />`
        // return `<rect x="${x}" y="${y}" width="${toFixedNumber(width, 2)}" height="${toFixedNumber(height, 2)}"   />`

    }
}

module.exports = RectangleSVG;