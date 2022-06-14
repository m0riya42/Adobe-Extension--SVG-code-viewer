var {
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class PolylineSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem, svgDefs }) {
        super(selectedItem, shapePathPointsInfo, svgDefs);
        this.initPolyline();

        // return this.generateSVG();
    }

    initPolyline = () => {
        this.shapeType = "Polyline";
        this.generateUID();

        this.points = this.generatePointsForPols();

    }

    generateSVG = () => {
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<polyline ${baseInfo}points="${this.points}" />`

    }
}

module.exports = PolylineSVG;