//@target illustrator
function openDocument() {
    var fileRef = new File("~/Downloads/myFile.jpg");
    var docRef = app.open(fileRef);

    return "done client"
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