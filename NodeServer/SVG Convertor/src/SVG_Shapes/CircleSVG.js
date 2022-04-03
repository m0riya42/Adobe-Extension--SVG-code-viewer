var {
    toFixedNumber,
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');

class CircleSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem }) {
        super(selectedItem, shapePathPointsInfo);
        this.initCircle();
        // return this.generateSVG();
    }

    initCircle = () => {
        this.shapeType = "Circle";
        this.generateCircularShapeParams();
        this.radius = toFixedNumber(this.height / 2, 2);
    }

    generateSVG = () => {
        const cx = this.center[0],
            cy = this.center[1],
            r = this.radius;

        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();

        return `<circle ${baseInfo} cx="${cx}" cy="${cy}" r="${r}"/> `

    }
}

module.exports = CircleSVG;