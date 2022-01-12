// import { importCodeMirrorAddOns } from './assests/js/codeMirrorImports'
// import { CodeMirror } from 'codemirror/lib/codemirror'
// import { CSInterface } from './assests/js/CSInterface'
// import './assests/css/stylesheet.css'
// import './assests/js/fontAwesome-all'


/************************************************/
/*                 Code Editor                  */
/************************************************/

const exampleSvg = '<svg>Hello</svg>'
//--------->Code Mirror

// importCodeMirrorAddOns().then(res => {
console.log(CodeMirror.keyMap)
const editor = CodeMirror(document.getElementById('codeMirrorContainer'), {
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

// })




/************************************************/
/*               Adobe Integration              */
/************************************************/

// import('./assests/js/CSInterface').then(() => {
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

