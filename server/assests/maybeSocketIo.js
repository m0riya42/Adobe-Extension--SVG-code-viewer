
/**********************************************************************/
/*                           SOCKET IO SERVER								     */
		// /**********************************************************************/





		// var express = require('express');
		// var app = express();
		// var path = require('path');
		// var server = require('http').createServer(app);
		// var io2 = io(server);
		// var port = process.env.PORT || 3000;

		// server.listen(port, function () {
		// 	console.log('Server listening at port %d', port);
		// });

		// // Routing
		// app.use(express.static(path.join(__dirname, 'public')));

		// // Chatroom

		// var numUsers = 0;

		// io2.on('connection', function (socket) {
		// 	var addedUser = false;

		// 	// when the client emits 'new message', this listens and executes
		// 	socket.on('new message', function (data) {
		// 		// we tell the client to execute 'new message'
		// 		socket.broadcast.emit('new message', {
		// 			username: socket.username,
		// 			message: data
		// 		});
		// 	});


		// });



		// var WebSocketServer = require('websocket').server;
		// var express = require('express');

		// var app = express.createServer();

		// app.configure(function () {
		// 	app.use(express.static(__dirname + "/public"));
		// 	app.set('views', __dirname);
		// 	app.set('view engine', 'ejs');
		// });
		// app.get('/', function (req, res) {
		// 	res.render('index', { layout: false });
		// });
		// app.listen(8080);


		// var wsServer = new WebSocketServer({
		// 	httpServer: app,

		// 	// Firefox 7 alpha has a bug that drops the
		// 	// connection on large fragmented messages
		// 	fragmentOutgoingMessages: false
		// });

		// var connections = [];
		// var canvasCommands = [];

		// wsServer.on('request', function (request) {
		// 	var connection = request.accept('whiteboard-example', request.origin);
		// 	connections.push(connection);

		// 	console.log(connection.remoteAddress + " connected - Protocol Version " + connection.webSocketVersion);

		// 	// Send all the existing canvas commands to the new client
		// 	connection.sendUTF(JSON.stringify({
		// 		msg: "initCommands",
		// 		data: canvasCommands
		// 	}));

		// 	// Handle closed connections
		// 	connection.on('close', function () {
		// 		console.log(connection.remoteAddress + " disconnected");

		// 		var index = connections.indexOf(connection);
		// 		if (index !== -1) {
		// 			// remove the connection from the pool
		// 			connections.splice(index, 1);
		// 		}
		// 	});

		// 	// Handle incoming messages
		// 	connection.on('message', function (message) {
		// 		if (message.type === 'utf8') {
		// 			try {
		// 				var command = JSON.parse(message.utf8Data);

		// 				if (command.msg === 'clear') {
		// 					canvasCommands = [];
		// 				}
		// 				else {
		// 					canvasCommands.push(command);
		// 				}

		// 				// rebroadcast command to all clients
		// 				connections.forEach(function (destination) {
		// 					destination.sendUTF(message.utf8Data);
		// 				});
		// 			}
		// 			catch (e) {
		// 				// do nothing if there's an error.
		// 			}
		// 		}
		// 	});
		// });

		// console.log("Whiteboard test app ready");






		// var socket2 = io.connect('http://127.0.0.1:6420'); //Connect to Extern Server

		// console.log('here')
		// // }

		// socket2.emit('handshake2', { text: 'hello from client' })
		// // function onSockets(socket, csInterface) {
		// socket2.on("handshake2", function (res) {
		// 	console.log(res.text)
		// })
		// var express = require('express');
		// var app = express();
		// var path = require('path');
		// var server = require('http').createServer(app);
		// // var io = require('../..')(server);
		// var io2 = io(server);
		// var port = 6420;

		// server.listen(port, function () {
		// 	console.log('Server listening at port %d', port);
		// });


		// // var io2 = io.listen(6420);
		// console.log('server is on')
		// io2.sockets.on('connection', function (socket) {
		// 	// sockets.push(socket)
		// 	console.log('port 6420')
		// 	io2.emit('toExtension', 'hi');
		// 	socket.on('toExtension', function (data) {
		// 		console.log('from website')
		// 		// for (var i = 0; i < sockets.length; i++) {
		// 		// 	sockets[i].emit('toExtension', data);
		// 		// }
		// 	});
		// });

/*********************************************************/
/*               Http Connection To Client               */
/*********************************************************/






/*********************************************************/
/*                    Http Connection                    */
/*********************************************************/


		// var net = require('net');
		// var url = require('url');
		// var http = require('http');
		// var fs = require('fs');

		// var proxy = http.createServer(function onCreateServer(req, res) {

		// 	res.writeHead(200, { 'Content-Type': 'text/plain' });

		// 	if (req.url === '/import') {
		// 		res.write('ok');
		// 		csInterface.evalScript("getSelection()", function (selectedObj) {
		// 			console.log(selectedObj);
		// 			socket.emit('trial-get-selection', { text: 'hello from client', file: selectedObj })
		// 		});

		// 	}
		// 	console.log(req.url)
		// 	console.log(req)
		// 	res.end();

		// });



		// proxy.on('connect', function (req, cltSocket, head) {
		// 	// connect to an origin server
		// 	console.log("html is connected")
		// });

		// // now that proxy is running
		// proxy.listen(3200, '127.0.0.1', function () {

		// 	console.log('listenning on 3200')
		// });


		// }