'use strict';

// var codeMIrrorImports = require('../assests/js/requireCodeMIrror');//--import all code mirror 

Array.prototype.toString = function () {
    console.log(this.join(', '));
}


/************************************************/
/*                 Code Editor                  */
/************************************************/



var editor = CodeMirror(document.getElementById('codeMirrorContainer'), {
    lineNumbers: true,
    // tabSize: 2,
    value: '',
    mode: 'htmlmixed',
    keyMap: "sublime",
    htmlMode: true,
    theme: 'svgCodeContainer',
    // theme: 'monokai',
    matchBrackets: true,
    smartIndent: true,
    // scrollbarStyle
    // showCursorWhenSelecting: true,
    spellcheck: true,
    autocorrect: true,
    // autocapitalize: true,
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" }
});



function updateEditorView(svgCode) {
    editor.setValue(svgCode)

}
function exportSVG() {
    var value = editor.getValue();
};


/************************************************/
/*             Adobe Activities                 */
/************************************************/

var csInterface = new CSInterface();
csInterface.requestOpenExtension("com.my.localserver", "");// Use a CEP method to open the server extension.



/************************************************/
/*             Connect To Server                */
/************************************************/



var http = require('http');


var proxy = http.createServer(function onCreateServer(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (req.url === '/selectedToClient') {
        res.write('ok');
        var body = "";

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            console.log(body);
            updateEditorView(body);
        });

    }
    res.end();
});


proxy.on('connect', function (req, cltSocket, head) {
    // connect to an origin server
    console.log("html is connected")
});

// now that proxy is running
proxy.listen(6432, '127.0.0.1', function () {
    console.log('listenning on 6432')
});



function connectTheServer() {
    http.get("http://localhost:3200/import", function (res) {
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log(body);
        });
        alert("Got response: " + res.statusCode);
        console.log(res);
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}



/************************************************/
/*               Deleted Buttons                */
/************************************************/



// document.getElementById('copyToClipboardButton').addEventListener('click',
//     connectTheServer);
// document.getElementById('CLEAR').addEventListener('click',
//     function () {

//         csInterface.evalScript("getSelection()", function (selectedObj) {
//             console.log(selectedObj);
//             // socket.emit('trial-get-selection', { text: 'hello from client', file: selectedObj })
//             editor.setValue('')
//         });
//     });



/************************************************************** */
//AIEventAdapter--- >Not working
/************************************************************** */


// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.ART_SELECTION_CHANGED,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve)
//     }
// )
// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.CURRENT_FONT_CHANGED,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve)
//     }
// )
// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.DOCUMENT_NEW,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve)
//     }
// )
// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.LAYER_DELETION,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve)
//     }
// )
// require('require-all');

