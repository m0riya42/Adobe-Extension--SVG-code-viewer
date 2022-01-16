let lastSelectedObj, lastSelectedDocument;
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
        setupSelectedInterval(io);

    })


    socket.on('getSelected-ans', obj => {

        // if (lastSelectedObj) {

        if (lastSelectedObj !== obj.selectedObj) {
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

    // io.emit('selectionRequest')
}






module.exports.connectSocket = onSocketIOConnection;