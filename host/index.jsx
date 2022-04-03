//@target illustrator
// #include "json2.js";


alert('printed fro, index.jsx');


function openDocument() {
    var fileRef = new File("~/Downloads/myFile.jpg");
    var docRef = app.open(fileRef);

    return "done"
}


function getSelection() {
    try {
        if (selection) {
            return selection;
        }
    } catch (e) {
        alert('no selection')
    }
}

// var a= {a:'hi', b: 'bye'}
// DEBUG = 1;
// $.writeln(JSON.stringify(a, null, 2));
// try {
//   var xLib = new ExternalObject("lib:PlugPlugExternalObject");
// } catch (e) {
//   alert(e);
// }

// function devToolsConsoleOut(in_message) {
//   if (DEBUG == 1) {
//     var eventObj = new CSXSEvent();
//     eventObj.type = "DevToolsConsoleEvent";
//     eventObj.data = in_message;
//     eventObj.dispatch();
//   }
// }
// function getFileContents(in_path) {
//   try {
//     do {
//       devToolsConsoleOut("Info: Entering getFileContents");
//       var retVal = null;
//       if (!in_path) {
//         devToolsConsoleOut("Error: Argument is null");
//         break;
//       }
//       if (typeof in_path != "string") {
//         devToolsConsoleOut("Error: Argument is not the correct type");
//         break;
//       }
//       if (in_path.length == 0) {
//         devToolsConsoleOut("Error: Argument is an empty string");
//         break;
//       }
//       var file = File(in_path);
//       if (!file.exists) {
//         devToolsConsoleOut("Error: Could not find file - " + file.fullName);
//         break;
//       }
//       if (!file.open()) {
//         devToolsConsoleOut("Error: Could not open file - " + file.fullName);
//         break;
//       }
//       retVal = file.read();
//       if (!file.close()) {
//         devToolsConsoleOut("Warning: Could not close file - " + file.fullName);
//       }
//       devToolsConsoleOut("Info: File read OK");
//     } while (false);
//   } catch (e) {
//     devToolsConsoleOut(e);
//   }
//   devToolsConsoleOut("Info: Leaving getFileContents");
//   return retVal;
// }

// function dispatchCepEvent(in_eventType, payload_data) {
//   if (xlib) {
//     var eventObj = new CSXSEvent();
//     eventObj.type = in_eventType;
//     eventObj.data = payload_data;
//     eventObj.dispatch();
//   }
// }
// dispatchCepEvent("cep.extendscript.event.message", "Update the UI");
// dispatchCepEvent("com.adobe.illustrator.events.selection", selection);

//--------------------------------------------->
// function openDocument() {
//   var fileRef = new File("~/Downloads/Adobe SVG Filters.svg");
//   var docRef = app.open(fileRef);
// }

// function coptYoClipboard() {
//     // var fileRef = new File("~/Downloads/Adobe SVG Filters.svg");
//     // var docRef = app.open(fileRef);
//     app.copy();
// }