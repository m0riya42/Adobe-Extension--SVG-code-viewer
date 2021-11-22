
// import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/keymap/**/*.js'
import 'codemirror/addon/comment/**/*.js'
import 'codemirror/addon/dialog/**/*.js'
import 'codemirror/addon/display/**/*.js'
import 'codemirror/addon/edit/**/*.js'
import 'codemirror/addon/fold/**/*.js'
import 'codemirror/addon/hint/**/*.js'
// import 'codemirror/addon/lint/**/*.js'
import 'codemirror/addon/merge/**/*.js'
// import 'codemirror/addon/mode/**/*.js'
// import 'codemirror/addon/runmode/**/*.js'
import 'codemirror/addon/scroll/**/*.js'
import 'codemirror/addon/search/**/*.js'
import 'codemirror/addon/selection/**/*.js'
import 'codemirror/addon/tern/**/*.js'
import 'codemirror/addon/wrap/**/*.js'
// import allAddOns from 'codemirror/addon/**/*.js'

const importCssFiles = () => Promise.all([
    import('codemirror/lib/codemirror.css'),
    import('codemirror/theme/monokai.css'),
])
const importModeFiles = () => Promise.all([
    import('codemirror/mode/htmlmixed/htmlmixed.js'),
    import('codemirror/mode/xml/xml.js'),
    import('codemirror/mode/javascript/javascript.js'),
    import('codemirror/mode/css/css.js'),
])

const importAddOnsFiles = () => Promise.all([
    import('codemirror/addon/display/fullscreen.js'),
    import('codemirror/addon/hint/show-hint.js'),
    import('codemirror/addon/hint/css-hint.js')
])


const importKeyMaps = () => Promise.all([
    // import('codemirror/keymap/sublime.js'),
])

export const importCodeMirrorAddOns = () =>
    Promise.all([
        importCssFiles(),
        importModeFiles(),
        importAddOnsFiles(),
        importKeyMaps(),
    ])
