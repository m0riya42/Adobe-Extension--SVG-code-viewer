/**
 * Save text to file
 * @param {String} scriptFolderPath path for the folder
 * @param {String} fileName name of the file with file format
 * @param {String} txt the text to be saved
 * @example  saveToFile("C:\\SaveFolder", "SavedFile.js", "var b= 3;")
 */
function saveToFile(scriptFolderPath, fileName, txt) {
    try {
        var JFile = new File(scriptFolderPath + encodeURI("\\" + fileName));
        var content = txt;
        //  if (!canWriteFiles()) return null;
        writeFile(JFile, content);
        alert("File created!");
    } catch (e) {
        $.writeln(e);
    }
};

function writeFile(fileObj, fileContent, encoding) {
    encoding = encoding || "utf-8";
    fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);
    var parentFolder = fileObj.parent;
    if (!parentFolder.exists && !parentFolder.create())
        throw new Error("Cannot create file in path " + fileObj.fsName);

    fileObj.encoding = encoding;
    fileObj.open("w");
    fileObj.write(fileContent);
    fileObj.close();
    return fileObj;
}

function canWriteFiles() {

    if (isSecurityPrefSet()) return true;
    alert(script.name + " requires access to write files.\n" +
        "Go to the \"General\" panel of the application preferences and make sure " +
        "\"Allow Scripts to Write Files and Access Network\" is checked.");

    app.executeCommand(2359);
    return isSecurityPrefSet();

    function isSecurityPrefSet() {
        return app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
        ) === 1;
    }

}