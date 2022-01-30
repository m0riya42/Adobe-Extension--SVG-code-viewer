function initFunction(csInterface) {
    console.log('here')
    var socket = io.connect('http://127.0.0.1:5200'); //Connect to Extern Server
    onSockets(socket, csInterface);
    console.log('here')
}

function onSockets(socket, csInterface) {
    socket.on("handshake", function (res) {
        console.log(res.text)
        socket.emit('ack-handshake', { text: 'hello from client' })
    })

    socket.on("getSelected", function (res) {
        csInterface.evalScript("getSelection()", function (selectedObj) {
            console.log(selectedObj);
            socket.emit('getSelected-ans', { text: 'hello from client' })
        });
        // console.log(command)
        // });
    })
}



module.exports.initSocketIO = initFunction;
// module.exports.evalScript = evalScript;//, emitSocket };