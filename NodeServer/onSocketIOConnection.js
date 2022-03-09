// let clip = require('clipboardy/index');
// console.log("clip")

// import clipboard from 'clipboardy';
var convertToSVG = require("./tryConvertor.js");


let lastSelectedObj, selectedObj, lastSelectedDocument;
const updateSelectedObject = (obj) => {
    lastSelectedObj = obj.selectedObj;
    lastSelectedDocument = obj.selectedDoc;
}

const changeViewOnClientSide = (obj) => {

}


const setupSelectedInterval = (io) => {
    const getSelectedInterval = () => {
        io.emit("getSelected");
    }

    //if disconnected- removeINterval
    setInterval(getSelectedInterval, 5000);
}


function onSocketIOConnection(socket, io) {


    console.log('\n\nsocket io is connected'.silly);//, socket);

    io.emit("handshake", { text: "hello from server" });

    socket.on("ack-handshake", obj => {
        console.log('ack handshake')

        console.log(`window-cep: ${Object.keys(obj.cep)}`.verbose)
        // for (var key in obj.cep) {
        //     console.log(key)
        // }
        // setupSelectedInterval(io);

    })
    socket.on('getSelected-ans', obj => {

        selectedObj = JSON.parse(obj.selectedObj);
        // if (lastSelectedObj) {

        if (lastSelectedObj !== selectedObj) {
            //TODO: change view on client--- send SVG file to client.
            // Pay Attention to the difference between being NULL and having an object to show.

            changeViewOnClientSide(obj);
            //TODO: save new object
            updateSelectedObject(obj);

            //     }
            // } else {

            //no selection yet

            // }
        }
    })


    socket.on('trial-get-selection', obj => {
        console.log(convertToSVG(JSON.parse(obj.file)).error);
        // console.log(JSON.parse(obj.file).toString().error);
    })

    // io.emit('selectionRequest')
}






module.exports.connectSocket = onSocketIOConnection;