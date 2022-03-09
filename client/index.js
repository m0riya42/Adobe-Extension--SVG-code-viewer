'use strict';


/************************************************/
/*                 Code Editor                  */
/************************************************/

Array.prototype.toString = function () {
    console.log(this.join(', '));
}
var b = ["a", "b", "c", "d"];

console.log(b)
// var s = require('../assests/js/requireCodeMIrror');//--import all code mirror 
// console.log(s)
var __SELECTED__ITEM__ = null;
var exampleSvg = '';
var url = require('url');
var http = require('http');
/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();



//connect to socketIO

// var socket = io.connect('http://localhost:8080');

// socket.on('toExtension', function (command) {
//     console.log('connect')
// csInterface.evalScript(command);
//try typing app.activeDocument.close() in the browser
// });


// csInterface.addEventListener("DevToolsConsoleEvent", function (event) {
//     console.log(event.data);
// });

var editor = CodeMirror(document.getElementById('codeMirrorContainer'), {
    lineNumbers: true,
    // tabSize: 2,
    // value: '<svg id="">dfdf</svg>',
    value: exampleSvg,
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


/* 2) Use a CEP method to open the server extension. */
csInterface.requestOpenExtension("com.my.localserver", "");



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

function getAppSelection() {
    csInterface.evalScript("returnSelection()", function callbackFun(res) {

        if (__SELECTED__ITEM__ !== res) {
            // alert('selection object changed')
            console.log('OLD ITEM: ', JSON.stringify(__SELECTED__ITEM__));
            __SELECTED__ITEM__ = res;
            console.log('NEW ITEM: ', JSON.stringify(__SELECTED__ITEM__));
        }
        // console.log(res)
    });
}

var exportSVG = function exportSVG() {
    var value = editor.getValue();
};
document.getElementById('copyToClipboardButton').addEventListener('click',
    connectTheServer);
document.getElementById('CLEAR').addEventListener('click',
    function () {

        csInterface.evalScript("getSelection()", function (selectedObj) {
            console.log(selectedObj);
            // socket.emit('trial-get-selection', { text: 'hello from client', file: selectedObj })
            editor.setValue('')
        });
        // console.log(p);
    });
// copyToClipboard);

// })


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

