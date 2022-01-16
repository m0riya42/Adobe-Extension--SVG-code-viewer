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
// var localServer = cep_node.require(__dirname + '/server/main.js')();
// window.csInterface= csInterface;
// window.$=$;





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
// csinterface.addEventListener('com.my.localserver.ServerStarted', function (evt) {
//     console.log(evt);
// });


// csInterface.addEventListener("documentAfterActivate", onDocActivatedChanged);

// function onDocActivatedChanged(event) {
//     new CSInterface().evalScript("alert('doc changed!')");
// }


// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.ART_SELECTION_CHANGED,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve.type, eve.data);
//     }
// );
// AIEventAdapter.getInstance().addEventListener(
//     AIEvent.CURRENT_FONT_CHANGED,
//     function (eve) {
//         alert(eve.type + " invoked.");
//         console.log(eve.type, eve.data);
//     }
// );

// console.log(window.__adobe_cep__);
// console.log(JSON.stringify(window.__adobe_cep__));


// var ev = new CSEvent('com.adobe.csxs.events.CustomApplicationEventWithPayload', "APPLICATION", 'ILST')
// var ev = new CSEvent('com.adobe.illustrator.events.selection', "APPLICATION", 'ILST')
// ev.data = "hello";

// csInterface.dispatchEvent(ev)


// csInterface.addEventListener('com.adobe.csxs.events.CustomApplicationEventWithPayload', function (p) { console.log('add event', p) })
// csInterface.addEventListener('com.adobe.illustrator.events.selection', function (p) { console.log('add event', p) })


// var csInterface = new CSInterface()
// var event = new CSEvent("com.adobe.illustrator.event.fromHTML")
// event.scope = "APPLICATION";
// event.appId = "ILST"
// event.extensionId = "com.adobe.illustrator.simpleUI";
// event.data = "Hello from HTML!";
// csInterface.dispatchEvent(event)


// csInterface.addEventListener("com.adobe.illustrator.event.fromAISDK",
//     function (event) {
//         alert("Message received: " + event.data);
//     }
// );


// // // Create a named event handler callback function
// // function myEventHandler(event) {
// //     console.log("type=" + event.type + ", data=" + event.data);
// // }
// // // Register the named event handler
// // CSInterface.addEventListener("cep.sender.event.message", myEventHandler);


// // function Register(inOn)
// // 	{
// // if (inOn)
// // {
// // var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
// var ev2 = new CSEvent("com.adobe.illustrator.events", "APPLICATION");
// // }
// // else
// // {
// // 	var ev2 = new CSEvent("com.adobe.PhotoshopUnRegisterEvent", "APPLICATION");
// // };
// ev2.extensionId = "svgCodeViewer";

// // #region // ev2 CODES //
// // ╔════════╦═════════╦════════════╗
// // ║ Name   ║ Char ID ║ Type ID    ║
// // ╠════════╬═════════╬════════════╣
// // ║ Hide   ║ Hd      ║ 1214521376 ║
// // ║ Select ║ slct    ║ 1936483188 ║
// // ║ Set    ║ setd    ║ 1936028772 ║
// // ║ Show   ║ Shw     ║ 1399355168 ║
// // ╚════════╩═════════╩════════════╝
// // #endregion

// ev2.data = "1936483188";
// csInterface.dispatchEvent(ev2);
// // }

// csInterface.addEventListener("cep.extendscript.event.message",
//     function (event) {
//         console.log(event.data);
//     }
// );

// // var csInterface = new CSInterface();
// var event = new CSEvent("cep.sender.event.message", "APPLICATION");
// event.data = "This is a test!";
// csInterface.dispatchEvent(event);


// function contentsCallBack(in_contents) {
//     console.log(in_contents)
//     // do something here with the contents of the file
// }

var copyToClipboard = function copyToClipboard() {
    var value = editor.getValue();
    console.log('code copied: ', value);
    //call copy from CSInterface
    csInterface.evalScript("returnSelection()", function callbackFun(res) {
        console.log(res)
        alert('selection object printed')
    });

    // csInterface.evalScript("getFileContents(Folder.desktop+'/test.txt')",
    //     contentsCallBack);


    //copy from selection

    // navigator.clipboard.writeText(value);
};



function connectTheServer() {
    csInterface.evalScript("openDocument()", function (res) {
        console.log('done');
    });
    csInterface.evalScript("getSelection()", function callbackFun(res) {
        console.log(res)
        // alert('selection object printed')
    });

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


    // var requestURL = 'http://localhost:3200/import';
    // var request = new XMLHttpRequest();
    // request.open('GET', requestURL);
    // // request.responseType = 'json';
    // request.send();
    // if (request.response) {

    //     alert("the response is: " + request.response);
    //     console.log(request.response);
    // }
    // else alert("no response")
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
// setInterval(getAppSelection, 5000)

var exportSVG = function exportSVG() {
    var value = editor.getValue();
};
document.getElementById('copyToClipboardButton').addEventListener('click',
    connectTheServer);
// copyToClipboard);

// })


/************************************************/
/*               Adobe Integration              */
/************************************************/

// import('./assests/js/CSInterface').then(() => {
/* 1) Create an instance of CSInterface. */
// console.log(csInterface);
/* 2) Make a reference to your HTML button and add a click handler. */
// var openButton = document.querySelector("#open-button");
// openButton.addEventListener("click", openDoc);

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
// function openDoc() {
//     console.log("I can't believe you clicked!");
//     alert('hi');
// }

// })
// .catch(e => alert('not in Adobe Host Mode'))


/************************************************/
/*                 Others                  */
/************************************************/

// var myPromise = new Promise((res, rej) => {
//     setTimeout(() => { res('foo'); }, 1000)
// })
// console.log(myPromise)

// myPromise.then(res => alert(res))
