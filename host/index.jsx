//@target illustrator
app.preferences.setBooleanPreference("ShowExternalJSXWarning", false); // Fix drag and drop a .jsx file

/************************************************/
/*                Main function              */
/************************************************/

function main() {
  var SCRIPT = {
    name: "Export SVG file",
    version: "v.0.0.1",
  };

  if (!documents.length) {
    alert("Error\nOpen a document and try again");
    return;
  }

  // Default variables for dialog box
  var doc = app.activeDocument,
    fileName = getDocName(doc),
    fileExt = ".svg",
    // separator = "-",
    outFolder = doc.path != "" ? doc.path : Folder.desktop,
    uiMargin = [10, 15, 10, 10];

  var sel = selection;

  if (!sel.length || sel.typename == "TextRange") {
    alert("Please select a path or group");
    return;
  }


  // Create dialog box
  var dialog = new Window("dialog", SCRIPT.name + " " + SCRIPT.version);
  dialog.alignChildren = "center";

  var outPnl = dialog.add("panel", undefined, "Output Folder");
  outPnl.orientation = "row";
  outPnl.margins = uiMargin;
  var btnOutFolder = outPnl.add("button", undefined, "Select");
  var lblOutFolder = outPnl.add("edittext", undefined);
  lblOutFolder.text = decodeURI(outFolder);
  lblOutFolder.characters = 20;

  var fileNameGrp = dialog.add("group");
  var namePnl = fileNameGrp.add("panel", undefined, "File Name");
  namePnl.orientation = "row";
  namePnl.margins = uiMargin;
  var namePrefix = namePnl.add("edittext", undefined, fileName);
  namePrefix.characters = 20;
  var btnGroup = dialog.add("group");
  var btnCancel = btnGroup.add("button", undefined, "Cancel", {
    name: "cancel",
  });
  var btnExport = btnGroup.add("button", undefined, "Export", { name: "ok" });

  // Click functions

  btnOutFolder.onClick = function () {
    var userFolder = Folder.selectDialog("Select a folder to export");
    if (userFolder != null) {
      lblOutFolder.text = decodeURI(userFolder);
      outFolder = userFolder;
    }
  };

  btnCancel.onClick = dialog.close;

  btnExport.onClick = start;

  function start() {
    var colorSpace = activeDocument.documentColorSpace;
    outFolder = decodeURI(lblOutFolder.text);

    if (isEmpty(outFolder.toString())) {
      lblOutFolder.text = doc.path != "" ? doc.path : Folder.desktop;
      return;
    }

    if (!Folder(outFolder).exists) {
      alert("This folder doesn't exist");
      lblOutFolder.text = doc.path != "" ? doc.path : Folder.desktop;
      return;
    }

    if (!isEmpty(namePrefix.text)) {
      fileName = namePrefix.text.trim();
    } else {
      alert("Please enter file name prefix");
      return;
    }

    if (outFolder == doc.path) fileName += "_copy";
    var myFile = File(outFolder + "/" + fileName + fileExt);
    saveSelection(sel, myFile, colorSpace);
    // }
    dialog.close();
  }

  dialog.center();
  dialog.show();
}

/************************************************/
/*     Get document name without extension      */
/************************************************/
function getDocName(doc) {
  var name = decodeURI(doc.name);
  // Remove filename extension
  var lastDot = name.lastIndexOf(".");
  if (lastDot > -1) return name.slice(0, lastDot);
  return name;
}

/************************************************/
/*              Check empty string             */
/************************************************/
function isEmpty(str) {
  return str.replace(/\s/g, "").length == 0;
}

/*****************************************************************/
/*     Remove whitespaces from start and end of string           */
/****************************************************************/
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

/*****************************************************************/
/* Copy selection to a new document, and save it as an SVG file  */
/****************************************************************/
function saveSelection(objects, file, color) {
  var doc = app.documents.add(color);
  app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

  copyObjectsTo(objects, doc, false);

  // Resize the artboard to the object
  //   if (fitArtboard) {
  app.executeMenuCommand("selectall");
  doc.artboards[0].artboardRect = doc.visibleBounds;
  //   }

  // Save as SVG
  try {
    var exportOptions = new ExportOptionsSVG();
    var type = ExportType.SVG;
    // var fileSpec = new File(dest);
    exportOptions.embedRasterImages = true;
    exportOptions.embedAllFonts = false;
    exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
    // app.activeDocument.exportFile( fileSpec, type, exportOptions )
    doc.exportFile(file, type, exportOptions);
    // doc.saveAs(file, IllustratorSaveOptions);
    doc.close();
  } catch (e) {}
}

/*****************************************************************/
/*         Duplicate objects and add them to a document         */
/****************************************************************/
//
function copyObjectsTo(objects, doc, separate) {
  for (var i = objects.length - 1, objLen = 0; i >= objLen; i--) {
    objects[i].duplicate(doc.activeLayer, ElementPlacement.PLACEATBEGINNING);
  }
}

/*****************************************/
/*             Run Script               */
/**********************************  ****/
try {
  main();
} catch (e) {}



// function openDocument() {
//     var fileRef = new File("~/Downloads/Adobe SVG Filters.svg");
//     var docRef = app.open(fileRef);
// }

