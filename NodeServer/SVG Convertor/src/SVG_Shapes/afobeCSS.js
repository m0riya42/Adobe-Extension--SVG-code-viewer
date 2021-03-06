


//read in preferences from CSS export options


//CSS tags all defined in one place
var backgroundStr = "background : ";
var borderStyleStr = "border-style : ";
var borderColorStr = "border-color : ";
var borderWidthStr = "border-width : ";
var borderRadiusStr = "border-radius : ";
var backgroundImageStr = "background-image : ";
var backgroundRepeatStr = "background-repeat : ";
var opacityStr = "opacity : ";
var opacityForIEStr = "opacity";
var positionStr = "position : ";
var leftStr = "left : ";
var topStr = "top : ";
var widthStr = "width : ";
var heightStr = "height : ";
var boxShadowStr = "box-shadow : ";
var fontFamilyStr = "font-family : ";
var fontWeightStr = "font-weight : ";
var fontStyleStr = "font-style : ";
var fontSizeStr = "font-size : ";
var lineHeightStr = "line-height : ";
var letterSpacingStr = "letter-spacing : ";
var fontVariantStr = "font-variant : ";
var textTransformStr = "text-transform : ";
var verticalAlignStr = "vertical-align : ";
var textColorStr = "color : ";
var textOutlineStr = "text-outline : ";
var textDecorationStr = "text-decoration : ";
var textShadowStr = "text-shadow : ";

var startColorStr = "startColorstr";
var endColorStr = "endColorstr";
var gradientStyleStr = "Stlye";
var noRepeatStr = "no-repeat";
var absoluteStr = "absolute ";
var alphaStr = "alpha";
var boldStr = "bold";
var italicStr = "italic";
var lineThroughStr = "line-through";
var underlineStr = "underline";
var newLineStr = "\r\n\t";
var newLineNoTabStr = "\r\n";
var rgbaStr = "rgba";
var coloStopStr = "color-stop";

//vendor prefixes
var filterStr = "filter: ";
var msFilterStr = "-ms-filter: ";
var mozLinearGradientStr = "-moz-linear-gradient";
var webkitLinearGradientStr = "-webkit-linear-gradient";
var webkitGradientStr = "-webkit-gradient";
var operaLinearGradientStr = "-o-linear-gradient";
var msLinearGradientStr = "-ms-linear-gradient";
var linearGradientStr = "linear-gradient";
var mozRadialGradientStr = "-moz-radial-gradient";
var webkitRadialGradientStr = "-webkit-radial-gradient";
var operaRadialGradientStr = "-o-radial-gradient";
var msRadialGradientStr = "-ms-radial-gradient";
var mozBorderRadiusStr = "-moz-border-radius : ";
var webkitBorderRadiusStr = "-webkit-border-radius : ";
var radialGradientStr = "radial-gradient";

var msAlphaStr = "progid:DXImageTransform.Microsoft.Alpha";
var msGradientStr = "progid:DXImageTransform.Microsoft.gradient";
var msDropShadowStr = "progid:DXImageTransform.Microsoft.dropshadow";
var msOffXStr = "OffX=";
var msOffYStr = "OffY=";
var msColorStr = "Color=";

//charset
// var charsetStr = "@charset \"utf-8\"\;";

function parseJSON(str) {
    var cssString = "";

    for (var i in myParentObj) {
        currentObj = myParentObj[i];
        for (var j in currentObj) {
            if (exportFill == true && currentObj[j].Fill != undefined) {
                currentFill = currentObj[j].Fill;
                if (currentFill.FillType == "solid" && currentFill.Color != undefined) {
                    cssString += newLineStr + backgroundStr + "#" + rgbToHex(currentFill.Color.Red, currentFill.Color.Green, currentFill.Color.Blue) + ";";
                    cssString += newLineStr + backgroundStr + rgbaStr + "(" + AdobeRoundNumber(currentFill.Color.Red, 2) + ", " + AdobeRoundNumber(currentFill.Color.Green, 2) + ", " + AdobeRoundNumber(currentFill.Color.Blue, 2) + ", " + AdobeRoundNumber(currentFill.Color.FillOpacity, 2) + ");";
                }

                else if (currentFill.FillType == "gradient") {
                    currentGradient = currentObj[j].Fill.Gradient;
                    cssString += AdobewriteGradient(currentGradient);
                }

                else if (currentFill.FillType == "pattern" && currentFill.Pattern != undefined) {
                    currentPattern = currentObj[j].Fill.Pattern;
                    cssString += newLineStr + backgroundStr + "url(" + currentPattern.url + ");";
                    if (exportMode == "Generate CSS for Panel")
                        cssString += AdobeimageCommentString();
                }
            }

            if (exportStroke == true && currentObj[j].Stroke != undefined) {
                currentStroke = currentObj[j].Stroke;
                if (currentStroke.Type != undefined)
                    cssString += newLineStr + borderStyleStr + currentStroke.Type + ";";

                if (currentStroke.Color != undefined) {
                    cssString += newLineStr + borderColorStr + "#" + rgbToHex(currentStroke.Color.Red, currentStroke.Color.Green, currentStroke.Color.Blue) + ";";
                    cssString += newLineStr + borderColorStr + rgbaStr + "(" + AdobeRoundNumber(currentStroke.Color.Red, 2) + ", " + AdobeRoundNumber(currentStroke.Color.Green, 2) + ", " + AdobeRoundNumber(currentStroke.Color.Blue, 2) + ", " + AdobeRoundNumber(currentStroke.Color.StrokeOpacity, 2) + ");";
                }

                if (currentStroke.Width != undefined)
                    cssString += newLineStr + borderWidthStr + AdobeRoundNumber(currentStroke.Width, 2) + unitString + ";";
            }

            if (currentObj[j].ObjectType != undefined && currentObj[j].ObjectType == "raster") {
                cssString += newLineStr + backgroundImageStr + "url(" + currentObj[j].url + ");";
                if (exportMode == "Generate CSS for Panel")
                    cssString += AdobeimageCommentString();
                cssString += newLineStr + backgroundRepeatStr + noRepeatStr + ";";
            }

            if (exportOpacity == true && currentObj[j].Opacity != undefined)
                cssString += newLineStr + opacityStr + AdobeRoundNumber(currentObj[j].Opacity, 2) + ";";

            if (currentObj[j].Shape != undefined) {
                currentObjShape = currentObj[j].Shape;
                if (exportPosition == true) {
                    cssString += newLineStr + positionStr + absoluteStr + ";";
                    cssString += newLineStr + leftStr + currentObjShape.x + unitString + ";";
                    cssString += newLineStr + topStr + currentObjShape.y + unitString + ";";
                }
                if (exportDimension == true) {
                    cssString += newLineStr + widthStr + currentObjShape.w + unitString + ";";
                    cssString += newLineStr + heightStr + currentObjShape.h + unitString + ";";
                }
            }

            if (currentObj[j].RoundedCorner != undefined)
                cssString += GetRoundedCorners(currentObj[j].RoundedCorner);

            if (currentObj[j].boxShadow != undefined) {
                currObjBoxShadow = currentObj[j].boxShadow;
                cssString += newLineStr + boxShadowStr + AdobeRoundNumber(currObjBoxShadow.HOffset, 2) + unitString + " " + AdobeRoundNumber(currObjBoxShadow.VOffset, 2) + unitString + " " + AdobeRoundNumber(currObjBoxShadow.Blur, 2) + unitString + " ";
                cssString += rgbaStr + "(" + AdobeRoundNumber(currObjBoxShadow.BoxColor.Red, 2) + ", " + AdobeRoundNumber(currObjBoxShadow.BoxColor.Green, 2) + ", " + AdobeRoundNumber(currObjBoxShadow.BoxColor.Blue, 2) + ", " + AdobeRoundNumber(currObjBoxShadow.BoxColor.Opacity, 2) + ");";
            }

            if ((exportVendorPref == true) && msPrefixStr) {
                cssString += msFilterString(currentObj[j]);
            }

            cssString += newLineNoTabStr + "}" + newLineNoTabStr;
        }
    }
                        else if (currentObj[j].CharStlyeName != undefined)
        cssString += AdobeFontStyle(currentObj[j]);
    // }

    // if (((exportMode == "Export Selected Objects") || (exportMode == "Export All Objects")) && cssString.length != 0)
    //     var cssStringExport = charsetStr + newLineStr;
    // else
    //     var cssStringExport = "";

    return cssStringExport += cssString;
}


function AdobewriteGradient(currGradient) {
    var cssString = "";
    var currGradientStopArray = currGradient.GradientStopArray;
    if (currGradient.GradientType != undefined) {
        if (currGradient.GradientType == "linear") {
            if (exportVendorPref == true) {
                var n = currGradientStopArray.length;

                if (mozPrefixStr) {
                    cssString = newLineStr + backgroundStr + mozLinearGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "% " + AdobeRoundNumber(currGradient.GradientAngle, 2) + "deg";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += "," + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";
                }

                if (webkitPrefixStr) {
                    cssString += newLineStr + backgroundStr + webkitLinearGradientStr + "(" + AdobeRoundNumber(currGradient.GradientAngle, 2) + "deg";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";

                    cssString += newLineStr + backgroundStr + webkitGradientStr + "(" + currGradient.GradientType + "," + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "% ," + AdobeRoundNumber(currGradient.EndXPos, 2) + "% " + AdobeRoundNumber(currGradient.EndYPos, 2) + "% ";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ",color-stop(" + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) / 100 + "," + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") )";
                    }
                    cssString += ");";
                }

                if (operaPrefixStr) {
                    cssString += newLineStr + backgroundStr + operaLinearGradientStr + "(" + AdobeRoundNumber(currGradient.GradientAngle, 2) + "deg";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";
                }

                if (msPrefixStr) {
                    cssString += newLineStr + backgroundStr + msLinearGradientStr + "(" + AdobeRoundNumber(currGradient.GradientAngle, 2) + "deg";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";

                    if (currGradientStopArray[0].ColorStop != undefined && currGradientStopArray[0].StopPosition != undefined && currGradientStopArray[n - 1].ColorStop != undefined && currGradientStopArray[n - 1].StopPosition != undefined) {
                        cssString += newLineStr + msFilterStr + "\"" + msGradientStr + "(" + startColorStr + "=\'#" + rgbToHex(currGradientStopArray[0].ColorStop.Red, currGradientStopArray[0].ColorStop.Green, currGradientStopArray[0].ColorStop.Blue) + "\'";
                        cssString += ", " + endColorStr + "=\'#" + rgbToHex(currGradientStopArray[n - 1].ColorStop.Red, currGradientStopArray[n - 1].ColorStop.Green, currGradientStopArray[n - 1].ColorStop.Blue) + "\' ,GradientType=0)\";";
                    }
                }
            }
            currGradientStopArray = currGradient.GradientStopArray;
            cssString += newLineStr + backgroundStr + linearGradientStr + "(" + (90 - AdobeRoundNumber(currGradient.GradientAngle, 2)) + "deg";
            for (var k in currGradientStopArray) {
                if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                    cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
            }
            cssString += ");";
        }
        else {
            if (exportVendorPref == true) {
                if (mozPrefixStr) {
                    cssString = newLineStr + backgroundStr + mozRadialGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + currGradient.RadialGradientType + " " + currGradient.sizeconst;
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";
                }

                if (webkitPrefixStr) {
                    cssString += newLineStr + backgroundStr + webkitRadialGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + currGradient.RadialGradientType + " " + currGradient.sizeconst;
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";

                    cssString += newLineStr + backgroundStr + webkitGradientStr + "(" + currGradient.GradientType + "," + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "% ," + AdobeRoundNumber(currGradient.InnerRadius, 2) + " , " + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + AdobeRoundNumber(currGradient.OuterRadius, 2) + " ";
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ",color-stop(" + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) / 100 + "," + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") )";
                    }
                    cssString += ");";
                }

                if (operaPrefixStr) {
                    cssString += newLineStr + backgroundStr + operaRadialGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + currGradient.RadialGradientType + " " + currGradient.sizeconst;
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";
                }

                if (msPrefixStr) {
                    cssString += newLineStr + backgroundStr + msRadialGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + currGradient.RadialGradientType + " " + currGradient.sizeconst;
                    for (var k in currGradientStopArray) {
                        if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                            cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
                    }
                    cssString += ");";

                    cssString += newLineStr + msFilterStr + "\"" + msAlphaStr + "(Stlye=2);\"";
                }
            }

            currGradientStopArray = currGradient.GradientStopArray;
            cssString += newLineStr + backgroundStr + radialGradientStr + "(" + AdobeRoundNumber(currGradient.StartXPos, 2) + "% " + AdobeRoundNumber(currGradient.StartYPos, 2) + "%, " + currGradient.RadialGradientType + " " + currGradient.sizeconst;
            for (var k in currGradientStopArray) {
                if (currGradientStopArray[k].ColorStop != undefined && currGradientStopArray[k].StopPosition != undefined)
                    cssString += ", " + rgbaStr + "(" + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Red, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Green, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Blue, 2) + ", " + AdobeRoundNumber(currGradientStopArray[k].ColorStop.Opacity, 2) + ") " + AdobeRoundNumber(currGradientStopArray[k].StopPosition, 2) + "%";
            }
            cssString += ");";
        }
    }
    return cssString;
}

function AdobeRoundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}


function msFilterString(currObject) {
    var cssString = "";
    if ((exportOpacity == true && currObject.Opacity != undefined) || (currObject.boxShadow != undefined) || (exportFill == true && currObject.Fill != undefined && currObject.Fill.FillType == "gradient") || (currObject.textOpacity != undefined)) {
        cssString += newLineStr + filterStr;

        if (exportOpacity == true && currObject.Opacity != undefined)
            cssString += alphaStr + "(" + opacityForIEStr + "=" + AdobeRoundNumber(currObject.Opacity, 2) * 100 + ") " + msAlphaStr + "(" + opacityForIEStr + "=" + AdobeRoundNumber(currObject.Opacity, 2) * 100 + ") ";

        if (exportOpacity == true && currObject.textOpacity != undefined)
            cssString += alphaStr + "(" + opacityForIEStr + "=" + AdobeRoundNumber(currObject.textOpacity, 2) * 100 + ") " + msAlphaStr + "(" + opacityForIEStr + "=" + AdobeRoundNumber(currObject.textOpacity, 2) * 100 + ") ";

        if (currObject.boxShadow != undefined) {
            currObjBoxShadow = currObject.boxShadow;
            cssString += msDropShadowStr + "(" + msOffXStr + AdobeRoundNumber(currObjBoxShadow.HOffset, 2) + ", " + msOffYStr + AdobeRoundNumber(currObjBoxShadow.VOffset, 2) + ", " + msColorStr + "\'#" + rgbToHex(currObjBoxShadow.BoxColor.Red, currObjBoxShadow.BoxColor.Green, currObjBoxShadow.BoxColor.Blue) + "\') ";
        }

        if (exportFill == true && currObject.Fill != undefined && currObject.Fill.FillType == "gradient") {
            currentGradient = currObject.Fill.Gradient;
            currGradientStopArray = currentGradient.GradientStopArray;
            var n = currGradientStopArray.length;
            if (currentGradient.GradientType != undefined && currentGradient.GradientType == "linear") {
                if (currGradientStopArray[0].ColorStop != undefined && currGradientStopArray[0].StopPosition != undefined && currGradientStopArray[n - 1].ColorStop != undefined && currGradientStopArray[n - 1].StopPosition != undefined) {
                    if (currentGradient.GradientAngle == -90) {
                        cssString += msGradientStr + "(" + startColorStr + "=\'#" + rgbToHex(currGradientStopArray[0].ColorStop.Red, currGradientStopArray[0].ColorStop.Green, currGradientStopArray[0].ColorStop.Blue) + "\'";
                        cssString += "," + endColorStr + "=\'#" + rgbToHex(currGradientStopArray[n - 1].ColorStop.Red, currGradientStopArray[n - 1].ColorStop.Green, currGradientStopArray[n - 1].ColorStop.Blue) + "\' , GradientType=0)";
                    }
                    else if (currentGradient.GradientAngle == 90) {
                        cssString += msGradientStr + "(" + startColorStr + "=\'#" + rgbToHex(currGradientStopArray[n - 1].ColorStop.Red, currGradientStopArray[n - 1].ColorStop.Green, currGradientStopArray[n - 1].ColorStop.Blue) + "\'";
                        cssString += "," + endColorStr + "=\'#" + rgbToHex(currGradientStopArray[0].ColorStop.Red, currGradientStopArray[0].ColorStop.Green, currGradientStopArray[0].ColorStop.Blue) + "\' , GradientType=0)";
                    }
                    else if (currentGradient.GradientAngle == 180) {
                        cssString += msGradientStr + "(" + startColorStr + "=\'#" + rgbToHex(currGradientStopArray[n - 1].ColorStop.Red, currGradientStopArray[n - 1].ColorStop.Green, currGradientStopArray[n - 1].ColorStop.Blue) + "\'";
                        cssString += "," + endColorStr + "=\'#" + rgbToHex(currGradientStopArray[0].ColorStop.Red, currGradientStopArray[0].ColorStop.Green, currGradientStopArray[0].ColorStop.Blue) + "\' , GradientType=1)";
                    }
                    else {
                        cssString += msGradientStr + "(" + startColorStr + "=\'#" + rgbToHex(currGradientStopArray[0].ColorStop.Red, currGradientStopArray[0].ColorStop.Green, currGradientStopArray[0].ColorStop.Blue) + "\'";
                        cssString += "," + endColorStr + "=\'#" + rgbToHex(currGradientStopArray[n - 1].ColorStop.Red, currGradientStopArray[n - 1].ColorStop.Green, currGradientStopArray[n - 1].ColorStop.Blue) + "\' , GradientType=1)";
                    }
                }
            }
            else if (currentGradient.GradientType != undefined && currentGradient.GradientType == "radial")
                cssString += msAlphaStr + "(Stlye=2)";
        }
        cssString += ";";
    }
    return cssString;
}



function AdobeFontStyle(currentObj) {
    var cssString = "";
    var unitString = GetUnitString();

    if (!checkIfNameIsAnHTMLElement(currentObj.CharStlyeName))
        cssString += ".";
    cssString += currentObj.CharStlyeName;
    cssString += newLineNoTabStr + "{";

    if (currentObj.FontFamily != undefined && currentObj.FontFamily != "")
        cssString += newLineStr + fontFamilyStr + currentObj.FontFamily + ";";

    if (currentObj.FontWeight != undefined && currentObj.FontWeight != "") {
        var n = currentObj.FontWeight.indexOf("Bold");
        if (n != -1)
            cssString += newLineStr + fontWeightStr + boldStr + ";";

        var k = currentObj.FontWeight.indexOf("Italic");
        if (k != -1)
            cssString += newLineStr + fontStyleStr + italicStr + ";";
    }

    if (currentObj.FontSize != undefined && currentObj.FontSize != 0)
        cssString += newLineStr + fontSizeStr + currentObj.FontSize + unitString + ";";

    if (currentObj.Leading != undefined && currentObj.Leading != 0)
        cssString += newLineStr + lineHeightStr + AdobeRoundNumber(currentObj.Leading, 2) + unitString + ";";

    if (currentObj.Tracking != undefined && currentObj.Tracking != 0) {
        if (currentObj.FontSize != undefined && currentObj.FontSize != 0)
            unitConversionFactor = currentObj.FontSize;
        cssString += newLineStr + letterSpacingStr + AdobeRoundNumber(currentObj.Tracking * unitConversionFactor, 2) + unitString + ";";
    }


    if (currentObj.CapSetting != undefined && currentObj.CapSetting != "") {
        if (currentObj.CapSetting == "small-caps")
            cssString += newLineStr + fontVariantStr + currentObj.CapSetting + ";";
        if (currentObj.CapSetting == "uppercase")
            cssString += newLineStr + textTransformStr + currentObj.CapSetting + ";";
    }

    if (currentObj.VerticalAlign != undefined && currentObj.VerticalAlign != "")
        cssString += newLineStr + verticalAlignStr + currentObj.VerticalAlign + ";";

    if (currentObj.BaseLineShiftPosition != undefined && (currentObj.BaseLineShiftTop != 0) || (currentObj.BaseLineShiftTop != -0))
        cssString += newLineStr + positionStr + currentObj.BaseLineShiftPosition + ";";

    if (currentObj.BaseLineShiftTop != undefined && (currentObj.BaseLineShiftTop != 0) || (currentObj.BaseLineShiftTop != -0))
        cssString += newLineStr + topStr + AdobeRoundNumber(currentObj.BaseLineShiftTop, 2) + unitString + ";";

    if (currentObj.FillColor != undefined && currentObj.FillColor.Red != undefined) {
        cssString += newLineStr + textColorStr + "#" + rgbToHex(currentObj.FillColor.Red, currentObj.FillColor.Green, currentObj.FillColor.Blue) + ";";
        cssString += newLineStr + textColorStr + "rgb(" + AdobeRoundNumber(currentObj.FillColor.Red, 2) + ", " + AdobeRoundNumber(currentObj.FillColor.Green, 2) + ", " + AdobeRoundNumber(currentObj.FillColor.Blue, 2) + ");";
    }

    if (currentObj.StrokeColor != undefined && currentObj.StrokeColor.Red != undefined) {
        cssString += newLineStr + textOutlineStr + "#" + rgbToHex(currentObj.StrokeColor.Red, currentObj.StrokeColor.Green, currentObj.StrokeColor.Blue) + ";";
        cssString += newLineStr + textOutlineStr + "rgb(" + AdobeRoundNumber(currentObj.StrokeColor.Red, 2) + ", " + AdobeRoundNumber(currentObj.StrokeColor.Green, 2) + ", " + AdobeRoundNumber(currentObj.StrokeColor.Blue, 2) + ");";
    }

    if (currentObj.Underline != undefined && currentObj.Underline != "" && currentObj.Strike != undefined && currentObj.Strike != "") {
        if (currentObj.Underline == "1" && currentObj.Strike == "1")
            cssString += newLineStr + textDecorationStr + lineThroughStr + " " + underlineStr + ";";
        else if (currentObj.Underline == "0" && currentObj.Strike == "1")
            cssString += newLineStr + textDecorationStr + lineThroughStr + ";";
        else if (currentObj.Underline == "1" && currentObj.Strike == "0")
            cssString += " " + newLineStr + textDecorationStr + underlineStr + ";";
    }
    if (currentObj.textShadow != undefined) {
        currTextShadow = currentObj.textShadow;
        cssString += newLineStr + textShadowStr + AdobeRoundNumber(currTextShadow.HOffset, 2) + unitString + " " + AdobeRoundNumber(currTextShadow.VOffset, 2) + unitString + " " + AdobeRoundNumber(currTextShadow.Blur, 2) + unitString + " ";
        cssString += rgbaStr + "(" + AdobeRoundNumber(currTextShadow.BoxColor.Red, 2) + ", " + AdobeRoundNumber(currTextShadow.BoxColor.Green, 2) + ", " + AdobeRoundNumber(currTextShadow.BoxColor.Blue, 2) + ", " + AdobeRoundNumber(currTextShadow.BoxColor.Opacity, 2) + ");";
    }
    if (currentObj.textOpacity != undefined && exportOpacity == true) {
        cssString += newLineStr + opacityStr + AdobeRoundNumber(currentObj.textOpacity, 2) + ";";
        if ((exportVendorPref == true) && msPrefixStr) {
            cssString += msFilterString(currentObj);
        }
    }
    cssString += newLineNoTabStr + "}" + newLineNoTabStr;

    return cssString;

}

function AdobeimageCommentString() {
    return newLineStr + "/*imageComment*/";
}

