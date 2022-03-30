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
class EllipseSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem }) {
        super(selectedItem, shapePathPointsInfo);
        this.initEllipse();
        // return this.generateSVG();
    }

    initEllipse = () => {
        this.shapeType = "Ellipse";
        this.generateCircularShapeParams();
        this.hRadius = toFixedNumber(this.height / 2, 2);
        this.wRadius = toFixedNumber(this.width / 2, 2);
        this.generateShapeRotation();
        // console.log(this.height, this.width)
    }

    generateSVG = () => {
        const cx = this.center[0],
            cy = this.center[1],
            rx = this.wRadius,
            ry = this.hRadius,
            rotation = this.rotation;

        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let ellipseValues = `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`

        if (rotation !== 0)
            ellipseValues += ` transform="rotate(${rotation} ${cx} ${cy})"`

        return `<ellipse ${baseInfo} ${ellipseValues}/> `

    }
}

module.exports = EllipseSVG;