// let clip = require('clipboardy/index');
// console.log("clip")

// import clipboard from 'clipboardy';
var convertToSVG = require("./SVG Convertor/src/selectionToSVG.jsx");

const IS_SELECTION_EXIST = (selection) => selection !== "NO_SELECTION" && selection !== '[]';
let LAST_SELECTED_STRING = '', SELECTED_STRING = '', SELECTED_OBJECT = {};
let intervalGetSelection = null; //in order to remove interval when disconected;

/*************************************************************/
/*                   Help Functions 		       	         */
/*************************************************************/


const updateSelectedObject = (isSelectionExist) => {
    LAST_SELECTED_STRING = isSelectionExist ? SELECTED_STRING : '';
    SELECTED_OBJECT = isSelectionExist ? JSON.parse(SELECTED_STRING) : {};

    // if (JSON.parse(SELECTED_STRING).length > 1)
    // console.log(JSON.parse(SELECTED_STRING));
    console.log(SELECTED_STRING);
}

const changeViewOnClientSide = (io, isSelectionExist) => {

    //TODO: Convert to SVG
    const svgCode = isSelectionExist ? convertToSVG(SELECTED_OBJECT) : '';
    //TODO: Emit SelectedToClient
    io.emit("selectedToClient", svgCode);

    //TODO:
    //TODO:
}

const setupSelectedInterval = (io) => {
    intervalGetSelection = () => {
        io.emit("getSelected");
    }

    //if disconnected- removeINterval
    setInterval(intervalGetSelection, 1000);
}

const handleChangeSelection = (io, isSelectionExist) => {
    console.log('Updating Selection')
    updateSelectedObject(isSelectionExist);
    changeViewOnClientSide(io, isSelectionExist);
}

const handleSelection = (io) => {

    // console.log(SELECTED_STRING, IS_SELECTION_EXIST(SELECTED_STRING))
    if (IS_SELECTION_EXIST(SELECTED_STRING)) {
        // console.log(`\n--****--------Selection---------****--\n ${SELECTED_STRING} \n--****-----------End------------****--\n`);
        if (LAST_SELECTED_STRING === SELECTED_STRING)
            return;
        handleChangeSelection(io, true);

        // if (LAST_SELECTED_STRING) {
        //     LAST_SELECTED_STRING !== SELECTED_STRING && handleChangeSelection(io);
        // }
        // else {
        //     handleChangeSelection(io);

        // }
    }
    else {
        //TODO: update last and current selection selection to be null
        // updateSelectedObject(false);

        if (LAST_SELECTED_STRING === '')
            return;
        handleChangeSelection(io, false);

    }
}




/*************************************************************/
/*                   EXPORT Function		       	         */
/*************************************************************/

function onSocketIOConnection(socket, io) {

    console.log('\n\nsocket io is connected'.silly);

    io.emit("handshake", { text: "hello from server" });

    socket.on("ack-handshake", obj => {
        console.log('ack handshake')

        setupSelectedInterval(io);


    })
    socket.on('getSelected-ans', obj => {
        // console.log('Selected-ans-arrived');
        SELECTED_STRING = obj.selectedString;
        handleSelection(io);

    })

    // socket.on('trial-get-selection', obj => {
    //     console.log(convertToSVG(JSON.parse(obj.file)).error);
    //     // console.log(JSON.parse(obj.file).toString().error);
    // })

}


module.exports.connectSocket = onSocketIOConnection;





var result = [{
     "closed": true,
      "area": 21876.314453125, "length": 555.40847826004, "guides": false, "filled": true, "fillColor":
        { "cyan": 0, "magenta": 0, "yellow": 0, "black": 0, "typename": "CMYKColor" }, "fillOverprint": false, "stroked": true, "strokeColor": { "cyan": 0, "magenta": 0, "yellow": 0, "black": 100, "typename": "CMYKColor" }, "strokeOverprint": false, "strokeWidth": 0.57885920509095, "strokeDashes": [], "strokeDashOffset": 0, "strokeCap": 1, "strokeJoin": 1, "strokeMiterLimit": 10, "clipping": false, "evenodd": false, "resolution": 800, "selectedPathPoints": [{ "anchor": [103, -326.5], "leftDirection": [103, -265.4725351471], "rightDirection": [103, -387.5274648529], "pointType": 1, "selected": 2, "typename": "PathPoint", "parent": "[PathItem ]" }, { "anchor": [40, -437], "leftDirection": [74.7939392374001, -437], "rightDirection": [5.20606076259992, -437], "pointType": 1, "selected": 2, "typename": "PathPoint", "parent": "[PathItem ]" }, { "anchor": [-23, -326.5], "leftDirection": [-23, -387.5274648529], "rightDirection": [-23, -265.4725351471], "pointType": 1, "selected": 2, "typename": "PathPoint", "parent": "[PathItem ]" }, { "anchor": [40, -216], "leftDirection": [5.20606076259992, -216], "rightDirection": [74.7939392374001, -216], "pointType": 1, "selected": 2, "typename": "PathPoint", "parent": "[PathItem ]" }], "polarity": 1, "typename": "PathItem", "uRL": "", "note": "", "layer": { "visible": true, "locked": false, "printable": true, "hasSelectedArtwork": true, "preview": true, "dimPlacedImages": false, "color": { "red": 78.6926070038911, "green": 127.501945525292, "blue": 255, "typename": "RGBColor" }, "name": "Layer 1", "opacity": 100, "zOrderPosition": 1, "absoluteZOrderPosition": 6, "sliced": false, "blendingMode": 0, "isIsolated": false, "artworkKnockout": 2, "typename": "Layer", "parent": "[Document Untitled-1]" }, "locked": false, "hidden": false, "selected": true, "position": [-23, -216], "width": 126, "height": 221, "geometricBounds": [-23, -216, 103, -437], "visibleBounds": [-23.2894296025452, -215.710570397455, 103.289429602545, -437.289429602546], "controlBounds": [-23.2894296025452, -215.710570397455, 103.289429602545, -437.289429602546], "name": "", "blendingMode": 0, "opacity": 100, "isIsolated": false, "artworkKnockout": 0, "zOrderPosition": 2, "absoluteZOrderPosition": 4, "editable": true, "sliced": false, "top": -215.710570397455, "left": -23.2894296025452, "visibilityVariable": null, "pixelAligned": false, "wrapped": false, "parent": "[Layer Layer 1]"
}]