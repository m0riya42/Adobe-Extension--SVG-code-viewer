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
        console.log(acc);

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
    const style = 'fill:#88C540;' //get style from ADOBE Function
    //{corners, smooths, totalPoints}

    if (!selectedItem.closed) {

        //All Corners 
        if (isAllCorners(pointType)) {

            if (isLine(pointType)) { //Line


            } else { //Polyline


            }

        } else { //Path (one point is a path)

        }

    } else {
        if (isAllCorners(pointType)) {
            if (isRectangle(pointType)) { //Rectangle --->and also square

                //topeLeft position, height , width
                const [path1, path2, path3, path4] = pointType.shapeCoordinates;
                debugger
                let height = distance(path2.anchor, path3.anchor),
                    width = distance(path1.anchor, path2.anchor),
                    topLeft = normalCoordinate(path3.anchor, minTL); //take from the shape geometric bounds

                // const height

                //x,y of the rectangle (top left placement) if x=0 y=0 not have to add
                //add x,y
                return `<rect id="XMLID_16_" style="${style}" width="${toFixedNumber(width, 2)}" height="${toFixedNumber(height, 2)}"/>`

            } else { //Polygon


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
                    return `<circle id="XMLID_15_" style="${style}"  cx="${cx}" cy="${cy}" r="${r}"/>`
                }
                return `<ellipse  id="XMLID_15_" style="${style}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" />`
            } else { //Path


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

    //accurate width & height
    const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewer Server" width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xml:space="preserve"> ${insideShapes} </svg>`


    return svg
}