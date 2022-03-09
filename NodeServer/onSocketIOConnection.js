// let clip = require('clipboardy/index');
// console.log("clip")

// import clipboard from 'clipboardy';
var convertToSVG = require("./tryConvertor.js");

const NO_SELECTION = (selection) => selection !== "NO_SELECTION" && selection !== '[]';
let LAST_SELECTED_STRING = "", SELECTED_STRING = "", SELECTED_OBJECT = {};
let intervalGetSelection = null; //in order to remove interval when disconected;

/*************************************************************/
/*                   Help Functions 		       	         */
/*************************************************************/


const updateSelectedObject = (obj) => {
    LAST_SELECTED_STRING = SELECTED_STRING;
    SELECTED_OBJECT = JSON.parse(SELECTED_STRING);

    // lastSelectedDocument = obj.selectedDoc;
}

const changeViewOnClientSide = (io) => {

    //TODO: Convert to SVG
    const svgCode = convertToSVG(SELECTED_OBJECT);
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
    setInterval(intervalGetSelection, 5000);
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
        // console.log(convertToSVG(JSON.parse(obj.selectedString)).error);
        console.log('getSelected-ans');
        // console.log(obj.selectedString);
        // selectedObjString = obj.selectedString;
        // if (lastSelectedObj) {
        SELECTED_STRING = obj.selectedString;


        if (NO_SELECTION(SELECTED_STRING)) {
            console.log('different from no selection');
            console.log(obj.selectedString);

            if (LAST_SELECTED_STRING) {
                // if (lastSelectedObjString !== selectedObjString) {

                //     // if (lastSelectedObjString !== selectedObjString) {
                //     //TODO: change view on client--- send SVG file to client.
                //     // Pay Attention to the difference between being NULL and having an object to show.

                //     selectedObject = JSON.parse(selectedObjString);

                //     changeViewOnClientSide(io);
                //     //TODO: save new object
                //     updateSelectedObject(obj);

                //     //     }
                //     // } else {

                //     //no selection yet

                //     // }
                // }
            }
            else {
                console.log('not exist last obj')
                updateSelectedObject(obj.selectedString);
                changeViewOnClientSide(io);
            }
        }
    })

    // socket.on('trial-get-selection', obj => {
    //     console.log(convertToSVG(JSON.parse(obj.file)).error);
    //     // console.log(JSON.parse(obj.file).toString().error);
    // })

}


module.exports.connectSocket = onSocketIOConnection;



