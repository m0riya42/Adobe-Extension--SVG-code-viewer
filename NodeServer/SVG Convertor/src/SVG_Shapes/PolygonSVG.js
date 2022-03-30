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
class PolygonSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem }) {
        super(selectedItem, shapePathPointsInfo);
        this.initPolygon();
        // return this.generateSVG();
    }

    initPolygon = () => {
        this.shapeType = "Polyline";
        this.points = this.generatePointsForPols();
    }

    generateSVG = () => {
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<polygon ${baseInfo} points="${this.points}" />`

    }
}

module.exports = PolygonSVG;