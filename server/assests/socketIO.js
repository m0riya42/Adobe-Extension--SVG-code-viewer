function initFunction(csInterface) {
    var socket = io.connect('http://127.0.0.1:5200'); //Connect to Extern Server
    onSockets(socket, csInterface);
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




// socket.on('toExtension', function (command) {
//     // csInterface.evalScript(command);
//     console.log(command)
//     socket.emit('toExtension', { text: 'hello from client' })
// });
// socket.on('b', function (command) {
//     console.log(command)
// });

module.exports = initFunction;