
const { distance, middleLine } = require('../utils.jsx')

const calculateCircularParams = (shapePathPoints) => {
    const [path1, path2, path3, path4] = shapePathPoints;
    const width = distance(path1.anchor, path3.anchor),
        height = distance(path2.anchor, path4.anchor),
        center = middleLine(path1.anchor, path3.anchor);

    console.log(height, width, center)

    return [height, width, center]
}

module.exports = { calculateCircularParams }