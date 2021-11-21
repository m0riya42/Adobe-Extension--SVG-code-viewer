<?php
   //sets the content type to javascript 
   header('Content-type: text/javascript');

   // includes all js files of the directory
   foreach(glob("../node_modules/codemirror/keymap/*.js") as $file) {
      readfile($file);
   }
?>
