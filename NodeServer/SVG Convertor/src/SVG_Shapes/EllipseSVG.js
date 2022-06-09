var {
    toFixedNumber,
    isEllipseAlignToPage
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class EllipseSVG extends ShapeSVG {
    constructor({ shapePathPointsInfo, selectedItem, svgDefs }) {
        super(selectedItem, shapePathPointsInfo, svgDefs);
        this.initEllipse();

        // return this.generateSVG();
    }

    initEllipse = () => {
        this.shapeType = "Ellipse";
        this.generateUID();

        this.generateCircularShapeParams();
        this.hRadius = toFixedNumber(this.height / 2, 2);
        this.wRadius = toFixedNumber(this.width / 2, 2);
        const shapeCoordinates = this.shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
        this.isAlign = isEllipseAlignToPage(shapeCoordinates);
        console.log('************', this.isAlign)
        !this.isAlign && this.generateShapeRotation();
        // console.log(this.height, this.width)
    }

    generateSVG = () => {
        const cx = this.center[0],
            cy = this.center[1],
            rx = this.wRadius,
            ry = this.hRadius,
            rotation = this.rotation ?? 0;

        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        let ellipseValues = `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`

        // if (!this.isAlign)
        if ((rotation !== 0) && (rotation % 180 !== 0))
            ellipseValues += ` transform="rotate(${rotation} ${cx} ${cy})"`

        return `<ellipse ${baseInfo} ${ellipseValues}/> `

    }
}

module.exports = EllipseSVG;