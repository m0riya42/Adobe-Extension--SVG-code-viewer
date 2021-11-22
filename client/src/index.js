// import { CSInterface } from './CSInterface'
import { importCodeMirrorAddOns } from './assests/js/codeMirrorImports'
import CodeMirror from 'codemirror/lib/codemirror'

/************************************************/
/*               Adobe Integration              */
/************************************************/


// console.log('loader require: ', require);
// console.log('CEP loader require: ', CEP_node_require);


// /* 1) Create an instance of CSInterface. */
// var csInterface = new CSInterface();
// console.log(csInterface)
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


//--------->Code Mirror

importCodeMirrorAddOns().then(res => {

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


})


/************************************************/
/*                 Others                  */
/************************************************/




// var myPromise = new Promise((res, rej) => {
//     setTimeout(() => { res('foo'); }, 1000)
// })
// console.log(myPromise)

// myPromise.then(res => alert(res))
