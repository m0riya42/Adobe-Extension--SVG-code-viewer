'use strict';


/************************************************/
/*                 Code Editor                  */
/************************************************/
var __SELECTED__ITEM__ = null;
var exampleSvg = '';
var url = require('url');
var http = require('http');
/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();




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
// copyToClipboard);

// })

