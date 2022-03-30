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
} = require('./utils.jsx');

var LineSVG = require('./SVG_Shapes/LineSVG.js');
var Rectangle = require('./SVG_Shapes/RectangleSVG.js');
var PolylineSVG = require('./SVG_Shapes/PolylineSVG.js');
var PolygonSVG = require('./SVG_Shapes/PolygonSVG.js');
var PathSVG = require('./SVG_Shapes/PathSVG.js');
var EllipseSVG = require('./SVG_Shapes/EllipseSVG.js');
var CircleSVG = require('./SVG_Shapes/CircleSVG.js');
var RectangleSVG = require('./SVG_Shapes/RectangleSVG.js');
var {
    calculateCircularParams
} = require('./SVG_Shapes/svgShape_utils.js')
/*************************************************/
/*               Shape -pecific Function        */
/*************************************************/


function getCircularType(shapeCoordinates) {
    const [height, width] = calculateCircularParams(shapeCoordinates);
    return height === width ? "Circle" : "Ellipse"
}


//Rectangle || Ellipse  ---keep for working on REct Rotation
function getShapeRotation(shapePoints, center, radiusY) {
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
/*              Create Shape Functions           */
/*************************************************/


/**
 * Counting the Shape total points 
 * @param {Array} pathsPointsArray array of shape points
 * @return {object} returns an object which contains the number of the corner points, smooth points, total points and array of the points represented as: {anchor: array, leftDirection: array, rightDirection: array}
 * { corners: int,smooths: int, shapeCoordinates: Array, totalPoints: int }
 */
function sortShapePathPoints(pathsPointsArray, minTL) {

    const normalCoordinateToSVG = (coordinate) => normalCoordinate(coordinate, minTL);

    return pathsPointsArray.reduce((acc, curr) => {
        //Example for Corner
        // anchor: [537, -722],
        // leftDirection: [537, -722],
        // rightDirection: [537, -722],
        const {
            anchor,
            leftDirection,
            rightDirection
        } = curr;


        //Compare arrays
        // curr.anchor === curr.leftDirection && curr.anchor === curr.rightDirection ? acc.corners++ : acc.smooths++;
        // areArraysValuesEqual(anchor, leftDirection) && areArraysValuesEqual(anchor, rightDirection) ? acc.corners++ : acc.smooths++;
        areTripleArraysEqual(anchor, leftDirection, rightDirection) ? acc.corners++ : acc.smooths++;
        acc.totalPoints++;
        // acc.anchorPoints.push(curr.anchor);
        acc.shapeCoordinates.push({
            anchor: normalCoordinateToSVG(anchor),
            leftDirection: normalCoordinateToSVG(leftDirection),
            rightDirection: normalCoordinateToSVG(rightDirection),
        });
        acc.documentShapeCoordinates.push({
            anchor,
            leftDirection,
            rightDirection
        });
        // console.log(acc);

        return acc;
    }, {
        corners: 0,
        smooths: 0,
        shapeCoordinates: [],
        documentShapeCoordinates: [],
        totalPoints: 0
    })
}


function renderOpenedShape({
    isAllCorners,
    selectedItem,
    shapePathPointsInfo,
    style,
    minTL,
    normalCoordinateToSVG
}) {
    const isLine = (shapePathPointsInfo) => shapePathPointsInfo.corners === 2;

    //maybe normal the coordinates before sending them 
    if (isAllCorners) {

        if (isLine(shapePathPointsInfo)) //Line

            return new LineSVG({
                shapePathPointsInfo,
                selectedItem
            }).generateSVG();
        // } else { //Polyline

        return new PolylineSVG({
            shapePathPointsInfo,
            selectedItem
        }).generateSVG();
    } else { //Path (one point is a path)

        return new PathSVG({
            shapePathPointsInfo,
            selectedItem
        }).generateSVG();
    }
}


function handleCircularShape(shapePathPointsInfo, selectedItem) {
    switch (getCircularType(shapePathPointsInfo.shapeCoordinates)) {
        case 'Ellipse':
            return new EllipseSVG({
                shapePathPointsInfo,
                selectedItem
            }).generateSVG();
            break;
        case 'Circle':
            return new CircleSVG({
                shapePathPointsInfo,
                selectedItem
            }).generateSVG();
            break;
    }
}

function renderClosedShape({
    isAllCorners,
    shapePathPointsInfo,
    style,
    selectedItem,
    minTL
}) {
    const isCircularShape = (shapePathPointsInfo) => shapePathPointsInfo.totalPoints === shapePathPointsInfo.smooths && shapePathPointsInfo.totalPoints === 4 && isCirclePathPoints(shapePathPointsInfo.documentShapeCoordinates);
    const isRectangle = (shapePathPointsInfo) => shapePathPointsInfo.corners === 4 && isVerticalWrapper(shapePathPointsInfo.shapeCoordinates.map(point => point.anchor)) //&& isRectCoordinates(shapePathPointsInfo.anchorPoints); //& check for the angle (for square also check the length of the edges)


    if (isAllCorners) {
        if (isRectangle(shapePathPointsInfo)) //Rectangle --->and also square
            return new RectangleSVG({
                shapePathPointsInfo,
                selectedItem,
                minTL
            }).generateSVG();
        else //Polygon
            return new PolygonSVG({
                shapePathPointsInfo,
                selectedItem
            }).generateSVG();


    } else {
        if (isCircularShape(shapePathPointsInfo)) //Circle || Ellipse 
            return handleCircularShape(shapePathPointsInfo, selectedItem);

        return new PathSVG({
            shapePathPointsInfo,
            selectedItem
        }).generateSVG();
    }

}


/**
 * Gets the SVG Code of selected shape
 * @param {object} selectedItem
 * @param {Array} minTL minimum coordinate of the shape
 * @param {Array} maxBR maximum coordinate of the shape
 * @return {object} returns the shape and its arguments {shapeType, shapeArgs}
 */
function getShapeObject(selectedItem, minTL, maxBR) {
    //Corner- used the prepared shapes, Smooth-  draw alone
    // Corner: if anchor, left & right are equals

    //TODO: Maybe move the 'normalCoordinat' function to the sort funciton?
    const isAllCorners = (pointType) => pointType.totalPoints === pointType.corners && pointType.totalPoints > 1;
    const shapePathPointsInfo = sortShapePathPoints(selectedItem.selectedPathPoints, minTL);
    //{corners, smooths, totalPoints}

    const shapeINFO = {
        isAllCorners: isAllCorners(shapePathPointsInfo),
        shapePathPointsInfo,
        selectedItem,
        minTL

    };

    if (selectedItem.closed)
        return renderClosedShape(shapeINFO);
    return renderOpenedShape(shapeINFO);


    //text-- the selected item is [TextFrame ]


}



/**
 * Gets he selectionItem and convert it to code
 * @param {Object} selectedItem array of shapes
 * @param {Array} minTL minimum coordinate of the shape
 * @param {Array} maxBR maximum coordinate of the shape
 * @return {String} returns SVG code of the spesific shape.
 */

function getShapeCodeSVG(selectedItem, minTL, maxBR) {

    //TODO: deal with other object like: TEXT, GROUP

    const shapeObject = getShapeObject(selectedItem, minTL, maxBR);

    //if group or text:
    // group.pathItems[p]
    // group.pageItems[p] //--->show also Path & Group || Compound Paths
    /*


    switch(selectedItem.typename){
        case 'GroupItem':
        break;
        case 'PathItem':
        break;
    }

    */

    return shapeObject;


}

/**
 *  Gets the Max and Min Coordinates of the SVG
 * @param {Array} selection array of shapes
 * @return {Object} returns an object which contains 2 arrays which contains the minimum & the maximum coordinates of the svg code: { minTL: [x,y],  maxBR: [x,y] }
    }
 */
function getShapeCoorinates(selection) {
    //foreach selected item , returns the minimum TL coordinate and the maximum BR coordinate
    //Y is always minus so apperently it should be the ooposite
    return selection.reduce((acc, selectedItem) => {

        // geometricBounds: [120.637472658743, -126.977149717661, 404.102039587877, -410.441716646794],
        if (!acc.minTL) {
            return {
                minTL: [
                    toFixedNumber(selectedItem.geometricBounds[0], 2),
                    toFixedNumber(selectedItem.geometricBounds[1], 2)
                ],
                maxBR: [
                    toFixedNumber(selectedItem.geometricBounds[2], 2),
                    toFixedNumber(selectedItem.geometricBounds[3], 2)
                ]
            }

        } else {
            acc.minTL[0] = Math.min(toFixedNumber(selectedItem.geometricBounds[0], 2), acc.minTL[0]);
            acc.minTL[1] = Math.max(toFixedNumber(selectedItem.geometricBounds[1], 2), acc.minTL[1]);
            acc.maxBR[0] = Math.max(toFixedNumber(selectedItem.geometricBounds[2], 2), acc.maxBR[0]);
            acc.maxBR[1] = Math.min(toFixedNumber(selectedItem.geometricBounds[3], 2), acc.maxBR[1]);
        }

        return acc;
    }, {});
}


/**
 *  Gets Width, Height, Max & Min Coordinates of the SVG
 * @param {Array} selection array of shapes
 * @return {Array} returns an array which contains 4 elements: [width: double , height: double, minTL: array, maxTL: array] 
 */
function getShapeRatio(selection) {
    const {
        minTL,
        maxBR
    } = getShapeCoorinates(selection);

    return [toFixedNumber(maxBR[0] - minTL[0], 2), toFixedNumber(minTL[1] - maxBR[1], 2), minTL, maxBR] // [width, height, minTL, maxBR]
}

/**
 * Main Function to convert the selection to SVG code
 * @param {Array} selection array of shapes
 * @return {String} returns the SVG converted code.
 */
function convertSelectionToSVG(selection) { //}width, height) {
    const [
        width,
        height, minTL, maxBR
    ] = getShapeRatio(selection);

    //TODO: Deal with GroupItems

    let insideShapes = selection.reduceRight((acc, PathItem) => {
        //Assuming it is all PathItem's ( not TextFrame or GroupItems)
        acc += "\n" + getShapeCodeSVG(PathItem, minTL, maxBR);
        return acc
    }, '')

    const generator = "<!-- Generator: IDE for SVG 1.0.0  -->\n"; // +add link to github
    const svg = `${generator}<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewerServer" width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xml:space="preserve" >${insideShapes}\n</svg>`


    return svg
}

module.exports = convertSelectionToSVG;


/*
            // return new Rectangle({shapePathPointsInfo, selectedItem,  });
            //topeLeft position, height , width
            const [path1, path2, path3, path4] = shapePathPointsInfo.shapeCoordinates;
            const ShapeTopLeft = selectedItem.geometricBounds.slice(0, 2);

            let height = distance(path2.anchor, path3.anchor),
                width = distance(path1.anchor, path2.anchor),
                topLeft = normalCoordinate(ShapeTopLeft, minTL),
                [x, y] = topLeft;

            // const [x, y] = topLeft;


            console.log('---------------RECTANGLE---------------------')
            shapePathPointsInfo.shapeCoordinates.map(el => console.log('rec point: ', el.anchor));
            const NORMAL_coord = shapePathPointsInfo.shapeCoordinates.map(el => normalCoordinate(el.anchor, minTL));
            const for_center = shapePathPointsInfo.shapeCoordinates.map(el => el.anchor);
            const center = middleLine(for_center[0], for_center[2]);
            console.log(`the middle of the rectangle:  ${center}`.debug)
            NORMAL_coord.map(el => console.log(normalCoordinate(el, center)));
            console.log('height: ' + height + ' width: ' + width + ' top left: ' + topLeft)
            const newCenter = normalCoordinate(center, minTL);
            console.log('NEW CENTER: ' + newCenter)
            const geo_center = middleLine(normalCoordinate(selectedItem.geometricBounds.slice(0, 2), minTL), normalCoordinate(selectedItem.geometricBounds.slice(2, 4), minTL));
            // console.log('GEO-COUNDS: ' + selectedItem.geometricBounds.slice(0, 2), selectedItem.geometricBounds.slice(2, 4))
            // console.log('MIDDLE GEO-COUNDS: ' + geo_center)

            // const [isAlign, rotateDeg] = getShapeRotation(shapePathPointsInfo.shapeCoordinates.map(el => normalCoordinate(el.anchor, minTL)),height, width, topLeft)

            const [isAlign, rotateDeg] = getShapeRotation(shapePathPointsInfo.shapeCoordinates.map(el => normalCoordinate(el.anchor, minTL)), newCenter, 0.5 * height)

            //x,y of the rectangle (top left placement) if x=0 y=0 not have to add
            //add x,y
            return `<rect x="${x}" y="${y}" width="${toFixedNumber(width, 2)}" height="${toFixedNumber(height, 2)}" style="${style}" transform="rotate(${rotateDeg} ${geo_center[0]} ${geo_center[1]})"  />`

        } */