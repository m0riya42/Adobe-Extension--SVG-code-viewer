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
    //     console.log(JSON.parse(SELECTED_STRING));
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



