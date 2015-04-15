module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var prefix = (function () {
	  var styles = window.getComputedStyle(document.documentElement, ""),
	      pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles.OLink === "" && ["", "o"])[1];
	  return {
	    dom: pre === "ms" ? "MS" : pre,
	    lowercase: pre,
	    css: "-" + pre + "-",
	    js: pre === "ms" ? pre : pre[0].toUpperCase() + pre.substr(1)
	  };
	})();

	var vendorSpecificProperties = ["animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "appearance", "backfaceVisibility", "backgroundClip", "borderImage", "borderImageSlice", "boxSizing", "boxShadow", "contentColumns", "transform", "transformOrigin", "transformStyle", "transition", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "perspective", "perspectiveOrigin", "userSelect"];

	function prefixName(name) {
	  return prefix.js + name[0].toUpperCase() + name.substr(1);
	}

	function prefixStyle(properties) {
	  return Object.keys(properties).reduce(function (previous, property) {
	    if (vendorSpecificProperties.indexOf(property) !== -1) {
	      previous[prefixName(property)] = properties[property];
	    } else {
	      previous[property] = properties[property];
	    }

	    return previous;
	  }, {});
	}

	function flexbox(properties) {
	  var ua = navigator.userAgent.toLowerCase();

	  // polyfill for safari
	  if ((ua.indexOf("safari") !== -1 || ua.indexOf("iphone os") !== -1) && ua.indexOf("chrome") === -1) {
	    (function () {
	      var rename = function (obj, from, to) {
	        if (obj[from] !== undefined && obj[from] !== null) {
	          obj[to] = obj[from];
	          delete obj[from];
	        }
	      };

	      if (properties.display === "flex") {
	        properties.display = "-webkit-flex";
	      }

	      ["alignItems", "justifyContent", "flexDirection", "flex", "flexWrap"].forEach(function (prop) {
	        rename(properties, prop, prefixName(prop));
	      });
	      // polyfil for IE10
	    })();
	  } else if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
	    if (properties.display === "flex") {
	      properties.display = "-ms-flexbox";
	    }

	    // @TODO: implement 2012 flexbox syntax
	  }


	  return properties;
	}

	function prefixStyles(styles) {
	  return Object.keys(styles).reduce(function (previous, current) {
	    previous[current] = flexbox(prefixStyle(styles[current]));
	    return previous;
	  }, {});
	};

	exports.prefix = prefixStyles;

	/*
	 * var styles = VendorPrefix.prefix({
	 *  animation: '0.25 ease',
	 * });
	 */

/***/ }
/******/ ]);