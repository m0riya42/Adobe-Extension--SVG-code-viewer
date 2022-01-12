/**
 * @param {Array} pathsPointsArray array of shape points
 * @return {object} returns the number of corners.
 */
function checkPointType(pathsPointsArray) {
    return pathsPointsArray.reduce((acc, curr) => {
        curr.pointType === PointType.CORNER ? acc.corners++ : acc.smooths++;
        curr.totalPoints++;
        return acc;
    }, {
        corners: 0,
        smooths: 0,
        totalPoints: 0
    })
}


/**
 * @param {object} selectedItem
 * @return {object} returns the shape and its arguments {shapeType, shapeArgs}
 */
function getShapeObject(selectedItem) {
    const isAllCorners = (pointType) => pointType.totalPoints === pointType.corners && pointType.totalPoints > 1;
    const isCircularShape = (pointType) => pointType.totalPoints === pointType.smooths && pointType.totalPoints === 4;
    const isLine = (pointType) => pointType.corners === 2;
    const isRectangle = (pointType) => pointType.corners === 4;
    const pointType = checkPointType(selectedItem.selectedPathPoints);
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
            if (isRectangle(pointType)) { //Rectangle


            } else { //Polygon


            }




        } else {
            if (isCircularShape(pointType)) { //Circle || Ellipse

            } else { //Path


            }
        }






        //text-- the selected item is [TextFrame ]


    }
}


const selectedPathPoints = [ //[PathPoint]
    {
        anchor: [413.285724776131, -439.795922259895],
        leftDirection: [413.285724776131, -439.795922259895],
        rightDirection: [413.285724776131, -439.795922259895],
        pointType: PointType.CORNER,
        selected: PathPointSelection.ANCHORPOINT,
        typename: "PathPoint",
        // parent: [PathItem],
    },
    // 1: [PathPoint]
    {
        anchor: [101.040826816949, -439.795922259895],
        leftDirection: [101.040826816949, -439.795922259895],
        rightDirection: [101.040826816949, -439.795922259895],
        pointType: PointType.CORNER,
        selected: PathPointSelection.ANCHORPOINT,
        typename: "PathPoint",
        // parent: [PathItem],
    },
    // 2: [PathPoint]
    {
        anchor: [101.040826816949, -81.6326569537723],
        leftDirection: [101.040826816949, -81.6326569537723],
        rightDirection: [101.040826816949, -81.6326569537723],
        pointType: PointType.CORNER,
        selected: PathPointSelection.ANCHORPOINT,
        typename: "PathPoint",
        // parent: [PathItem],
    },
    // 3: [PathPoint]
    {
        anchor: [413.285724776131, -81.6326569537723],
        leftDirection: [413.285724776131, -81.6326569537723],
        rightDirection: [413.285724776131, -81.6326569537723],
        pointType: PointType.CORNER,
        selected: PathPointSelection.ANCHORPOINT,
        typename: "PathPoint",
        // parent: [PathItem],
    }
];


function getShapeLine(selectedItem) {

    //if PathItem
    const shapeObject = getShapeObject(selectedItem);
    // Convert to Text

    // switch (shapeObject.shapeType){
    //     case 'Rectangle':
    // }

    return '';


}

function getMaxRatio(selection) {
    //foreach selected item , return the max of width and height
    return selection.reduce((acc, selectedItem) => {
        const fixedWidth = +selectedItem.width.toFixed(1),
            fixedHeight = +selectedItem.height.toFixed(1);

        fixedWidth > acc.width ? acc.width = fixedWidth : null;
        fixedHeight > acc.height ? acc.height = fixedHeight : null;
        return acc;

    }, {
        width: 0,
        height: 0
    })
}

function getDocumentRatio(selectedItem) {
    const parentDoc = selectedItem.layer.parent;
    return [+parentDoc.width.toFixed(1), +parentDoc.height.toFixed(1)]
}

function getSvgCode(selection, width, height) {

    //not exactly true-- if the shapes are beside one another the height and the wdth will be different;

    const {
        width,
        height
    } = getMaxRatio(selection);

    const [docWidth, docHeight] = getDocumentRatio(selection[0]);
    //TODO: ADD ReduceReverse to prototype:
    //TODO: send fixed Ratio to inner function

    //    let insideShapes = selection.reduce((acc, PathItem) => {
    //         //Assuming it is all PathItem's ( not TextFrame)
    //         acc += getShapeLine(PathItem);
    //         return acc
    //     }, '')

    let insideShapes = ''; //for each shape 

    const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewer Server" width="${width}px" height="${height}px" viewBox="0 0 313.245 359.163" style="enable-background:new 0 0 ${width}${height};" xml:space="preserve">
    ${insideShapes}
    </svg>`


    return svg
}