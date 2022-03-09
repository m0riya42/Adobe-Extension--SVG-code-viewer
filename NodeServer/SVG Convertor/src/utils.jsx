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