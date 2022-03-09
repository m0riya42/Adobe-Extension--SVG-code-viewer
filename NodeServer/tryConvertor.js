/******************************************************/
/*                 Assests Functions                  */
/******************************************************/

/**
 * Fix number to specific numbers after the dot
 * @param {Number} num number to be fixed (double or float point)
 * @param {Number} fixNum int number. how many numbers to keep after the dot.
 * @return {Number}  
 */
const toFixedNumber = (num, fixNum) => +num.toFixed(fixNum);
// module.exports = toFixedNumber;

//TODO: delete or fix
/**
 * Remove an Item from an array 
 * @param {Number} value value to be removed
 * @param {Array} arr an array
 * @return {Array}  the array
 */
const removeArrayItem = (value, arr) => {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

//TODO: Take : areArraysValuesEqual from lodash --------------> for deeper cases like: object inside an array
/**
 * Check wheter the 2 arrays conains the same values 
 * @param {Array} array1 
 * @param {Array} array2 
 * @return {Boolean} 
 */
const areArraysValuesEqual = (array1, array2) => array1.length === array2.length && array1.every((value, index) => value === array2[index])

/**
 * Check wheter the 3 arrays conains the same values 
 * @param {Array} array1 
 * @param {Array} array2 
 * @param {Array} array3 
 * @return {Boolean} 
 */
const areTripleArraysEqual = (array1, array2, array3) => areArraysValuesEqual(array1, array2) && areArraysValuesEqual(array2, array3);


// const isTripleEqual = (num1, num2, num3) => num1 === num2 && num2 === num3;

/**
 * Returns the distance between two coordinates of Vector 
 * @param {Array} coord1 coordinate point: [x, y]
 * @param {Array} coord2 coordinate point: [x, y]
 * @return {Number} float number to fix of 10 numbers after the dot
 */
const distance = (coord1, coord2) => {
    const x = coord1[0] - coord2[0],
        y = coord1[1] - coord2[1];
    return toFixedNumber(Math.sqrt(x * x + y * y), 10);
}

/**
 * Returns the Gradient of Vector 
 * @param {Array} coord1 coordinate point: [x, y]
 * @param {Array} coord2 coordinate point: [x, y]
 * @return {Number} 
 */
const vectorGradient = (coord1, coord2) => (coord1[1] - coord2[1]) / (coord1[0] - coord2[0]);

/**
 * Returns Coordinate normalized.
 * @param {Array} coord coordinate point: [x, y] to be normaled
 * @param {Array} minTL coordinate point: [x, y] to normal with it
 * @return {Number} 
 */
const normalCoordinate = (coord, minTL) => [toFixedNumber(coord[0] - minTL[0], 2), toFixedNumber(minTL[1] - coord[1], 2)];

/**
 * Checkes wheter the num is infinity 
 * @param {Number} num is Infinity
 * @return {Boolean} 
 */
const isInfinity = (num) => num === Infinity || num === -Infinity;

/**
 * Checkes wheter the object is defined 
 * @param {Object} obj 
 * @return {Boolean} 
 */
const isDefined = (obj) => obj !== undefined && obj !== null;

/**
 * Checkes wheter both of the gradients are aligns to the page
 * @param {Number} m1 gradient of vector
 * @param {Number} m1 gradient of vector
 * @return {Boolean} 
 */
const areGradientsAlignsToPage = (m1, m2) => (isDefined(m1) && isDefined(m2)) ? isInfinity(m1) && Math.abs(m2) === 0 || isInfinity(m2) && Math.abs(m1) === 0 : true;

/**
 * Returns coordinate for the middle of the line starting at coord1 to coord2
 * @param {Array} coord1 coordinate point
 * @param {Array} coord2 coordinate point
 * @return {Array} 
 */
const middleLine = (coord1, coord2) => [(coord1[0] + coord2[0]) / 2, (coord1[1] + coord2[1]) / 2];


/**
 * Checks Wheter the 2 gradient are vertical
 * @param {Number} m1 gradient of vector: float number
 * @param {Number} m2 gradient of vector: float number
 * @return {Boolean} 
 */
const areGradientsVertical = (m1, m2) => {
    // console.log(m1, m2, m1 * m2)
    let accurate = `${m1 * m2}`.split('.'); //[1].substring(0,9);
    if (m1 * m2 === -1 || accurate[0] === '-1' && accurate[1].substring(0, 9) === '000000000' || accurate[0] === '-0' && accurate[1].substring(0, 9) === '999999999') return true;
    return false

}

/**
 * Checks Wheter the 4 input coordinate are vertical to each other 
 * @param {Array} coordinates array of coordinates: [coord1, coord2, coord3, coord4]
 * @param {String} shapeType can be : 'Rectangle or 'Circular'. 
 * In Circle the check is between the diagonal lines
 * In Rectangle the check is  between all the 4 lines
 * @return {Boolean} 
 */
const isVerticalWrapper = ([coord1, coord2, coord3, coord4], shapeType = "Rectangle") => {

    let m1, m2, m3, m4;
    if (shapeType === "Circular") {
        m1 = vectorGradient(coord1, coord3);
        m2 = vectorGradient(coord2, coord4);

        return (areGradientsAlignsToPage(m1, m2) || areGradientsVertical(m1, m2))
    }
    m1 = vectorGradient(coord1, coord2);
    m2 = vectorGradient(coord2, coord3);
    m3 = vectorGradient(coord3, coord4);
    m4 = vectorGradient(coord4, coord1);

    return (areGradientsAlignsToPage(m1, m2) && areGradientsAlignsToPage(m3, m4) || areGradientsVertical(m1, m2) && areGradientsVertical(m3, m4))
}



/**
 * Checks Wheter the path point is Circle or Ellipse
 * @param {Array} pathPoints array of paths: [path1, path2, path3, path4]
 * @return {Boolean} 
 */

const isCirclePathPoints = (pathPoints) => {
    // [{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection}]
    const [path1, path2, path3, path4] = pathPoints;

    const distanceBetweenPaths = (path_1, path_2) => {

        // console.log(distance(path_1.leftDirection, path_1.anchor), distance(path_2.anchor, path_2.rightDirection),
        //     distance(path_1.rightDirection, path_1.anchor), distance(path_2.anchor, path_2.leftDirection))
        return distance(path_1.leftDirection, path_1.anchor) === distance(path_2.anchor, path_2.rightDirection) &&
            distance(path_1.rightDirection, path_1.anchor) === distance(path_2.anchor, path_2.leftDirection)
    }

    return distanceBetweenPaths(path1, path3) && distanceBetweenPaths(path2, path4) && isVerticalWrapper(pathPoints.map(point => point.anchor), "Circular");
    // return distanceBetweenPaths(path1, path3) && distanceBetweenPaths(path2, path4) && isVertical(pathPoints.map(point => point.anchor));
}

function getCircularShapeParms(shapePathPoints, minTL) {
    // [{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection}]
    const retValue = {};
    const [path1, path2, path3, path4] = shapePathPoints;

    let height = distance(path1.anchor, path3.anchor),
        width = distance(path2.anchor, path4.anchor);
    // let radius;
    retValue.center = normalCoordinate(middleLine(path1.anchor, path3.anchor), minTL);

    if (height === width) //Circle
    {
        retValue.shapeType = "Circle";
        retValue.radius = toFixedNumber(height / 2, 2);
    } else {
        retValue.shapeType = "Ellipse";
        retValue.hRadius = toFixedNumber(height / 2, 2);
        retValue.wRadius = toFixedNumber(width / 2, 2);
    }

    return retValue;
}



function isMirror({
    anchor,
    leftDirection,
    rightDirection
}) {
    return ((anchor[0] - leftDirection[0] === rightDirection[0] - anchor[0]) && (anchor[1] - leftDirection[1] === rightDirection[1] - anchor[1]));
}


function calculatePathCode(shapeCoordinates, minTL, isClosed) {
    const normal = (x) => normalCoordinate(x, minTL);

    const pointInfo = shapeCoordinates.map((el, index, array) => {
        return {
            isCornerPoint: areTripleArraysEqual.apply(null, Object.values(el)),
            isMirrorPoint: isMirror(el),
            anchor: normal(el.anchor),
            leftDirection: normal(el.leftDirection),
            rightDirection: normal(el.rightDirection),
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

    return `<path id="" d="${pathLine}" />`;
}

function getPointsForPols(shapeCoordinates, minTL) {
    const anchorsArray = shapeCoordinates.map(el => el.anchor);
    return anchorsArray.reduce((acc, anchor) => {
        const normal = normalCoordinate(anchor, minTL);
        acc += normal[0] + ", " + normal[1] + " ";
        return acc
    }, '');
}
/**
 * Counting the Shape total points 
 * @param {Array} pathsPointsArray array of shape points
 * @return {object} returns an object which contains the number of the corner points, smooth points, total points and array of the points represented as: {anchor: array, leftDirection: array, rightDirection: array}
 * { corners: int,smooths: int, shapeCoordinates: Array, totalPoints: int }
 */
function checkPointType(pathsPointsArray) {

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
        totalPoints: 0
    })
}


/**
 * Gets the SVG Code of selected shape
 * @param {object} selectedItem
 * @param {Array} minTL minimum coordinate of the shape
 * @param {Array} maxBR maximum coordinate of the shape
 * @return {object} returns the shape and its arguments {shapeType, shapeArgs}
 */
function getShapeObject(selectedItem, minTL, maxBR) {
    // TODO: Change name to the function
    //Corner- used the prepared shapes, Smooth-  draw alone
    // Corner: if anchor, left & right are equals

    const isAllCorners = (pointType) => pointType.totalPoints === pointType.corners && pointType.totalPoints > 1;
    const isCircularShape = (pointType) => pointType.totalPoints === pointType.smooths && pointType.totalPoints === 4 && isCirclePathPoints(pointType.shapeCoordinates);
    const isLine = (pointType) => pointType.corners === 2;
    const isRectangle = (pointType) => pointType.corners === 4 && isVerticalWrapper(pointType.shapeCoordinates.map(point => point.anchor)) //&& isRectCoordinates(pointType.anchorPoints); //& check for the angle (for square also check the length of the edges)
    const pointType = checkPointType(selectedItem.selectedPathPoints);
    const style = 'fill:#88C540; stroke: black; ' //get style from ADOBE Function
    //{corners, smooths, totalPoints}

    if (!selectedItem.closed) {

        //All Corners 
        if (isAllCorners(pointType)) {

            if (isLine(pointType)) { //Line

                debugger
                const [path1, path2] = pointType.shapeCoordinates;
                const coord1 = normalCoordinate(path1.anchor, minTL),
                    coord2 = normalCoordinate(path2.anchor, minTL);

                return `<line x1="${coord1[0]}" y1="${coord1[1]}" x2="${coord2[0]}" y2="${coord2[1]}"  style="${style}" />`

            } else { //Polyline
                const points = getPointsForPols(pointType.shapeCoordinates, minTL)
                return `<polyline points="${points}" style="${style}" />`
            }

        } else { //Path (one point is a path)

            return calculatePathCode(pointType.shapeCoordinates, minTL, false);
        }

    } else {
        if (isAllCorners(pointType)) {
            if (isRectangle(pointType)) { //Rectangle --->and also square

                //topeLeft position, height , width
                const [path1, path2, path3, path4] = pointType.shapeCoordinates;
                const ShapeTopLeft = selectedItem.geometricBounds.slice(0, 2);

                let height = distance(path2.anchor, path3.anchor),
                    width = distance(path1.anchor, path2.anchor),
                    topLeft = normalCoordinate(ShapeTopLeft, minTL),
                    [x, y] = topLeft;

                // const [x, y] = topLeft;



                //x,y of the rectangle (top left placement) if x=0 y=0 not have to add
                //add x,y
                return `<rect id="XMLID_16_" x="${x}" y="${y}" style="${style}" width="${toFixedNumber(width, 2)}" height="${toFixedNumber(height, 2)}" />`

            } else { //Polygon

                const points = getPointsForPols(pointType.shapeCoordinates, minTL)

                return ` <polygon points="${points}" style="${style}" />`
            }

        } else {
            if (isCircularShape(pointType)) { //Circle || Ellipse || other Circular shape
                const shapeElems = getCircularShapeParms(pointType.shapeCoordinates, minTL);
                const cx = shapeElems.center[0],
                    cy = shapeElems.center[1],
                    r = shapeElems.radius,
                    rx = shapeElems.hRadius,
                    ry = shapeElems.wRadius;

                if (shapeElems.shapeType === "Circle") {
                    return `<circle id ="XMLID_15_" style="${style}" cx="${cx}" cy="${cy}" r="${r}" /> `
                }
                return ` <ellipse id = "XMLID_15_" style = "${style}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" /> `
            } else { //Path


                return calculatePathCode(pointType.shapeCoordinates, minTL, true);
            }
        }






        //text-- the selected item is [TextFrame ]


    }
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

// function getDocumentRatio(selectedItem) {
//     const parentDoc = selectedItem.layer.parent;
//     return [+parentDoc.width.toFixed(1), +parentDoc.height.toFixed(1)]
// }


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
    const svg = `${generator}<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewerServer" width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xml:space="preserve" > ${insideShapes} </svg>`


    return svg
}


module.exports = convertSelectionToSVG;

/*<!--<path d="M0 52.5 C30 -17.5 55 -17.5 85 52.5 C 115 122.5 140 122.5 170 52.5" />-->
<path d="M0 52.5 C30 -17.5 55 -17.5 85 52.5 S 140 122.5 170 52.5" />


A
anchor: 0 52.5        ----->10 80
left: 0 52.5
right: 30 -17.5 ?


B
anchor: 85 52.5       ---->95 80
left: 55 -17.5           ----> 40 10
right: 115 122.5

C
anchor: 170 52.5
left: 140 122.5
right: 170 52.5       ----> 65 10


השתקפות מראה?
(55,-17.5)
85-55= 30 
52.5+17.5= 70

( 115,122.5)
115-85= 30
122.5-52.5= 70

IF MIRROR--> 
CURVE:
C (A right, B left, B anchor) C (B right, C left , C anchor) || C (A right, B left, B anchor) S ( C left, C anchor);*/