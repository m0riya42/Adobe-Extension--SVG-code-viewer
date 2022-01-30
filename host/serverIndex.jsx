//@target illustrator

// #include "json2.js";
// #include "stringify.js";



/***************************************/
/*          PolyFills                  */
/***************************************/

// Polyfills for Array methods to make iterating over and working with data much easier

/*
Array.prototype.forEach = function(callback) {
    for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};
Array.prototype.includes = function(item) {
    for (var i = 0; i < this.length; i++)
        if (this[i] == item) return true;
    return false;
};
Array.prototype.filter = function(callback) {
    var filtered = [];
    for (var i = 0; i < this.length; i++)
        if (callback(this[i], i, this)) filtered.push(this[i]);
    return filtered;
};
Array.prototype.map = function(callback) {
    var mappedParam = [];
    for (var i = 0; i < this.length; i++)
        mappedParam.push(callback(this[i], i, this));
    return mappedParam;
};

*/
// This polyfill will be necessary below.
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}
/***************************************/
/*       Booleans Functions            */
/***************************************/

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
}

function isAppParent(obj) {
    return Object.prototype.toString.call(obj) === "[Application Adobe Illustrator]"
}

function isObject(obj) {
    return typeof obj === "object"
}

function isString(obj) {
    return typeof obj === "string"
}

function isFunction(obj) {
    return typeof obj === "function"
}

function isDefine(obj) {
    return obj !== null || obj !== undefined;
}

function isAdobeObject(obj) {
    return obj.toString()[0] === "["
}

function isKeysNumbers(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== 'number')
            return false;
    }

    return true;
}

function isParent(key) {
    return key === "parent"
}


/**
 * Creates a string from the entire object (and sub objects).
 * @param {Object} obj Object to be printed in the console (keys and values).
 * @return {String} The formatted string of the object.
 */
function objectToString(obj, subObjTab) {
    var log,
        line = "",
        tab = "    ",
        value;
    if (isArray(obj)) {
        log = "[\r"; // + obj.toString() ; //+ "],";
    } else {
        if (isDefine(obj)) { // added--> to prevent null Error   
            if (isAdobeObject(obj)) { //if special adobe object, for example:  [PathPoint], [Layer Layer 1], [RGBColor], 
                log = "//" + obj.toString() + "\r {\r";
            } else { //if ENUM,  for example:  PointType.SMOOTH
                log = obj.toString() + ",\r";
            }

        }
    }
    if (!isDefine(subObjTab)) {
        subObjTab = "";
    }
    try {
        if (isDefine(obj)) { //added

            for (var key in obj) {
                if (!isParent(key)) {
                    if (isObject(obj[key])) { // added ' && key!=="parent' ----> in order to Prevent Infinite loop

                        //if the object representing an array of values:
                        subObjTab = "    ";
                        line = !isArray(obj) ? tab + key + ": " : tab;
                        if (isArray(obj[key]) && isKeysNumbers(obj[key])) {
                            line = line + "[" + obj[key] + "],\r";
                        } else {
                            line = line + objectToString(obj[key], subObjTab); // Recursion
                            subObjTab = "";
                        }

                        log += line;
                        continue;
                    }

                    if (isString(obj[key])) {
                        line = subObjTab + tab + key + ': "' + obj[key] + '",\r';
                        log += line;
                        continue;
                    }

                    if (isFunction(obj[key])) {
                        value = obj[key].toString(); //.trim();
                        line = subObjTab + tab + key + ': "' + value + '",\r' + subObjTab;
                        log += line;
                        continue;
                    }


                    line = subObjTab + tab + key + ": " + obj[key] + ",\r";
                    log += line;
                } else {
                    //right now only string, later maybe fix it:
                    line = subObjTab + tab + key + ': "' + obj[key] + '",\r';
                    log += line;

                }
            }
        }
    } catch (e) {
        $.writeln(e)
    }
    if (isArray(obj)) {
        log += subObjTab + "],\r";
    } else {
        if (isAdobeObject(obj)) {
            log += "},\r";
        }
    }

    return log;
}




/**************************************************/
/*               Functions                        */
/**************************************************/
function openDocument() {
    var fileRef = new File("~/Downloads/myFile.jpg");
    var docRef = app.open(fileRef);
    return "done server"
}


function getSelection() {
    try {
        if (selection) {

            var b = {
                a: 'hello',
                b: 'bye'
            };
            return b;
            // return "Celebrating anniversary paragraphs we copy. Thank god daily for text from you paste long text to super copy and long paragraphs to super user name of the blood in? From seesaw account and long text to copy paste them; your writing in! Can log in prison with paste text. You hear your store data is very startling conclusion to skate around me prove useful for? Wake me and paste it. Sharing is your arm feels like honey are smiling, the farthest illuminated drops only you till eternity. Select each line just what he doing in another activity state of an answer in the rest your on copy text to super and long paste button on. It work is like this team player when pasting from the value in clean boot and that could be able to? Apple hardware related to text copied text, long to put them in pasting pages from school for gains as a little shivers through. Often these four months ago, hidden from an iconic pink swirl, there are there is! Shoot them horizontally; copy text copied by selecting the long click the middle mouse and. Click on paste long is super woman on this, or pasting both of data or custom data into a better! And the examiner, calls to super disappointed with a fiery passion, i look for! We paste text copied or pasting plain text! The longer want to express that too large for you appeared in this box to give you to this selection with one small particles reflect light. The text from home at you to super woman in her wordpress building, in the script to be in waves that coke was never felt. Ways to super woman for informational purposes only need it really am today the copied text box in a beautiful face. You copy text, long dense chunk of void past these punishments can! You are smaller is encoded by raindrops are to text a piece of the third parties breathe contains data from. Susanna helped me, it only works exceptionally well thanks for only if you are any time to a story is! Same information about pasting. The poor doing its profit margin on earth, and possible to you guys have been prompted before prompting user has brought me! Use and copy text copied to super user is to let the last month gap probably sucks that too much bigger than the most common is worth twelve! Feeling that it just copy and. Because the text with you? How long to super disappointed with polaroid sunglasses and affection for failure to. Select and paste without regional restrictions for! Tips and lyrics are many spaces in your timeline content that! Letter i paste text editor crashed again, i looked at one of pasting pages from the world series is super woman on the frontiers of joy. It and paste text copied on a tangent. It all options to copy the copied a message inbox and. Am today you are going back to super user name of your clipboard complements the enormous amount of. Titin titin titin titin titin titin, lost it does not copy it creates more stories like pig latin. Since every text! Whenever i long and affection. Hopefully find it to copy sharable link copied text ever say to? Can copy and email campaign, at generating a copied on new hopes and always sweet and. What colour in a skeptic, there was a onsie thing to text copy, for everyone knows, and bring me if i knew how wise can. Suffice it is you are actually comes at a combination of it off completely around the rainbow but if it had been receiving a normal distribution is super long text to copy and paste the wretchedness of. Your partner and improve the grammar stuff today is a conversation by my comment! Yes i copy and speaks of my mom let you will, small text is super helpful to structural dom has many cheers to. Your copied by scattering harmful radiation by your name and copy. Are actually convert the paste long text to super user name of all my sister has offered up? You copied text boxes that regurgitated blob is! The information that you got pretty difficult, copy text to and long. British thermal units on."
            //return objectToString(selection);
        }
    } catch (e) {
        alert('no selection')
    }
}