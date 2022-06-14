var {
    areTripleArraysEqual,
} = require('../utils.jsx');

var ShapeSVG = require('./ShapeSVG');
// var bar = new Bar();
class PathSVG extends ShapeSVG {
    constructor({ selectedItem, shapePathPointsInfo, svgDefs }) {
        super(selectedItem, shapePathPointsInfo, svgDefs);
        this.initPath();

        // return this.generateSVG();
    }

    initPath = () => {
        this.shapeType = "Path";
        this.generateUID();

        this.pathLine = this.generatePathLine(this.shapeItem.closed);

    }

    isMirror = ({
        anchor,
        leftDirection,
        rightDirection
    }) => {
        return ((anchor[0] - leftDirection[0] === rightDirection[0] - anchor[0]) && (anchor[1] - leftDirection[1] === rightDirection[1] - anchor[1]));
    }


    generatePathLine = (isClosed) => {
        // const normal = (x) => normalCoordinate(x, minTL);

        const shapeCoordinates = this.shapePathPointsInfo.shapeCoordinates;

        const pointInfo = shapeCoordinates.map((el, index, array) => {
            return {
                isCornerPoint: areTripleArraysEqual.apply(null, Object.values(el)),
                isMirrorPoint: this.isMirror(el),
                anchor: el.anchor,
                leftDirection: el.leftDirection,
                rightDirection: el.rightDirection,
            }
        });


        const M_Function = (anchor) => `M${anchor} `;
        const L_Function = (anchor) => `L${anchor} `;
        const S_Function = (leftDirection, anchor) => `S${leftDirection} ${anchor} `;
        // const s_Function =(dx_leftDirection, dx_anchor)=> 
        const C_Function = (rightDirection, leftDirection, anchor) => `C${rightDirection} ${leftDirection} ${anchor} `;
        // const Q_Function =()=> 
        // const T_Function =()=> 
        const pathLine = pointInfo.reduce((acc, curr, currIndex, array) => {

            if (acc === '') { //Start of function
                acc += M_Function(curr.anchor);
            }

            if (currIndex !== array.length - 1) { //Not the last point

                if (curr.isCornerPoint) {
                    //if curr.right === next.left----> Q curr.right next.anchor 

                    //if Next point is Corner
                    if (array[currIndex + 1].isCornerPoint) { //Corner point to Corner point
                        acc += L_Function(array[currIndex + 1].anchor);
                    } else { //Corner Point to smooth point
                        acc += S_Function(array[currIndex + 1].leftDirection, array[currIndex + 1].anchor);
                    }
                } else { //Smooth point
                    if (curr.isMirrorPoint) {
                        acc += S_Function(array[currIndex + 1].leftDirection, array[currIndex + 1].anchor);
                    } else {
                        acc += C_Function(curr.rightDirection, array[currIndex + 1].leftDirection, array[currIndex + 1].anchor);
                    }
                }
            } else { //the last path point

                if (isClosed) {
                    if (curr.isCornerPoint && array[0].isCornerPoint) {
                        acc += "Z";
                    } else {
                        //for line use Z other use another C or S or Q  or T
                        acc += C_Function(curr.rightDirection, array[0].leftDirection, array[0].anchor) + 'Z';
                    }
                }

            }
            return acc;

        }, '')

        return pathLine;
    }
    generateSVG = () => {
        // TODO: //get Super Return Values;
        const baseInfo = this.generateSVG_BaseInfo();
        return `<path ${baseInfo}d="${this.pathLine}" />`;

    }
}

module.exports = PathSVG;