import { importCodeMirrorAddOns } from './assests/js/codeMirrorImports'
import CodeMirror from 'codemirror/lib/codemirror'
// import './assests/css/stylesheet.css'
// import './assests/js/fontAwesome-all'


/************************************************/
/*                 Code Editor                  */
/************************************************/

const exampleSvg = `<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
	 x="0px" y="0px" width="427.5px" height="489.8px" viewBox="0 0 427.5 489.8" style="enable-background:new 0 0 427.5 489.8;"
	 xml:space="preserve">
<style type="text/css">
	.st0{fill:#754C29;stroke:#000000;stroke-miterlimit:10;}
	.st1{fill:#2B3990;stroke:#000000;stroke-miterlimit:10;}
</style>
<defs>
</defs>
<rect id="XMLID_18_" x="0.5" y="97.4" class="st0" width="426.5" height="391.8"/>
<ellipse id="XMLID_17_" class="st1" cx="235.7" cy="244.9" rx="123" ry="244.4"/>
</svg>
`
//--------->Code Mirror

importCodeMirrorAddOns().then(res => {
    console.log(CodeMirror.keyMap)
    const editor = CodeMirror(document.getElementById('container'), {
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

    console.log(editor)

    const copyToClipboard = () => {
        const value = editor.getValue();
        console.log('code copied: ', value)
        navigator.clipboard.writeText(value);
    }

    const exportSVG = () => {
        const value = editor.getValue();

    }
    document.getElementById('copyToClipboardButton').addEventListener('click', copyToClipboard);

})




/************************************************/
/*               Adobe Integration              */
/************************************************/
// import { CSInterface } from './assests/js/CSInterface'

import('./assests/js/CSInterface').then(() => {
    /* 1) Create an instance of CSInterface. */
    var csInterface = new CSInterface();
    console.log(csInterface)
    /* 2) Make a reference to your HTML button and add a click handler. */
    var openButton = document.querySelector("#open-button");
    openButton.addEventListener("click", openDoc);


    /* 3) Write a helper function to pass instructions to the ExtendScript side. */
    function openDoc() {
        console.log("I can't believe you clicked!");
        alert('hi');
        csInterface.evalScript("openDocument()");
    }

})
// .catch(e => alert('not in Adobe Host Mode'))


/************************************************/
/*                 Others                  */
/************************************************/




// var myPromise = new Promise((res, rej) => {
//     setTimeout(() => { res('foo'); }, 1000)
// })
// console.log(myPromise)

// myPromise.then(res => alert(res))
