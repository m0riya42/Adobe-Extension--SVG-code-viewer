

/************************************************/
/*               Adobe Integration              */
/************************************************/


// console.log('loader require: ', require);
// console.log('CEP loader require: ', CEP_node_require);


// /* 1) Create an instance of CSInterface. */
// var csInterface = new CSInterface();

// /* 2) Make a reference to your HTML button and add a click handler. */
// var openButton = document.querySelector("#open-button");
// openButton.addEventListener("click", openDoc);


// /* 3) Write a helper function to pass instructions to the ExtendScript side. */
// function openDoc() {
//     console.log("I can't believe you clicked!");
//     alert('hi');
//     csInterface.evalScript("openDocument()");
// }



/************************************************/
/*                 Code Editor                  */
/************************************************/

//Monki
// //Code editor:
// // debugger;
// require.config({ paths: { vs: './Imports/MonkiEditor' } });
// require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

// // TODO: Box With Adobe styles
// // TODO: Arrange the box to the specific size, to think what will happen with changes. 
// // TODO: Change to another color- maybe monky- green like here 
// // TODO: Automate pretiffy
// // TODO: Take down the preview at the right side
// // TODO: 
// // TODO: 
// require(['vs/editor/editor.main'], function () {
//     var editor = monaco.editor.create(document.getElementById('container'), {
//         // value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
//         value: '<svg/>',
//         language: 'html'
//     });
//     console.log(editor)
// });



//--------->Code Mirror


// require("codemirror/lib/codemirror");
// require("codemirror/mode/htmlmixed/htmlmixed.js");
// require("codemirror/mode/xml/xml.js");
// require("codemirror/mode/javascript/javascript.js");
// require("codemirror/mode/css/css.js");
// // require("codemirror/theme/monokai.css")
// require("codemirror/addon/edit/closebrackets");

// var CodeMirror = require("codemirror");


console.log(CodeMirror.keyMap)
CodeMirror(document.getElementById('container'), {
    lineNumbers: true,
    // tabSize: 2,
    value: '<svg id="">dfdf</svg>',
    mode: 'htmlmixed',
    keyMap: "sublime",
    htmlMode: true,
    theme: 'monokai',
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


/************************************************/
/*                 Others                  */
/************************************************/




// var myPromise = new Promise((res, rej) => {
//     setTimeout(() => { res('foo'); }, 1000)
// })
// console.log(myPromise)

// myPromise.then(res => alert(res))
