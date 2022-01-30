/******************************************************/
/*                 Assests Functions                  */
/******************************************************/

const toFixedNumber = (num, fixNum) => +num.toFixed(fixNum);
const removeArrayItem = (value, arr) => {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
//Take from lodash
const isArraysEqual = (array1, array2) => array1.length === array2.length && array1.every((value, index) => value === array2[index])
const tripleArraysEqual = (array1, array2, array3) => isArraysEqual(array1, array2) && isArraysEqual(array2, array3);

const isTripleEqual = (num1, num2, num3) => num1 === num2 && num2 === num3;
const distance = (coord1, coord2) => {
    const x = coord1[0] - coord2[0],
        y = coord1[1] - coord2[1];
    return Math.sqrt(x * x + y * y);
}

const isVertical = ([coord1, coord2, coord3, coord4]) => {
    //align to the page || rotation
    if (coord1[1] === coord3[1] && coord2[0] === coord4[0])
        return true;


    const m1 = (coord1[1] - coord3[1]) / (coord1[0] - coord3[0]),
        m2 = (coord2[1] - coord4[1]) / (coord2[0] - coord4[0]);

    // .split('.')[1].substring(0,9)==='000000000'
    console.log(m1, m2, m1 * m2)
    let accurate = `${m1 * m2}`.split('.'); //[1].substring(0,9);


    if (accurate[0] === '-1' && accurate[1].substring(0, 9) === '000000000' || accurate[0] === '-0' && accurate[1].substring(0, 9) === '999999999') return true;

    return false // return Math.round(m1 * m2) === -1 ;

}


function isRectCoordinates(coords) { //not good enough, will need to cheack x and y 
    return (!coords.reduce((acc, curr) => {
        acc.includes(curr[0]) ? removeArrayItem(curr[0], acc) : acc.push(curr[0])
        acc.includes(curr[1]) ? removeArrayItem(curr[1], acc) : acc.push(curr[1])
        return acc
    }, []).length)
}

function calculateShapeElems(shapePathPoints) {

    const isCirclePathPoints = (pathPoints) => {
        // [{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection}]
        const [path1, path2, path3, path4] = pathPoints;

        const distanceBetweenPaths = (path_1, path_2) => {
            return distance(path_1.leftDirection, path_1.anchor) === distance(path_2.anchor, path_2.rightDirection) &&
                distance(path_1.rightDirection, path_1.anchor) === distance(path_2.anchor, path_2.leftDirection)
        }

        return distanceBetweenPaths(path1, path3) && distanceBetweenPaths(path2, path4) && isVertical(pathPoints.map(point => point.anchor));
    }
    // [{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection},{anchor, leftDirection,rightDirection}]
    const retValue = {};
    const [path1, path2, path3, path4] = shapePathPoints;
    //only when it like x and y, 
    // const isCirclePathPoints = ([path1, path2, path3, path4]) => {
    //     return isTripleEqual(path1.anchor[0], path1.leftDirection[0], path1.rightDirection[0]) &&
    //         isTripleEqual(path3.anchor[0], path3.leftDirection[0], path3.rightDirection[0]) &&
    //         path1.anchor[1] === path3.anchor[1] && path1.leftDirection[1] === path3.rightDirection[1] &&
    //         path1.rightDirection[1] === path3.leftDirection[1] && //path1 & 3
    //         isTripleEqual(path2.anchor[1], path2.leftDirection[1], path2.rightDirection[1]) &&
    //         isTripleEqual(path4.anchor[1], path4.leftDirection[1], path4.rightDirection[1]) &&
    //         path2.anchor[0] === path4.anchor[0] && path2.leftDirection[0] === path4.rightDirection[0] &&
    //         path2.rightDirection[0] === path4.leftDirection[0] //path2 &4

    // }



    if (isCirclePathPoints(shapePathPoints)) {

        // retValue.height = Math.abs(shape[0][0] - shape[2][0]);
        // retValue.width = Math.abs(shape[1][1] - shape[3][1]);
        let height = distance(path1, path3),
            width = distance(path2, path4);
        // let radius;
        if (height === width) //Circle
        {
            retValue.shapeType = "Circle";
            retValue.radius = height / 2;
        } else {
            retValue.shapeType = "Ellipse";
            retValue.hRadius = height / 2;
            retValue.wRadius = width / 2;
        }

    } else { //path
        retValue.shapeType = "Path";
        //call Path function
    }



}



/**
 * @param {Array} pathsPointsArray array of shape points
 * @return {object} returns the number of corners.
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
        // isArraysEqual(anchor, leftDirection) && isArraysEqual(anchor, rightDirection) ? acc.corners++ : acc.smooths++;
        tripleArraysEqual(anchor, leftDirection, rightDirection) ? acc.corners++ : acc.smooths++;
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
        // anchorPoints: [],
        shapeCoordinates: [],
        totalPoints: 0
    })
}


/**
 * @param {object} selectedItem
 * @return {object} returns the shape and its arguments {shapeType, shapeArgs}
 */
function getShapeObject(selectedItem) {

    //Corner- used the prepared shapes, Smooth-  draw alone
    // Corner: if anchor, left & right are equals

    const isAllCorners = (pointType) => pointType.totalPoints === pointType.corners && pointType.totalPoints > 1;

    //for circular shape we'll need to check more things
    const isCircularShape = (pointType) => pointType.totalPoints === pointType.smooths && pointType.totalPoints === 4;
    const isLine = (pointType) => pointType.corners === 2;
    const isRectangle = (pointType) => pointType.corners === 4 //&& isRectCoordinates(pointType.anchorPoints); //& check for the angle (for square also check the length of the edges)
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
            if (isRectangle(pointType)) { //Rectangle --->and also square

                return `<rect id="XMLID_16_" style="fill:#88C540;" width="${toFixedNumber(selectedItem.width,2)}" height="${toFixedNumber(selectedItem.height,2)}"/>`

            } else { //Polygon


            }




        } else {
            if (isCircularShape(pointType)) { //Circle || Ellipse || other Circular shape

                const shapeElems = calculateShapeElems(pointType);
                let circularShapeLine;
                switch (shapeElems.shapeType) {
                    case 'Circle':
                        circularShapeLine = `<circle id="XMLID_15_" style="fill:#88C540;"  cx="92.5" cy="159" r="${shapeElems.radius}"/>`;
                        break;
                    case 'Ellipse':
                        circularShapeLine = ` <ellipse  id="XMLID_15_" style="fill:#88C540;" cx="200" cy="80" rx="${shapeElems.wRadius}" ry="${shapeElems.hRadius}" />`;
                        break;
                    default:
                        circularShapeLine = `<circle id="XMLID_15_" style="fill:#88C540;"  cx="92.5" cy="159" r="24.5"/>`;
                        break;
                }

                /*The cx and cy attributes define the x and y coordinates of the center of the circle. If cx and cy are omitted, the circle's center is set to (0,0)
                The r attribute defines the radius of the circle*/

                //Circle
                return circularShapeLine;
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


function getShapeSVG(selectedItem, minTL, maxBR) {

    //if PathItem
    const shapeObject = getShapeObject(selectedItem);
    // Convert to Text

    // switch (shapeObject.shapeType){
    //     case 'Rectangle':
    // }

    return '';


}


function getShapeCoorinates(selection) {
    //foreach selected item , return the minimum TL coordinate and the maximum BR coordinate

    //Y is always minus so apperently it should be the ooposite
    return selection.reduce((acc, selectedItem) => {

        // geometricBounds: [120.637472658743, -126.977149717661, 404.102039587877, -410.441716646794],
        if (!acc.minTL) {
            return {
                minTL: {
                    x: toFixedNumber(selectedItem.geometricBounds[0], 2),
                    y: toFixedNumber(selectedItem.geometricBounds[1], 2),
                },
                maxBR: {
                    x: toFixedNumber(selectedItem.geometricBounds[2], 2),
                    y: toFixedNumber(selectedItem.geometricBounds[3], 2)
                }
            }
        } else {
            acc.minTL.x = Math.min(toFixedNumber(selectedItem.geometricBounds[0], 2), acc.minTL.x);
            acc.minTL.y = Math.max(toFixedNumber(selectedItem.geometricBounds[1], 2), acc.minTL.y);
            acc.maxBR.x = Math.max(toFixedNumber(selectedItem.geometricBounds[2], 2), acc.maxBR.x);
            acc.maxBR.y = Math.min(toFixedNumber(selectedItem.geometricBounds[3], 2), acc.maxBR.y);
        }

        return acc;

    }, {});
}


// function getMaxRatio(selection) {
//     //foreach selected item , return the max of width and height
//     return selection.reduce((acc, selectedItem) => {

//         const fixedWidth = +selectedItem.width.toFixed(1),
//             fixedHeight = +selectedItem.height.toFixed(1);

//         fixedWidth > acc.width ? acc.width = fixedWidth : null;
//         fixedHeight > acc.height ? acc.height = fixedHeight : null;
//         return acc;

//     }, {
//         width: 0,
//         height: 0
//     })
// }

function getDocumentRatio(selectedItem) {
    const parentDoc = selectedItem.layer.parent;
    return [+parentDoc.width.toFixed(1), +parentDoc.height.toFixed(1)]
}



function getShapeRatio(selection) {
    const {
        minTL,
        maxBR
    } = getShapeCoorinates(selection);

    return [maxBR.x - minTL.x, minTL.y - maxBR.y, minTL, maxBR] // [width, height, minTL, maxBR]
}

/**
 * @param {Array} selection array of shapes
 * @return {String} returns the scg converted code.
 */

function getSvgCode(selection) { //}width, height) {
    const [
        width,
        height, minTL, maxBR
    ] = getShapeRatio(selection);

    // const [docWidth, docHeight] = getDocumentRatio(selection[0]);
    //TODO: ADD ReduceReverse to prototype:
    //TODO: send fixed Ratio to inner function

    let insideShapes = selection.reduce((acc, PathItem) => {
        //Assuming it is all PathItem's ( not TextFrame)
        acc += getShapeSVG(PathItem, minTL, maxBR);
        return acc
    }, '')

    let insideShapes = ''; //for each shape 

    const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="svgCodeViewer Server" width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xml:space="preserve">
    ${insideShapes}
    </svg>`


    return svg
}


/************************/
/*     Adobe Enums      */
/************************/

const StrokeCap = {
    BUTTENDCAP: 1,
    ROUNDENDCAP: 2,
    PROJECTINGENDCAP: 3
}
const StrokeJoin = {
    MITERENDJOIN: 1,
    ROUNDENDJOIN: 2,
    BEVELENDJOIN: 3
}
const PolarityValues = {
    NEGATIVE: -1,
    POSITIVE: 1
}
const BlendModes = {
    NORMAL: 0,
    MULTIPLY: 1,
    SCREEN: 2,
    OVERLAY: 3,
    SOFTLIGHT: 4,
    HARDLIGHT: 5,
    COLORDODGE: 6,
    COLORBURN: 7,
    DARKEN: 8,
    LIGHTEN: 9,
    DIFFERENCE: 10,
    EXCLUSION: 11,
    HUE: 12,
    SATURATIONBLEND: 13,
    COLORBLEND: 14,
    LUMINOSITY: 15,
}
const KnockoutState = {
    DISABLED: 0,
    ENABLED: 1,
    INHERITED: 2,
    Unknown: -1
}
const PointType = {
    SMOOTH: 1,
    CORNER: 2,
}
const PathPointSelection = {
    NOSELECTION: 1,
    ANCHORPOINT: 2,
    LEFTDIRECTION: 3,
    RIGHTDIRECTION: 4,
    LEFTRIGHTPOINT: 5
}
/*******************************/
/*     Try the functions      */
/******************************/

//first shapeToSVG
const pathItems = [

    //[PathItem ] -----Circle
    {
        closed: true,
        area: 1886.25952148438,
        length: 153.959760665894,
        guides: false,
        filled: true,
        fillColor: //[CMYKColor]
        {
            cyan: 51.8272638320923,
            magenta: 0,
            yellow: 100,
            black: 0,
            typename: "CMYKColor",
        },
        fillOverprint: false,
        stroked: false,
        strokeColor: //[NoColor]
        {
            typename: "NoColor",
        },
        strokeOverprint: false,
        strokeWidth: 1,
        strokeDashes: [],
        strokeDashOffset: 0,
        strokeCap: StrokeCap.BUTTENDCAP,
        strokeJoin: StrokeJoin.MITERENDJOIN,
        strokeMiterLimit: 10,
        clipping: false,
        evenodd: false,
        resolution: 800,
        selectedPathPoints: [
            //[PathPoint]
            {
                anchor: [145, -232.5],
                leftDirection: [145, -218.9690236299],
                rightDirection: [145, -246.0309763701],
                pointType: PointType.SMOOTH,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [120.5, -257],
                leftDirection: [134.0309763701, -257],
                rightDirection: [106.9690236299, -257],
                pointType: PointType.SMOOTH,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [96, -232.5],
                leftDirection: [96, -246.0309763701],
                rightDirection: [96, -218.9690236299],
                pointType: PointType.SMOOTH,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [120.5, -208],
                leftDirection: [106.9690236299, -208],
                rightDirection: [134.0309763701, -208],
                pointType: PointType.SMOOTH,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
        ],
        polarity: PolarityValues.POSITIVE,
        typename: "PathItem",
        uRL: "",
        note: "",
        layer: //[Layer Layer 1]
        {
            visible: true,
            locked: false,
            printable: true,
            hasSelectedArtwork: true,
            preview: true,
            dimPlacedImages: false,
            color: //[RGBColor]
            {
                red: 78.6926070038911,
                green: 127.501945525292,
                blue: 255,
                typename: "RGBColor",
            },
            name: "Layer 1",
            opacity: 100,
            zOrderPosition: 1,
            absoluteZOrderPosition: 3,
            sliced: false,
            blendingMode: BlendModes.NORMAL,
            isIsolated: false,
            artworkKnockout: KnockoutState.INHERITED,
            typename: "Layer",
            parent: "[Document first_toSVG_image.ai]",
        },
        locked: false,
        hidden: false,
        selected: true,
        position: [96, -208],
        width: 49,
        height: 49,
        geometricBounds: [96, -208, 145, -257],
        visibleBounds: [96, -208, 145, -257],
        controlBounds: [96, -208, 145, -257],
        name: "",
        blendingMode: BlendModes.NORMAL,
        opacity: 100,
        isIsolated: false,
        artworkKnockout: KnockoutState.DISABLED,
        zOrderPosition: 2,
        absoluteZOrderPosition: 2,
        editable: true,
        sliced: false,
        top: -208,
        left: 96,
    },
    //[PathItem ] -----Rectangle
    {
        closed: true,
        area: 23080.5,
        length: 637,
        guides: false,
        filled: true,
        fillColor: //[CMYKColor]
        {
            cyan: 51.8272638320923,
            magenta: 0,
            yellow: 100,
            black: 0,
            typename: "CMYKColor",
        },
        fillOverprint: false,
        stroked: false,
        strokeColor: //[NoColor]
        {
            typename: "NoColor",
        },
        strokeOverprint: false,
        strokeWidth: 1,
        strokeDashes: [],
        strokeDashOffset: 0,
        strokeCap: StrokeCap.BUTTENDCAP,
        strokeJoin: StrokeJoin.MITERENDJOIN,
        strokeMiterLimit: 10,
        clipping: false,
        evenodd: false,
        resolution: 800,
        selectedPathPoints: [
            //[PathPoint]
            {
                anchor: [235, -185],
                leftDirection: [235, -185],
                rightDirection: [235, -185],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [28, -185],
                leftDirection: [28, -185],
                rightDirection: [28, -185],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [28, -73.5],
                leftDirection: [28, -73.5],
                rightDirection: [28, -73.5],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [235, -73.5],
                leftDirection: [235, -73.5],
                rightDirection: [235, -73.5],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
        ],
        polarity: PolarityValues.POSITIVE,
        typename: "PathItem",
        uRL: "",
        note: "",
        layer: //[Layer Layer 1]
        {
            visible: true,
            locked: false,
            printable: true,
            hasSelectedArtwork: true,
            preview: true,
            dimPlacedImages: false,
            color: //[RGBColor]
            {
                red: 78.6926070038911,
                green: 127.501945525292,
                blue: 255,
                typename: "RGBColor",
            },
            name: "Layer 1",
            opacity: 100,
            zOrderPosition: 1,
            absoluteZOrderPosition: 3,
            sliced: false,
            blendingMode: BlendModes.NORMAL,
            isIsolated: false,
            artworkKnockout: KnockoutState.INHERITED,
            typename: "Layer",
            parent: "[Document first_toSVG_image.ai]",
        },
        locked: false,
        hidden: false,
        selected: true,
        position: [28, -73.5],
        width: 207,
        height: 111.5,
        geometricBounds: [28, -73.5, 235, -185],
        visibleBounds: [28, -73.5, 235, -185],
        controlBounds: [28, -73.5, 235, -185],
        name: "",
        blendingMode: BlendModes.NORMAL,
        opacity: 100,
        isIsolated: false,
        artworkKnockout: KnockoutState.DISABLED,
        zOrderPosition: 1,
        absoluteZOrderPosition: 1,
        editable: true,
        sliced: false,
        top: -73.5,
        left: 28,
    },
];

const first_shapeSVG = `<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
	 x="0px" y="0px" width="207px" height="183.5px" viewBox="0 0 207 183.5" style="enable-background:new 0 0 207 183.5;"
	 xml:space="preserve">
<style type="text/css">
	.st0{fill:#88C540;}
</style>
<defs>
</defs>
<rect id="XMLID_16_" class="st0" width="207" height="111.5"/>
<circle id="XMLID_15_" class="st0" cx="92.5" cy="159" r="24.5"/>
</svg>
`