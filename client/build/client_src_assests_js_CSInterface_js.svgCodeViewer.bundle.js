/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksvg_code_viewer"] = self["webpackChunksvg_code_viewer"] || []).push([["client_src_assests_js_CSInterface_js"],{

/***/ "./client/src/assests/js/CSInterface.js":
/*!**********************************************!*\
  !*** ./client/src/assests/js/CSInterface.js ***!
  \**********************************************/
/***/ (() => {

eval("/**************************************************************************************************\r\n*\r\n* ADOBE SYSTEMS INCORPORATED\r\n* Copyright 2013 Adobe Systems Incorporated\r\n* All Rights Reserved.\r\n*\r\n* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the\r\n* terms of the Adobe license agreement accompanying it.  If you have received this file from a\r\n* source other than Adobe, then your use, modification, or distribution of it requires the prior\r\n* written permission of Adobe.\r\n*\r\n**************************************************************************************************/\n\n/** CSInterface - v4.2.0 */\n\n/**\r\n * Stores constants for the window types supported by the CSXS infrastructure.\r\n */\nfunction CSXSWindowType() {}\n\n;\n/** Constant for the CSXS window type Panel. */\n\nCSXSWindowType._PANEL = \"Panel\";\n/** Constant for the CSXS window type Modeless. */\n\nCSXSWindowType._MODELESS = \"Modeless\";\n/** Constant for the CSXS window type ModalDialog. */\n\nCSXSWindowType._MODAL_DIALOG = \"ModalDialog\";\n/** EvalScript error message */\n\nEvalScript_ErrMessage = \"EvalScript error.\";\n/**\r\n * @class Version\r\n * Defines a version number with major, minor, micro, and special\r\n * components. The major, minor and micro values are numeric; the special\r\n * value can be any string.\r\n *\r\n * @param major   The major version component, a positive integer up to nine digits long.\r\n * @param minor   The minor version component, a positive integer up to nine digits long.\r\n * @param micro   The micro version component, a positive integer up to nine digits long.\r\n * @param special The special version component, an arbitrary string.\r\n *\r\n * @return A new \\c Version object.\r\n */\n\nfunction Version(major, minor, micro, special) {\n  this.major = major;\n  this.minor = minor;\n  this.micro = micro;\n  this.special = special;\n}\n\n;\n/**\r\n * The maximum value allowed for a numeric version component.\r\n * This reflects the maximum value allowed in PlugPlug and the manifest schema.\r\n */\n\nVersion.MAX_NUM = 999999999;\n/**\r\n * @class VersionBound\r\n * Defines a boundary for a version range, which associates a \\c Version object\r\n * with a flag for whether it is an inclusive or exclusive boundary.\r\n *\r\n * @param version   The \\c #Version object.\r\n * @param inclusive True if this boundary is inclusive, false if it is exclusive.\r\n *\r\n * @return A new \\c VersionBound object.\r\n */\n\nfunction VersionBound(version, inclusive) {\n  this.version = version;\n  this.inclusive = inclusive;\n}\n\n;\n/**\r\n * @class VersionRange\r\n * Defines a range of versions using a lower boundary and optional upper boundary.\r\n *\r\n * @param lowerBound The \\c #VersionBound object.\r\n * @param upperBound The \\c #VersionBound object, or null for a range with no upper boundary.\r\n *\r\n * @return A new \\c VersionRange object.\r\n */\n\nfunction VersionRange(lowerBound, upperBound) {\n  this.lowerBound = lowerBound;\n  this.upperBound = upperBound;\n}\n\n;\n/**\r\n * @class Runtime\r\n * Represents a runtime related to the CEP infrastructure.\r\n * Extensions can declare dependencies on particular\r\n * CEP runtime versions in the extension manifest.\r\n *\r\n * @param name    The runtime name.\r\n * @param version A \\c #VersionRange object that defines a range of valid versions.\r\n *\r\n * @return A new \\c Runtime object.\r\n */\n\nfunction Runtime(name, versionRange) {\n  this.name = name;\n  this.versionRange = versionRange;\n}\n\n;\n/**\r\n* @class Extension\r\n* Encapsulates a CEP-based extension to an Adobe application.\r\n*\r\n* @param id              The unique identifier of this extension.\r\n* @param name            The localizable display name of this extension.\r\n* @param mainPath        The path of the \"index.html\" file.\r\n* @param basePath        The base path of this extension.\r\n* @param windowType          The window type of the main window of this extension.\r\n                 Valid values are defined by \\c #CSXSWindowType.\r\n* @param width           The default width in pixels of the main window of this extension.\r\n* @param height          The default height in pixels of the main window of this extension.\r\n* @param minWidth        The minimum width in pixels of the main window of this extension.\r\n* @param minHeight       The minimum height in pixels of the main window of this extension.\r\n* @param maxWidth        The maximum width in pixels of the main window of this extension.\r\n* @param maxHeight       The maximum height in pixels of the main window of this extension.\r\n* @param defaultExtensionDataXml The extension data contained in the default \\c ExtensionDispatchInfo section of the extension manifest.\r\n* @param specialExtensionDataXml The extension data contained in the application-specific \\c ExtensionDispatchInfo section of the extension manifest.\r\n* @param requiredRuntimeList     An array of \\c Runtime objects for runtimes required by this extension.\r\n* @param isAutoVisible       True if this extension is visible on loading.\r\n* @param isPluginExtension   True if this extension has been deployed in the Plugins folder of the host application.\r\n*\r\n* @return A new \\c Extension object.\r\n*/\n\nfunction Extension(id, name, mainPath, basePath, windowType, width, height, minWidth, minHeight, maxWidth, maxHeight, defaultExtensionDataXml, specialExtensionDataXml, requiredRuntimeList, isAutoVisible, isPluginExtension) {\n  this.id = id;\n  this.name = name;\n  this.mainPath = mainPath;\n  this.basePath = basePath;\n  this.windowType = windowType;\n  this.width = width;\n  this.height = height;\n  this.minWidth = minWidth;\n  this.minHeight = minHeight;\n  this.maxWidth = maxWidth;\n  this.maxHeight = maxHeight;\n  this.defaultExtensionDataXml = defaultExtensionDataXml;\n  this.specialExtensionDataXml = specialExtensionDataXml;\n  this.requiredRuntimeList = requiredRuntimeList;\n  this.isAutoVisible = isAutoVisible;\n  this.isPluginExtension = isPluginExtension;\n}\n\n;\n/**\r\n * @class CSEvent\r\n * A standard JavaScript event, the base class for CEP events.\r\n *\r\n * @param type        The name of the event type.\r\n * @param scope       The scope of event, can be \"GLOBAL\" or \"APPLICATION\".\r\n * @param appId       The unique identifier of the application that generated the event.\r\n * @param extensionId     The unique identifier of the extension that generated the event.\r\n *\r\n * @return A new \\c CSEvent object\r\n */\n\nfunction CSEvent(type, scope, appId, extensionId) {\n  this.type = type;\n  this.scope = scope;\n  this.appId = appId;\n  this.extensionId = extensionId;\n}\n\n;\n/** Event-specific data. */\n\nCSEvent.prototype.data = \"\";\n/**\r\n * @class SystemPath\r\n * Stores operating-system-specific location constants for use in the\r\n * \\c #CSInterface.getSystemPath() method.\r\n * @return A new \\c SystemPath object.\r\n */\n\nfunction SystemPath() {}\n\n;\n/** The path to user data.  */\n\nSystemPath.USER_DATA = \"userData\";\n/** The path to common files for Adobe applications.  */\n\nSystemPath.COMMON_FILES = \"commonFiles\";\n/** The path to the user's default document folder.  */\n\nSystemPath.MY_DOCUMENTS = \"myDocuments\";\n/** @deprecated. Use \\c #SystemPath.Extension.  */\n\nSystemPath.APPLICATION = \"application\";\n/** The path to current extension.  */\n\nSystemPath.EXTENSION = \"extension\";\n/** The path to hosting application's executable.  */\n\nSystemPath.HOST_APPLICATION = \"hostApplication\";\n/**\r\n * @class ColorType\r\n * Stores color-type constants.\r\n */\n\nfunction ColorType() {}\n\n;\n/** RGB color type. */\n\nColorType.RGB = \"rgb\";\n/** Gradient color type. */\n\nColorType.GRADIENT = \"gradient\";\n/** Null color type. */\n\nColorType.NONE = \"none\";\n/**\r\n * @class RGBColor\r\n * Stores an RGB color with red, green, blue, and alpha values.\r\n * All values are in the range [0.0 to 255.0]. Invalid numeric values are\r\n * converted to numbers within this range.\r\n *\r\n * @param red   The red value, in the range [0.0 to 255.0].\r\n * @param green The green value, in the range [0.0 to 255.0].\r\n * @param blue  The blue value, in the range [0.0 to 255.0].\r\n * @param alpha The alpha (transparency) value, in the range [0.0 to 255.0].\r\n *      The default, 255.0, means that the color is fully opaque.\r\n *\r\n * @return A new RGBColor object.\r\n */\n\nfunction RGBColor(red, green, blue, alpha) {\n  this.red = red;\n  this.green = green;\n  this.blue = blue;\n  this.alpha = alpha;\n}\n\n;\n/**\r\n * @class Direction\r\n * A point value  in which the y component is 0 and the x component\r\n * is positive or negative for a right or left direction,\r\n * or the x component is 0 and the y component is positive or negative for\r\n * an up or down direction.\r\n *\r\n * @param x     The horizontal component of the point.\r\n * @param y     The vertical component of the point.\r\n *\r\n * @return A new \\c Direction object.\r\n */\n\nfunction Direction(x, y) {\n  this.x = x;\n  this.y = y;\n}\n\n;\n/**\r\n * @class GradientStop\r\n * Stores gradient stop information.\r\n *\r\n * @param offset   The offset of the gradient stop, in the range [0.0 to 1.0].\r\n * @param rgbColor The color of the gradient at this point, an \\c #RGBColor object.\r\n *\r\n * @return GradientStop object.\r\n */\n\nfunction GradientStop(offset, rgbColor) {\n  this.offset = offset;\n  this.rgbColor = rgbColor;\n}\n\n;\n/**\r\n * @class GradientColor\r\n * Stores gradient color information.\r\n *\r\n * @param type          The gradient type, must be \"linear\".\r\n * @param direction     A \\c #Direction object for the direction of the gradient\r\n                (up, down, right, or left).\r\n * @param numStops          The number of stops in the gradient.\r\n * @param gradientStopList  An array of \\c #GradientStop objects.\r\n *\r\n * @return A new \\c GradientColor object.\r\n */\n\nfunction GradientColor(type, direction, numStops, arrGradientStop) {\n  this.type = type;\n  this.direction = direction;\n  this.numStops = numStops;\n  this.arrGradientStop = arrGradientStop;\n}\n\n;\n/**\r\n * @class UIColor\r\n * Stores color information, including the type, anti-alias level, and specific color\r\n * values in a color object of an appropriate type.\r\n *\r\n * @param type          The color type, 1 for \"rgb\" and 2 for \"gradient\".\r\n                The supplied color object must correspond to this type.\r\n * @param antialiasLevel    The anti-alias level constant.\r\n * @param color         A \\c #RGBColor or \\c #GradientColor object containing specific color information.\r\n *\r\n * @return A new \\c UIColor object.\r\n */\n\nfunction UIColor(type, antialiasLevel, color) {\n  this.type = type;\n  this.antialiasLevel = antialiasLevel;\n  this.color = color;\n}\n\n;\n/**\r\n * @class AppSkinInfo\r\n * Stores window-skin properties, such as color and font. All color parameter values are \\c #UIColor objects except that systemHighlightColor is \\c #RGBColor object.\r\n *\r\n * @param baseFontFamily        The base font family of the application.\r\n * @param baseFontSize          The base font size of the application.\r\n * @param appBarBackgroundColor     The application bar background color.\r\n * @param panelBackgroundColor      The background color of the extension panel.\r\n * @param appBarBackgroundColorSRGB     The application bar background color, as sRGB.\r\n * @param panelBackgroundColorSRGB      The background color of the extension panel, as sRGB.\r\n * @param systemHighlightColor          The operating-system highlight color, as sRGB.\r\n *\r\n * @return AppSkinInfo object.\r\n */\n\nfunction AppSkinInfo(baseFontFamily, baseFontSize, appBarBackgroundColor, panelBackgroundColor, appBarBackgroundColorSRGB, panelBackgroundColorSRGB, systemHighlightColor) {\n  this.baseFontFamily = baseFontFamily;\n  this.baseFontSize = baseFontSize;\n  this.appBarBackgroundColor = appBarBackgroundColor;\n  this.panelBackgroundColor = panelBackgroundColor;\n  this.appBarBackgroundColorSRGB = appBarBackgroundColorSRGB;\n  this.panelBackgroundColorSRGB = panelBackgroundColorSRGB;\n  this.systemHighlightColor = systemHighlightColor;\n}\n\n;\n/**\r\n * @class HostEnvironment\r\n * Stores information about the environment in which the extension is loaded.\r\n *\r\n * @param appName   The application's name.\r\n * @param appVersion    The application's version.\r\n * @param appLocale The application's current license locale.\r\n * @param appUILocale   The application's current UI locale.\r\n * @param appId     The application's unique identifier.\r\n * @param isAppOnline  True if the application is currently online.\r\n * @param appSkinInfo   An \\c #AppSkinInfo object containing the application's default color and font styles.\r\n *\r\n * @return A new \\c HostEnvironment object.\r\n */\n\nfunction HostEnvironment(appName, appVersion, appLocale, appUILocale, appId, isAppOnline, appSkinInfo) {\n  this.appName = appName;\n  this.appVersion = appVersion;\n  this.appLocale = appLocale;\n  this.appUILocale = appUILocale;\n  this.appId = appId;\n  this.isAppOnline = isAppOnline;\n  this.appSkinInfo = appSkinInfo;\n}\n\n;\n/**\r\n * @class HostCapabilities\r\n * Stores information about the host capabilities.\r\n *\r\n * @param EXTENDED_PANEL_MENU True if the application supports panel menu.\r\n * @param EXTENDED_PANEL_ICONS True if the application supports panel icon.\r\n * @param DELEGATE_APE_ENGINE True if the application supports delegated APE engine.\r\n * @param SUPPORT_HTML_EXTENSIONS True if the application supports HTML extensions.\r\n *\r\n * @return A new \\c HostCapabilities object.\r\n */\n\nfunction HostCapabilities(EXTENDED_PANEL_MENU, EXTENDED_PANEL_ICONS, DELEGATE_APE_ENGINE, SUPPORT_HTML_EXTENSIONS) {\n  this.EXTENDED_PANEL_MENU = EXTENDED_PANEL_MENU;\n  this.EXTENDED_PANEL_ICONS = EXTENDED_PANEL_ICONS;\n  this.DELEGATE_APE_ENGINE = DELEGATE_APE_ENGINE;\n  this.SUPPORT_HTML_EXTENSIONS = SUPPORT_HTML_EXTENSIONS;\n}\n\n;\n/**\r\n * @class ApiVersion\r\n * Stores current api version.\r\n *\r\n * Since 4.2.0\r\n *\r\n * @param major  The major version\r\n * @param minor  The minor version.\r\n * @param micro  The micro version.\r\n *\r\n * @return ApiVersion object.\r\n */\n\nfunction ApiVersion(major, minor, micro) {\n  this.major = major;\n  this.minor = minor;\n  this.micro = micro;\n}\n\n; //------------------------------ CSInterface ----------------------------------\n\n/**\r\n * @class CSInterface\r\n * This is the entry point to the CEP extensibility infrastructure.\r\n * Instantiate this object and use it to:\r\n * <ul>\r\n * <li>Access information about the host application in which an extension is running</li>\r\n * <li>Launch an extension</li>\r\n * <li>Register interest in event notifications, and dispatch events</li>\r\n * </ul>\r\n *\r\n * @return A new \\c CSInterface object\r\n */\n\nfunction CSInterface() {}\n\n;\n/**\r\n * User can add this event listener to handle native application theme color changes.\r\n * Callback function gives extensions ability to fine-tune their theme color after the\r\n * global theme color has been changed.\r\n * The callback function should be like below:\r\n *\r\n * @example\r\n * // event is a CSEvent object, but user can ignore it.\r\n * function OnAppThemeColorChanged(event)\r\n * {\r\n *    // Should get a latest HostEnvironment object from application.\r\n *    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;\r\n *    // Gets the style information such as color info from the skinInfo,\r\n *    // and redraw all UI controls of your extension according to the style info.\r\n * }\r\n */\n\nCSInterface.THEME_COLOR_CHANGED_EVENT = \"com.adobe.csxs.events.ThemeColorChanged\";\n/** The host environment data object. */\n\nCSInterface.prototype.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());\n/** Retrieves information about the host environment in which the\r\n *  extension is currently running.\r\n *\r\n *   @return A \\c #HostEnvironment object.\r\n */\n\nCSInterface.prototype.getHostEnvironment = function () {\n  this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());\n  return this.hostEnvironment;\n};\n/** Closes this extension. */\n\n\nCSInterface.prototype.closeExtension = function () {\n  window.__adobe_cep__.closeExtension();\n};\n/**\r\n * Retrieves a path for which a constant is defined in the system.\r\n *\r\n * @param pathType The path-type constant defined in \\c #SystemPath ,\r\n *\r\n * @return The platform-specific system path string.\r\n */\n\n\nCSInterface.prototype.getSystemPath = function (pathType) {\n  var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));\n  var OSVersion = this.getOSInformation();\n\n  if (OSVersion.indexOf(\"Windows\") >= 0) {\n    path = path.replace(\"file:///\", \"\");\n  } else if (OSVersion.indexOf(\"Mac\") >= 0) {\n    path = path.replace(\"file://\", \"\");\n  }\n\n  return path;\n};\n/**\r\n * Evaluates a JavaScript script, which can use the JavaScript DOM\r\n * of the host application.\r\n *\r\n * @param script    The JavaScript script.\r\n * @param callback  Optional. A callback function that receives the result of execution.\r\n *          If execution fails, the callback function receives the error message \\c EvalScript_ErrMessage.\r\n */\n\n\nCSInterface.prototype.evalScript = function (script, callback) {\n  if (callback == null || callback == undefined) {\n    callback = function callback(result) {};\n  }\n\n  window.__adobe_cep__.evalScript(script, callback);\n};\n/**\r\n * Retrieves the unique identifier of the application.\r\n * in which the extension is currently running.\r\n *\r\n * @return The unique ID string.\r\n */\n\n\nCSInterface.prototype.getApplicationID = function () {\n  var appId = this.hostEnvironment.appId;\n  return appId;\n};\n/**\r\n * Retrieves host capability information for the application\r\n * in which the extension is currently running.\r\n *\r\n * @return A \\c #HostCapabilities object.\r\n */\n\n\nCSInterface.prototype.getHostCapabilities = function () {\n  var hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());\n  return hostCapabilities;\n};\n/**\r\n * Triggers a CEP event programmatically. Yoy can use it to dispatch\r\n * an event of a predefined type, or of a type you have defined.\r\n *\r\n * @param event A \\c CSEvent object.\r\n */\n\n\nCSInterface.prototype.dispatchEvent = function (event) {\n  if (typeof event.data == \"object\") {\n    event.data = JSON.stringify(event.data);\n  }\n\n  window.__adobe_cep__.dispatchEvent(event);\n};\n/**\r\n * Registers an interest in a CEP event of a particular type, and\r\n * assigns an event handler.\r\n * The event infrastructure notifies your extension when events of this type occur,\r\n * passing the event object to the registered handler function.\r\n *\r\n * @param type     The name of the event type of interest.\r\n * @param listener The JavaScript handler function or method.\r\n * @param obj      Optional, the object containing the handler method, if any.\r\n *         Default is null.\r\n */\n\n\nCSInterface.prototype.addEventListener = function (type, listener, obj) {\n  window.__adobe_cep__.addEventListener(type, listener, obj);\n};\n/**\r\n * Removes a registered event listener.\r\n *\r\n * @param type      The name of the event type of interest.\r\n * @param listener  The JavaScript handler function or method that was registered.\r\n * @param obj       Optional, the object containing the handler method, if any.\r\n *          Default is null.\r\n */\n\n\nCSInterface.prototype.removeEventListener = function (type, listener, obj) {\n  window.__adobe_cep__.removeEventListener(type, listener, obj);\n};\n/**\r\n * Loads and launches another extension, or activates the extension if it is already loaded.\r\n *\r\n * @param extensionId       The extension's unique identifier.\r\n * @param startupParams     Not currently used, pass \"\".\r\n *\r\n * @example\r\n * To launch the extension \"help\" with ID \"HLP\" from this extension, call:\r\n * <code>requestOpenExtension(\"HLP\", \"\"); </code>\r\n *\r\n */\n\n\nCSInterface.prototype.requestOpenExtension = function (extensionId, params) {\n  window.__adobe_cep__.requestOpenExtension(extensionId, params);\n};\n/**\r\n * Retrieves the list of extensions currently loaded in the current host application.\r\n * The extension list is initialized once, and remains the same during the lifetime\r\n * of the CEP session.\r\n *\r\n * @param extensionIds  Optional, an array of unique identifiers for extensions of interest.\r\n *          If omitted, retrieves data for all extensions.\r\n *\r\n * @return Zero or more \\c #Extension objects.\r\n */\n\n\nCSInterface.prototype.getExtensions = function (extensionIds) {\n  var extensionIdsStr = JSON.stringify(extensionIds);\n\n  var extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr);\n\n  var extensions = JSON.parse(extensionsStr);\n  return extensions;\n};\n/**\r\n * Retrieves network-related preferences.\r\n *\r\n * @return A JavaScript object containing network preferences.\r\n */\n\n\nCSInterface.prototype.getNetworkPreferences = function () {\n  var result = window.__adobe_cep__.getNetworkPreferences();\n\n  var networkPre = JSON.parse(result);\n  return networkPre;\n};\n/**\r\n * Initializes the resource bundle for this extension with property values\r\n * for the current application and locale.\r\n * To support multiple locales, you must define a property file for each locale,\r\n * containing keyed display-string values for that locale.\r\n * See localization documentation for Extension Builder and related products.\r\n *\r\n * Keys can be in the\r\n * form <code>key.value=\"localized string\"</code>, for use in HTML text elements.\r\n * For example, in this input element, the localized \\c key.value string is displayed\r\n * instead of the empty \\c value string:\r\n *\r\n * <code><input type=\"submit\" value=\"\" data-locale=\"key\"/></code>\r\n *\r\n * @return An object containing the resource bundle information.\r\n */\n\n\nCSInterface.prototype.initResourceBundle = function () {\n  var resourceBundle = JSON.parse(window.__adobe_cep__.initResourceBundle());\n  var resElms = document.querySelectorAll('[data-locale]');\n\n  for (var n = 0; n < resElms.length; n++) {\n    var resEl = resElms[n]; // Get the resource key from the element.\n\n    var resKey = resEl.getAttribute('data-locale');\n\n    if (resKey) {\n      // Get all the resources that start with the key.\n      for (var key in resourceBundle) {\n        if (key.indexOf(resKey) == 0) {\n          var resValue = resourceBundle[key];\n\n          if (key.indexOf('.') == -1) {\n            // No dot notation in resource key,\n            // assign the resource value to the element's\n            // innerHTML.\n            resEl.innerHTML = resValue;\n          } else {\n            // Dot notation in resource key, assign the\n            // resource value to the element's property\n            // whose name corresponds to the substring\n            // after the dot.\n            var attrKey = key.substring(key.indexOf('.') + 1);\n            resEl[attrKey] = resValue;\n          }\n        }\n      }\n    }\n  }\n\n  return resourceBundle;\n};\n/**\r\n * Writes installation information to a file.\r\n *\r\n * @return The file path.\r\n */\n\n\nCSInterface.prototype.dumpInstallationInfo = function () {\n  return window.__adobe_cep__.dumpInstallationInfo();\n};\n/**\r\n * Retrieves version information for the current Operating System,\r\n * See http://www.useragentstring.com/pages/Chrome/ for Chrome \\c navigator.userAgent values.\r\n *\r\n * @return A string containing the OS version, or \"unknown Operation System\".\r\n */\n\n\nCSInterface.prototype.getOSInformation = function () {\n  var userAgent = navigator.userAgent;\n\n  if (navigator.platform == \"Win32\" || navigator.platform == \"Windows\") {\n    var winVersion = \"Windows platform\";\n\n    if (userAgent.indexOf(\"Windows NT 5.0\") > -1) {\n      winVersion = \"Windows 2000\";\n    } else if (userAgent.indexOf(\"Windows NT 5.1\") > -1) {\n      winVersion = \"Windows XP\";\n    } else if (userAgent.indexOf(\"Windows NT 5.2\") > -1) {\n      winVersion = \"Windows Server 2003\";\n    } else if (userAgent.indexOf(\"Windows NT 6.0\") > -1) {\n      winVersion = \"Windows Vista\";\n    } else if (userAgent.indexOf(\"Windows NT 6.1\") > -1) {\n      winVersion = \"Windows 7\";\n    } else if (userAgent.indexOf(\"Windows NT 6.2\") > -1) {\n      winVersion = \"Windows 8\";\n    }\n\n    var winBit = \"32-bit\";\n\n    if (userAgent.indexOf(\"WOW64\") > -1) {\n      winBit = \"64-bit\";\n    }\n\n    return winVersion + \" \" + winBit;\n  } else if (navigator.platform == \"MacIntel\" || navigator.platform == \"Macintosh\") {\n    var agentStr = new String();\n    agentStr = userAgent;\n    var verLength = agentStr.indexOf(\")\") - agentStr.indexOf(\"Mac OS X\");\n    var verStr = agentStr.substr(agentStr.indexOf(\"Mac OS X\"), verLength);\n    var result = verStr.replace(\"_\", \".\");\n    result = result.replace(\"_\", \".\");\n    return result;\n  }\n\n  return \"Unknown Operation System\";\n};\n/**\r\n * Opens a page in the default system browser.\r\n *\r\n * @param url   The URL of the page to open. Must use HTTP or HTTPS protocol.\r\n *\r\n * @return One of these error codes:\\n\r\n *      <ul>\\n\r\n *          <li>NO_ERROR - 0</li>\\n\r\n *          <li>ERR_UNKNOWN - 1</li>\\n\r\n *          <li>ERR_INVALID_PARAMS - 2</li>\\n\r\n *          <li>ERR_INVALID_URL - 201</li>\\n\r\n *      </ul>\\n\r\n */\n\n\nCSInterface.prototype.openURLInDefaultBrowser = function (url) {\n  return cep.util.openURLInDefaultBrowser(url);\n};\n/**\r\n * Retrieves extension ID.\r\n *\r\n * Since 4.2.0\r\n *\r\n * @return extension ID.\r\n */\n\n\nCSInterface.prototype.getExtensionID = function () {\n  return window.__adobe_cep__.getExtensionId();\n};\n/**\r\n * Retrieves scale factor of screen. This only works on Mac.\r\n *\r\n * Since 4.2.0\r\n *\r\n * @return One of the following integer.\r\n *      <ul>\\n\r\n *          <li>-1 means fail to get scale factor or this API has not been available on Windows yet</li>\\n\r\n *          <li>1 means normal screen</li>\\n\r\n *          <li>2 means HiDPI screen</li>\\n\r\n *      </ul>\\n\r\n */\n\n\nCSInterface.prototype.getScaleFactor = function () {\n  return window.__adobe_cep__.getScaleFactor();\n};\n/**\r\n * Set a handler to detect any changes of scale factor. This only works on Mac.\r\n *\r\n * Since 4.2.0\r\n *\r\n * @param handler   The function to be called when scale factor is changed.\r\n *\r\n */\n\n\nCSInterface.prototype.setScaleFactorChangedHandler = function (handler) {\n  window.__adobe_cep__.setScaleFactorChangedHandler(handler);\n};\n/**\r\n * Retrieves current API version.\r\n *\r\n * Since 4.2.0\r\n *\r\n * @return ApiVersion object.\r\n *\r\n */\n\n\nCSInterface.prototype.getCurrentApiVersion = function () {\n  var apiVersion = JSON.parse(window.__adobe_cep__.getCurrentApiVersion());\n  return apiVersion;\n};\n\n//# sourceURL=webpack://svg-code-viewer/./client/src/assests/js/CSInterface.js?");

/***/ })

}]);