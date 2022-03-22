'use strict';

// var codeMIrrorImports = require('../assests/js/requireCodeMIrror');//--import all code mirror 

Array.prototype.toString = function () {
    console.log(this.join(', '));
}


/************************************************/
/*                 Code Editor                  */
/************************************************/

// ==UserScript==
// @icon         https://hackmd.io/favicon.png
// @name         VSCode shortcuts in CodeMirror
// @namespace    http://github.com/cliffxzx
// @version      0.1
// @description  Using VSCode shortcuts in CodeMirror (like HackMD, CodiMd etc ...)
// @author       Cliff Chen
// @match        *://*/*
// @grant        none
// ==/UserScript==

// 'use strict';
// (function() {
//     // https://greasyfork.org/he/scripts/422202-vscode-shortcuts-in-codemirror/code
//   if (typeof window.CodeMirror === 'function') {
var Pos = CodeMirror.Pos;

function duplicateLines(cm, down) {
    var funDown = down !== undefined ? down : false;
    cm.operation(function () {
        // debugger;
        var selectionRange = cm.listSelections();
        var rangeCount = selectionRange.length;
        for (var i = 0; i < rangeCount; i++) {
            var range = cm.listSelections()[i];
            var text = '';
            var start = Math.min(range.head.line, range.anchor.line);
            var end = Math.max(range.head.line, range.anchor.line);

            for (var j = start; j <= end; ++j) {
                text += cm.getLine(j) + "\n";
            }

            if (funDown) {
                var rangeLineCount = end - start + 1;
                cm.replaceRange(text, Pos(end + 1, 0));
                selectionRange[i].head.line += rangeLineCount;
                selectionRange[i].anchor.line += rangeLineCount;
            } else {
                cm.replaceRange(text, Pos(start, 0));
            }

        }
        cm.setSelections(selectionRange);
        cm.scrollIntoView();
    });
}


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
    autoCloseTags: true,
    // extraKeys: { "Ctrl-Space": "autocomplete" },
    matchtags: true,
    lineWrapping: true,
    extraKeys: {
        "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); }, "Alt-Z": function () {
            // document.querySelector(".CodeMirror-wrap pre.CodeMirror-line").classList.toggle('code-mirror-altZ-toggle')
            console.log('alt-z')
        }, "Ctrl-K Ctrl-0": function () { console.log('fold all') },
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]


});
editor.foldCode(CodeMirror.Pos(0, 0));
editor.foldCode(CodeMirror.Pos(21, 0));
document.querySelector(".CodeMirror-wrap pre.CodeMirror-line").classList.add('.code-mirror-altZ');
editor.addKeyMap({
    "Alt-Up": "swapLineUp",
    "Alt-Down": "swapLineDown",
    "Shift-Cmd-Alt-Up": "addCursorToPrevLine",
    "Shift-Cmd-Alt-Down": "addCursorToNextLine",
    "Cmd-K Cmd-0": "foldAll",
    "Shift-Alt-Up": function (cm) { duplicateLines(cm) },
    "Shift-Alt-Down": function (cm) { duplicateLines(cm, true) },
});


function onChangeHandler(editor) {
    // console.log(editor.getValue())
    insertSvgInHtmlPage(editor.getValue());

}
editor.on("change", onChangeHandler);
window.editor = editor

function updateEditorView(svgCode) {
    editor.setValue(svgCode)

}


function insertSvgInHtmlPage(svgCode) {
    document.getElementById('insertSvg').innerHTML = svgCode;
}
function exportSVG() {
    var value = editor.getValue();
};


/************************************************/
/*             Adobe Activities                 */
/************************************************/

var csInterface = new CSInterface();
csInterface.requestOpenExtension("com.my.localserver", "");// Use a CEP method to open the server extension.
var keyEvents = [{
    "keyCode": 90,
    "ctrlKey": true,
    "altKey": false,
    "shiftKey": false,
    "metaKey": false
}, {
    "keyCode": 75,
    "ctrlKey": true,
    "altKey": false,
    "shiftKey": false,
    "metaKey": false
}];
// var keyEvents = [];
// csInterface.registerKeyEventsInterest(JSON.stringify(keyEvents));
console.log(window.__adobe_cep__)
// console.log(JSON.stringify(window.__adobe_cep__));
// csInterface.addEventListener('keydown', function (e) {
//     alert("keydown detected");
//     console.log(e);

// });

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

