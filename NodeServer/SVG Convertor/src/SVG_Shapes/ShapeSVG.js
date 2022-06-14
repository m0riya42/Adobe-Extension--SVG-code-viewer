var {
    AdobeColorItemToString
} = require('./svgShape_utils.js')

var {
    middleLine,
    normalCoordinate,
    distance,
    toFixedNumber,
    calcAngleDegrees,
    isDefined,
    calculateCircularParams,
} = require('../utils.jsx');
var { uid } = require('uid');
const StyleSVG = require('./StyleSVG.js');
const {
    CLASS_ELEMENT,
    EMPTY_SHAPE,
    TYPES
} = require('../ENUM.js');
const { isEmpty } = require('lodash');

class ShapeSVG {
    constructor(shapeItem, shapePathPointsInfo, svgDefs) {
        this.id = null;// `"${uid(6)}"`;
        this.style = null;
        this.class = null;
        this.shapeItem = shapeItem;
        this.shapePathPointsInfo = shapePathPointsInfo;
        this.shapeType = EMPTY_SHAPE;
        this.svgDefs = svgDefs;
        this.generateShapeStyle();
    }

    /*************************************************/
    /*                   GET FUNCTIONS               */
    /*************************************************/

    getShapeType = () => this.shapeType;
    getShapeStyle = () => this.style;
    getShapeItem = () => this.shapeItem;

    getShapeNickType = () => {
        return TYPES[this.shapeType];
    }
    /*************************************************/
    /*              GENERATE FUNCTIONS               */
    /*************************************************/

    generateUID = () => {
        this.id = `${this.getShapeNickType()}_${uid(4)}`;
        // return;
    }
    generateShapeStyle = () => {
        //TODO: add Marker(like arrows)
        this.style = new StyleSVG(this.shapeItem, this.saveClassObject).generateStyle();
        if (this.style.includes(CLASS_ELEMENT)) {
            this.class = `"${this.style.split('#')[1]}"`
            this.style = "" //no nead for style, there will be class
        }
    }

    generatePointsForPols = () => {
        const shapePathPoints = this.shapePathPointsInfo.shapeCoordinates;
        return shapePathPoints.reduce((acc, coord) => {
            acc += coord.anchor[0] + ", " + coord.anchor[1] + " ";
            return acc
        }, '');
    }

    generateShapeRotation = () => {

        const shapePoints = this.shapePathPointsInfo.shapeCoordinates.map(coord => coord.anchor);
        const center = this.center, radiusY = this.hRadius;
        const isSameAsRadiusY = (normalPoint) => {
            const d = distance([0, 0], normalPoint);
            return toFixedNumber(d, 2) === radiusY || +d.toFixed() === radiusY || +d.toFixed(1) === radiusY
        }

        console.log('center: ' + center, 'radiusY: ' + radiusY)
        let {
            shapeNormallizedPoints,
            rotateDeg
        } = shapePoints.reduce((acc, curr) => {
            const normalPoint = normalCoordinate(curr, center);
            acc.shapeNormallizedPoints.push(normalPoint);


            if (this.shapeType == "Ellipse") {
                if ((normalPoint[1] > 0) && isSameAsRadiusY(normalPoint)) {
                    acc.rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
                }
            }

            return acc;
        }, {
            shapeNormallizedPoints: [],
            rotateDeg: null,
        });

        if (this.shapeType === "Rectangle") {
            const normalPoint = middleLine(shapeNormallizedPoints[0], shapeNormallizedPoints[1]);
            rotateDeg = toFixedNumber((90 - calcAngleDegrees.apply(null, normalPoint)), 2);
        }

        this.rotation = rotateDeg


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

    generateCircularShapeParams = () => {
        const [height, width, center] = calculateCircularParams(this.shapePathPointsInfo.shapeCoordinates);
        console.log(height, width, center)
        this.height = height;
        this.width = width;
        this.center = center;
    }

    generateSVG_BaseInfo = () => {

        let retValue = `id="${this.id}" `;
        (!isEmpty(this.style) && this.style.length > 2) ? retValue += `style=${this.style} ` : null;
        !isEmpty(this.class) ? retValue += `class=${this.class} ` : null;
        return retValue

    }


    saveDefObject = (object) => {
        if (isDefined(this.svgDefs.defs)) {
            this.svgDefs.defs.push(object);
        } else {
            this.svgDefs.defs = [object];
        }
    }

    saveClassObject = (object) => {
        if (isDefined(this.svgDefs.style)) {
            this.svgDefs.style.push(object);
        } else {
            this.svgDefs.style = [object];
        }
    }

}

module.exports = ShapeSVG;


