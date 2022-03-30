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
class PolylineSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem }) {
        super(selectedItem, shapePathPointsInfo);
        this.initPolyline();
        // return this.generateSVG();
    }

    initPolyline = () => {
        this.shapeType = "Polyline";
        this.points = this.generatePointsForPols();

    }

    generateSVG = () => {
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<polyline ${baseInfo} points="${this.points}" />`

    }
}

module.exports = PolylineSVG;