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
} = require("./utils.jsx");

var LineSVG = require("./SVG_Shapes/LineSVG.js");
var Rectangle = require("./SVG_Shapes/RectangleSVG.js");
var PolylineSVG = require("./SVG_Shapes/PolylineSVG.js");
var PolygonSVG = require("./SVG_Shapes/PolygonSVG.js");
var PathSVG = require("./SVG_Shapes/PathSVG.js");
var EllipseSVG = require("./SVG_Shapes/EllipseSVG.js");
var CircleSVG = require("./SVG_Shapes/CircleSVG.js");
var RectangleSVG = require("./SVG_Shapes/RectangleSVG.js");
var TextSVG = require("./SVG_Shapes/TextSVG.js");
var {
    calculateCircularParams
} = require("./SVG_Shapes/svgShape_utils.js");

var selectionStyle = {};
/*************************************************/
/*               Shape -pecific Function        */
/*************************************************/

function getCircularType(shapeCoordinates) {
    const [height, width] = calculateCircularParams(shapeCoordinates);
    return height === width ? "Circle" : "Ellipse";
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
    const normalCoordinateToSVG = (coordinate) =>
        normalCoordinate(coordinate, minTL);

    return pathsPointsArray.reduce(
        (acc, curr) => {
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
            areTripleArraysEqual(anchor, leftDirection, rightDirection) ?
                acc.corners++
                :
                acc.smooths++;
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
                rightDirection,
            });
            // console.log(acc);

            return acc;
        }, {
            corners: 0,
            smooths: 0,
            shapeCoordinates: [],
            documentShapeCoordinates: [],
            totalPoints: 0,
        }
    );
}

function renderOpenedShape({
    isAllCorners,
    selectedItem,
    shapePathPointsInfo,
    style,
    minTL,
    normalCoordinateToSVG,
}) {
    const isLine = (shapePathPointsInfo) => shapePathPointsInfo.corners === 2;

    //maybe normal the coordinates before sending them
    if (isAllCorners) {
        if (isLine(shapePathPointsInfo))
            //Line

            return new LineSVG({
                shapePathPointsInfo,
                selectedItem,
            }).generateSVG();
        // } else { //Polyline

        return new PolylineSVG({
            shapePathPointsInfo,
            selectedItem,
        }).generateSVG();
    } else {
        //Path (one point is a path)

        return new PathSVG({
            shapePathPointsInfo,
            selectedItem,
        }).generateSVG();
    }
}

function handleCircularShape(shapePathPointsInfo, selectedItem) {
    switch (getCircularType(shapePathPointsInfo.shapeCoordinates)) {
        case "Ellipse":
            return new EllipseSVG({
                shapePathPointsInfo,
                selectedItem,
            }).generateSVG();
            break;
        case "Circle":
            return new CircleSVG({
                shapePathPointsInfo,
                selectedItem,
            }).generateSVG();
            break;
    }
}

function renderClosedShape({
    isAllCorners,
    shapePathPointsInfo,
    style,
    selectedItem,
    minTL,
}) {
    const isCircularShape = (shapePathPointsInfo) =>
        shapePathPointsInfo.totalPoints === shapePathPointsInfo.smooths &&
        shapePathPointsInfo.totalPoints === 4 &&
        isCirclePathPoints(shapePathPointsInfo.documentShapeCoordinates);
    // const isRectangle = (shapePathPointsInfo) => shapePathPointsInfo.corners === 4 && isVerticalWrapper(shapePathPointsInfo.documentShapeCoordinates.map(point => point.anchor)) //&& isRectCoordinates(shapePathPointsInfo.anchorPoints); //& check for the angle (for square also check the length of the edges)
    const isRectangle = (shapePathPointsInfo) => {
        console.log(
            isVerticalWrapper(
                shapePathPointsInfo.documentShapeCoordinates.map(
                    (point) => point.anchor
                )
            )
        );
        return (
            shapePathPointsInfo.corners === 4 &&
            isVerticalWrapper(
                shapePathPointsInfo.documentShapeCoordinates.map(
                    (point) => point.anchor
                )
            )
        );
    }; //&& isRectCoordinates(shapePathPointsInfo.anchorPoints); //& check for the angle (for square also check the length of the edges)

    if (isAllCorners) {
        if (isRectangle(shapePathPointsInfo))
            //Rectangle --->and also square
            return new RectangleSVG({
                shapePathPointsInfo,
                selectedItem,
                minTL,
            }).generateSVG();
        //Polygon
        else
            return new PolygonSVG({
                shapePathPointsInfo,
                selectedItem,
            }).generateSVG();
    } else {
        if (isCircularShape(shapePathPointsInfo))
            //Circle || Ellipse
            return handleCircularShape(shapePathPointsInfo, selectedItem);

        return new PathSVG({
            shapePathPointsInfo,
            selectedItem,
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
    const isAllCorners = (pointType) =>
        pointType.totalPoints === pointType.corners && pointType.totalPoints > 1;
    const shapePathPointsInfo = sortShapePathPoints(
        selectedItem.selectedPathPoints,
        minTL
    );
    //{corners, smooths, totalPoints}

    const shapeINFO = {
        isAllCorners: isAllCorners(shapePathPointsInfo),
        shapePathPointsInfo,
        selectedItem,
        minTL,
    };

    if (selectedItem.closed) return renderClosedShape(shapeINFO);
    return renderOpenedShape(shapeINFO);

    //text-- the selected item is [TextFrame ]
}


function getGroupObject(selectedItem, minTL, maxBR) {

    // console.log("page Items:", selectedItem.pageItems);
    if (selectedItem.pageItems.length === 0)
        return '<g></g>';

    let groupItemString = '<g>'
    let groupObjects = selectedItem.pageItems.items.reduceRight((acc, groupObject) => {
        //Assuming it is all PathItem's ( not TextFrame or GroupItems)
        acc += "\n" + getShapeCodeSVG(groupObject, minTL, maxBR);
        return acc;
    }, "");
    groupItemString += groupObjects + '\n</g>'
    return groupItemString;
}


function getTextObject(selectedItem, minTL, maxBR) {
    //if using it- make it higher for more uses
    // const shapePathPointsInfo = sortShapePathPoints(
    //     selectedItem.selectedPathPoints,
    //     minTL
    // );
    return new TextSVG({
        selectedItem,
        minTL,
    }).generateSVG();

    // let x, y, text, style;
    // return `<text   x="${x}" y="${y}" style="${style}">${text}</text>`

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
    let shapeObject;
    debugger;
    switch (selectedItem.typename) {
        case "GroupItem":
            shapeObject = getGroupObject(selectedItem, minTL, maxBR);
            break;
        case "PathItem":
            shapeObject = getShapeObject(selectedItem, minTL, maxBR);
            break;
        case "TextFrame":
            console.log('Text Element');
            shapeObject = getTextObject(selectedItem, minTL, maxBR);
            break;
        case "TextRange": //while writing
            console.log('TextRange');
            break;

    }
    //   const shapeObject = getShapeObject(selectedItem, minTL, maxBR);

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
    // console.log('selection', selection)
    //foreach selected item , returns the minimum TL coordinate and the maximum BR coordinate
    //Y is always minus so apperently it should be the ooposite
    return selection.reduce((acc, selectedItem) => {
        // geometricBounds: [120.637472658743, -126.977149717661, 404.102039587877, -410.441716646794],
        if (!acc.minTL) {
            return {
                minTL: [
                    toFixedNumber(selectedItem.geometricBounds[0], 2),
                    toFixedNumber(selectedItem.geometricBounds[1], 2),
                ],
                maxBR: [
                    toFixedNumber(selectedItem.geometricBounds[2], 2),
                    toFixedNumber(selectedItem.geometricBounds[3], 2),
                ],
            };
        } else {
            acc.minTL[0] = Math.min(
                toFixedNumber(selectedItem.geometricBounds[0], 2),
                acc.minTL[0]
            );
            acc.minTL[1] = Math.max(
                toFixedNumber(selectedItem.geometricBounds[1], 2),
                acc.minTL[1]
            );
            acc.maxBR[0] = Math.max(
                toFixedNumber(selectedItem.geometricBounds[2], 2),
                acc.maxBR[0]
            );
            acc.maxBR[1] = Math.min(
                toFixedNumber(selectedItem.geometricBounds[3], 2),
                acc.maxBR[1]
            );
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

    return [
        toFixedNumber(maxBR[0] - minTL[0], 2),
        toFixedNumber(minTL[1] - maxBR[1], 2),
        minTL,
        maxBR,
    ]; // [width, height, minTL, maxBR]
}

/**
 * Main Function to convert the selection to SVG code
 * @param {Array} selection array of shapes
 * @return {String} returns the SVG converted code.
 */
function convertSelectionToSVG(selection) {
    //}width, height) {
    const [width, height, minTL, maxBR] = getShapeRatio(selection);

    //TODO: Deal with GroupItems

    let insideShapes = selection.reduceRight((acc, PathItem) => {
        //Assuming it is all PathItem's ( not TextFrame or GroupItems)
        acc += "\n" + getShapeCodeSVG(PathItem, minTL, maxBR);
        return acc;
    }, "");

    //TODO: refactor so if there is DEF/ STYLE CLASS/ add to the code

    const generator = "<!-- Generator: IDE for SVG 1.0.0  -->\n"; // +add link to github
    const svg = `${generator}<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewerServer" width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xml:space="preserve" >${insideShapes}\n</svg>`;

    return svg;
}

module.exports = convertSelectionToSVG;

/*function isAdobeItemsObject(objName){
    return objName ==='CompoundPathItems' || objName=== 'GroupItems' || objName=== 'MeshItems' || objName=== 'NonNativeItems' || objName=== 'PageItems' || objName=== 'PathItems' || objName=== 'RasterItems' || objName=== 'SymbolItems' || objName=== 'TextFrameItems' 
   
   }


function getObjectValues(obj){
    if (isAdobeItemsObject(obj.typename)){
        for (var i=0; i<obj.length; i++){
            //print the value
            $.writeln(obj[i]);
            }

        }
    else{
                $.writeln(obj);    
    }
}*/