// function onCreateServer(req, res) {

//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     if (req.url === '/import') {
//         res.write('ok');
//         // console.log(csInterface);
//         // csInterface.evalScript("getSelection()", function callbackFun(res) {
//         //     socket.emit('toExtension', { text: 'hello from client', file: res })
//         //     console.log(res)
//         //     // alert('selection object printed')
//         // });

//     }
//     console.log(req.url)
//     console.log(req)
//     res.end();
//     // response.writeHeader(200, { "Content-Type": "text/html" });
//     // response.write(html);
//     // response.end();

// }


function onCreateServer(callbackCreateServerFunctions) {
    // using this functions
    //
    //
    return function (req, res) {

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        if (req.url === '/import') {
            res.write('ok');
            // callbackCreateServerFunctions();

        }
        console.log(req.url)
        console.log(req)
        res.end();
        // response.writeHeader(200, { "Content-Type": "text/html" });
        // response.write(html);
        // response.end();

    }
}

function initHttpServer(callbackFunctions) {
    var net = require('net');
    var url = require('url');
    var http = require('http');
    var fs = require('fs');
    var proxy = http.createServer(onCreateServer(callbackFunctions.createServer));
    proxy.on('connect', callbackFunctions.connect ? callbackFunctions.connect : function (req, cltSocket, head) {
        // connect to an origin server
        console.log("html is connected")
    });

    // now that proxy is running
    proxy.listen(3200, '127.0.0.1', function () {

        console.log('listenning on 3200')
    });

}



module.exports = initHttpServer;