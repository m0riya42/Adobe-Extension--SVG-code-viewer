var {
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class PolygonSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem, svgDefs }) {
        super(selectedItem, shapePathPointsInfo, svgDefs);
        this.initPolygon();

        // return this.generateSVG();
    }

    initPolygon = () => {
        this.shapeType = "Polygon";
        this.generateUID();

        this.points = this.generatePointsForPols();
    }

    generateSVG = () => {
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<polygon ${baseInfo} points="${this.points}" />`

    }
}

module.exports = PolygonSVG;