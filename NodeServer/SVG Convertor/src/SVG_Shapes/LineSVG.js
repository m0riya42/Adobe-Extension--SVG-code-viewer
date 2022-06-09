var {
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class LineSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem, svgDefs }) {
        super(selectedItem, shapePathPointsInfo, svgDefs);
        this.initLine(shapePathPointsInfo.shapeCoordinates);

        // return this.generateSVG();
    }

    initLine = (lineCoords) => {
        this.shapeType = "Line";
        this.generateUID();

        const [coord1, coord2] = lineCoords;
        this.coord1 = coord1.anchor;
        this.coord2 = coord2.anchor;

    }

    generateSVG = () => {
        const [x1, y1] = this.coord1;
        const [x2, y2] = this.coord2;

        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<line ${baseInfo} x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`
    }
}

module.exports = LineSVG;