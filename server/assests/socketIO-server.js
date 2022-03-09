var io = require('socket.io').listen(6420);
console.log('server is on')
io.sockets.on('connection', function (socket) {
    // sockets.push(socket)
    console.log('port 6420')
    io.emit('toExtension', 'hi');
    socket.on('toExtension', function (data) {
        console.log('from website')
        // for (var i = 0; i < sockets.length; i++) {
        // 	sockets[i].emit('toExtension', data);
        // }
    });
});


    //     console.log(csInterface);
    // csInterface.evalScript("getSelection()", function callbackFun(res) {
    //     socket.emit('toExtension', { text: 'hello from client', file: res })
    //     console.log(res)
    //     // alert('selection object printed')
    // });