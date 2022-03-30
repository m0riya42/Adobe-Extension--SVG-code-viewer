var {
    calculateCircularParams
} = require('./svgShape_utils.js')

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
    calcAngleDegrees,
} = require('../utils.jsx');
var { uid } = require('uid');

const EMPTY_SHAPE = 'ShapeSVG';
class ShapeSVG {
    constructor(shapeItem, shapePathPointsInfo) {
        this.id = `"${uid(6)}"`;
        this.style = null;
        this.shapeItem = shapeItem;
        this.shapePathPointsInfo = shapePathPointsInfo;
        this.shapeType = EMPTY_SHAPE;
        this.generateShapeStyle();
    }

    /*************************************************/
    /*                   GET FUNCTIONS               */
    /*************************************************/

    getShapeType = () => this.shapeType;
    getShapeStyle = () => this.style;
    getShapeItem = () => this.shapeItem;


    /*************************************************/
    /*              CALCULATE FUNCTIONS              */
    /*************************************************/

    calculateShapeRotation = (shapePoints, center, radiusY) => {
        const isSameAsRadiusY = (normalPoint) => {
            const d = distance([0, 0], normalPoint);
            return toFixedNumber(d, 2) === radiusY || +d.toFixed() === radiusY || +d.toFixed(1) === radiusY
        }
        const topPoint = [center[0], center[1] - radiusY];
        const {
            isAlign,
            shapeNormallizedPoints,
            rotatedTopPoint
        } = shapePoints.reduce((acc, curr) => {
            const normalPoint = normalCoordinate(curr, center);
            // const normal = normalCoordinate(curr.anchor, minTL);
            acc.shapeNormallizedPoints.push(normalPoint);
            console.log('normal point: ' + normalPoint);

            if (areArraysValuesEqual(topPoint, curr))
                acc.isAlign = true;

            if ((normalPoint[1] > 0) && isSameAsRadiusY(normalPoint)) { //only for Ellipse
                acc.rotatedTopPoint.point = normalPoint;
                // acc.rotatedTopPoint.rotateDeg = (normalPoint[0] > 0) ? (90 - calcAngleDegrees.apply(null, normalPoint)) : (calcAngleDegrees.apply(null, normalPoint) - 90);
                acc.rotatedTopPoint.rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
                console.log((normalPoint[0] > 0), (90 - calcAngleDegrees.apply(null, normalPoint)), (calcAngleDegrees.apply(null, normalPoint) - 90));

            }

            return acc;
        }, {
            isAlign: false,
            shapeNormallizedPoints: [],
            rotatedTopPoint: {
                point: null,
                rotateDeg: null
            }
        });

        //check only for rectangle:
        console.log('is Align: ' + isAlign)
        if (!isAlign && !isDefined(rotatedTopPoint.rotateDeg)) {
            debugger
            console.log('rotateDeg is NOT DEFINED'.error);
            const normalPoint = middleLine(shapeNormallizedPoints[0], shapeNormallizedPoints[1]);
            console.log(normalPoint);
            rotatedTopPoint.rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
            console.log(rotatedTopPoint.rotateDeg);
        }

        // if (!isAlign && !isDefined(rotatedTopPoint.rotateDeg)) {
        // }
        return [isAlign, rotatedTopPoint.rotateDeg];
        //if( (+,+) || (-,+)==> d(point)==rY)


        //After Normliize from center of the Ellipse: We are Searching for Y>0
        //If X>0   (+,+)

        //             /| (+x,+y)
        //            / |
        //      rY   /  | y
        //          /   |
        //  (0,0)  /____|
        //           x
        // 90- calcAngleDegrees()

        //If X<0  (-,+)

        //         |\ (-x, +y)
        //         | \ 
        //      y  |  \rY
        //         |   \
        //         |____\ (0,0)
        //            x

        //calcAngleDegrees)()-90


    }

    /*************************************************/
    /*              GENERATE FUNCTIONS               */
    /*************************************************/

    generateShapeStyle = () => {
        //TODO: use style from Adobe Function
        this.style = `"fill:#88C540; stroke: black;" `
    }

    generatePointsForPols = () => {
        // const anchorsArray = shapeCoordinates.map(el => el.anchor);
        const shapePathPoints = this.shapePathPointsInfo.shapeCoordinates;
        return shapePathPoints.reduce((acc, coord) => {
            // const normal = normalCoordinate(anchor, minTL);
            acc += coord.anchor[0] + ", " + coord.anchor[1] + " ";
            return acc
        }, '');
        // const anchorsArray = shapeCoordinates.map(el => el.anchor);
        // return anchorsArray.reduce((acc, anchor) => {
        //     const normal = normalCoordinate(anchor, minTL);
        //     acc += normal[0] + ", " + normal[1] + " ";
        //     return acc
        // }, '');
    }

    generateShapeRotation = () => {
        // const [isAlign, rotateDeg] = getShapeRotation(shapePathPointsInfo.shapeCoordinates.map(el => normalCoordinate(el.anchor, minTL)), shapeElems.center, ry)

        const shapePoints = this.shapePathPointsInfo.shapeCoordinates.map(coord => coord.anchor);
        const center = this.center, radiusY = this.hRadius;
        //TODO: If rectangle and has no Center or raduisY
        //Rectangle || Ellipse
        // function getShapeRotation(shapePoints, center, radiusY) {
        const isSameAsRadiusY = (normalPoint) => {
            const d = distance([0, 0], normalPoint);
            return toFixedNumber(d, 2) === radiusY || +d.toFixed() === radiusY || +d.toFixed(1) === radiusY
        }
        console.log('center: ' + center, 'radiusY: ' + radiusY)
        const topPoint = [center[0], center[1] - radiusY];
        const {
            isAlign,
            shapeNormallizedPoints,
            rotatedTopPoint
        } = shapePoints.reduce((acc, curr) => {
            const normalPoint = normalCoordinate(curr, center);
            acc.shapeNormallizedPoints.push(normalPoint);
            // console.log('normal point: ' + normalPoint);

            console.log(topPoint, curr)
            if (areArraysValuesEqual(topPoint, curr))
                acc.isAlign = true;

            if ((normalPoint[1] > 0) && isSameAsRadiusY(normalPoint)) { //only for Ellipse
                acc.rotatedTopPoint.point = normalPoint;
                acc.rotatedTopPoint.rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
                // console.log((normalPoint[0] > 0), (90 - calcAngleDegrees.apply(null, normalPoint)), (calcAngleDegrees.apply(null, normalPoint) - 90));
                console.log((normalPoint[0] > 0), (90 - calcAngleDegrees.apply(null, normalPoint)), (calcAngleDegrees.apply(null, normalPoint) - 90));

            }


            // if ((normalPoint[1] > 0) && isSameAsRadiusY(normalPoint)) {
            //     acc.rotatedTopPoint.point = normalPoint;
            //     // acc.rotatedTopPoint.rotateDeg = (normalPoint[0] > 0) ? (90 - calcAngleDegrees.apply(null, normalPoint)) : (calcAngleDegrees.apply(null, normalPoint) - 90);
            //     acc.rotatedTopPoint.rotateDeg = (90 - calcAngleDegrees.apply(null, normalPoint));

            // }

            return acc;
        }, {
            isAlign: false,
            shapeNormallizedPoints: [],
            rotatedTopPoint: {
                point: null,
                rotateDeg: null
            }
        });


        //REctangle?

        if (this.shapeType === "Rectangle") {

            console.log('is Align: ' + isAlign)
            if (!isAlign && !isDefined(rotatedTopPoint.rotateDeg)) {
                debugger
                console.log('rotateDeg is NOT DEFINED'.error);
                const normalPoint = middleLine(shapeNormallizedPoints[0], shapeNormallizedPoints[1]);
                console.log(normalPoint);
                rotatedTopPoint.rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
                console.log(rotatedTopPoint.rotateDeg);
            }
        }



        console.log(isAlign)
        if (isAlign)
            this.rotation = 0;
        else
            this.rotation = rotatedTopPoint.rotateDeg
        // return [isAlign, ];
        //if( (+,+) || (-,+)==> d(point)==rY)


        //After Normliize from center of the Ellipse: We are Searching for Y>0
        //If X>0   (+,+)

        //             /| (+x,+y)
        //            / |
        //      rY   /  | y
        //          /   |
        //  (0,0)  /____|
        //           x
        // 90- calcAngleDegrees()

        //If X<0  (-,+)

        //         |\ (-x, +y)
        //         | \ 
        //      y  |  \rY
        //         |   \
        //         |____\ (0,0)
        //            x

        //calcAngleDegrees)()-90


        // }


    }
    generateCircularShapeParams = () => {
        const [height, width, center] = calculateCircularParams(this.shapePathPointsInfo.shapeCoordinates);
        console.log(height, width, center)
        this.height = height;
        this.width = width;
        this.center = center;
    }

    generateSVG_BaseInfo = () => {
        // if (this.typeOfShape === EMPTY_SHAPE)
        //     return;

        //TODO: CALCULATE WHEN TO USE STYLE AND WHEN CLASS
        return `id=${this.id} style=${this.style}`;


    }



}

module.exports = ShapeSVG;