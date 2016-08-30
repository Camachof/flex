/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lSystem = __webpack_require__(1);
	var Constants = __webpack_require__(3);
	
	var currentSystem = new lSystem(Constants.hilbert);
	
	var toolbar2 = document.getElementById('curveToolbar');
	var range = document.getElementById('inputRange');
	var angleRange = document.getElementById('angle');
	
	range.addEventListener("input", function (e) {
	  angleRange.value = e.target.value;
	});
	
	range.addEventListener('mousedown', function () {
	  toolbar2.setAttribute("draggable", false);
	});
	range.addEventListener('mouseup', function () {
	  toolbar2.setAttribute("draggable", true);
	});
	
	function dragstartHandler(e) {
	  var style = window.getComputedStyle(e.target, null);
	
	  var xPos = parseInt(style.getPropertyValue('left'), 10) - e.clientX;
	  var yPos = parseInt(style.getPropertyValue('top'), 10) - e.clientY;
	
	  e.dataTransfer.setData('text/plain', xPos + ',' + yPos);
	}
	
	function dropHandler(e) {
	  e.preventDefault();
	
	  var offset = e.dataTransfer.getData('text/plain').split(',');
	  var toolbar = document.getElementById('curveToolbar');
	
	  toolbar.style.left = e.clientX + parseInt(offset[0], 10) + 'px';
	  toolbar.style.top = e.clientY + parseInt(offset[1], 10) + 'px';
	
	  return false;
	}
	
	function dragoverHandler(e) {
	  e.preventDefault();
	}
	
	var toolbar = document.getElementById('curveToolbar');
	
	toolbar.addEventListener('dragstart', dragstartHandler);
	document.body.addEventListener('dragover', dragoverHandler);
	document.body.addEventListener('drop', dropHandler);
	
	var form = document.getElementById('customForm');
	var currentCurve = void 0;
	var curveName = void 0;
	
	form.addEventListener("submit", function (e) {
	  e.preventDefault();
	  removeWarning();
	
	  var angle = $('#angle').val();
	  var iterations = $('#iterations').val();
	  var speed = document.getElementById('dropdown').value;
	
	  if (parseInt(iterations) > 8) {
	    addWarning();
	  } else {
	    var userCurve = { angle: angle, iterations: iterations, speed: speed };
	    var mergedInputs = Object.assign(currentCurve, userCurve);
	
	    currentSystem.timeoutKeys.forEach(function (key) {
	      clearTimeout(key);
	    });
	
	    currentSystem = new lSystem(mergedInputs);
	  }
	});
	
	var buttons = document.getElementById('curveButtons');
	
	buttons.addEventListener("click", function (e) {
	  e.preventDefault();
	  removeWarning();
	
	  curveName = e.target.id;
	  var curve = Constants[e.target.id];
	
	  currentSystem.timeoutKeys.forEach(function (key) {
	    clearTimeout(key);
	  });
	
	  currentSystem = new lSystem(curve);
	
	  $('#angle').val(curve.angle);
	  $('#iterations').val(curve.iterations);
	  $('#inputRange').val(curve.angle);
	
	  currentCurve = Object.assign({}, curve);
	});
	
	var iterationButtons = document.getElementById('buttons');
	
	iterationButtons.addEventListener("click", function (e) {
	  e.preventDefault();
	  removeWarning();
	
	  var iterations = parseInt($('#iterations').val());
	  e.target.id === "arrow-down" ? iterations -= 1 : iterations += 1;
	
	  if (iterations > 0 && iterations < 9 && curveName !== "koch") {
	    $('#iterations').val(iterations);
	  } else if (iterations > 0 && iterations < 5 && curveName === "koch") {
	    $('#iterations').val(iterations);
	  } else if (document.getElementById('warning') === null) {
	    addWarning();
	  }
	});
	
	function addWarning() {
	  var boundsSign = document.createElement('p');
	  boundsSign.id = "warning";
	
	  var textSign = void 0;
	
	  if (curveName !== "koch") {
	    textSign = document.createTextNode('Between 1 and 8!');
	  } else {
	    textSign = document.createTextNode('Between 1 and 4!');
	  }
	  boundsSign.appendChild(textSign);
	
	  document.getElementsByClassName('iterationParent')[0].appendChild(boundsSign);
	}
	
	function removeWarning() {
	  var toRemove = document.getElementById('warning');
	  if (toRemove) {
	    var trial = document.getElementsByClassName('iterationParent');
	    trial[0].removeChild(toRemove);
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(2);
	var Constants = __webpack_require__(3);
	
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth - 5;
	canvas.height = window.innerHeight - 5;
	var ctx = canvas.getContext("2d");
	
	var lSystem = function () {
	  function lSystem(options) {
	    _classCallCheck(this, lSystem);
	
	    this.timeoutKeys = [];
	
	    this.variables = options.variables;
	    this.constants = options.constants;
	    this.state = options.axiom;
	    this.rules = options.rules;
	    this.angleChange = Util.degreesToRadian(options.angle);
	    this.iterations = options.iterations;
	    this.offset = options.offset;
	    this.speed = Util.calculateDelay(options.speed, this.iterations);
	
	    this.currentAngle = 0;
	
	    if (options.customStart) {
	      this.x = canvas.width / 1.7;
	      this.y = canvas.height / 2;
	    } else {
	      this.x = canvas.width / 2.1;
	      this.y = canvas.height - canvas.height / 6;
	    }
	
	    this.execute();
	  }
	
	  _createClass(lSystem, [{
	    key: 'execute',
	    value: function execute() {
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	      Util.degreesToRadian(this.angle);
	      this.deriveResult();
	      this.draw();
	    }
	  }, {
	    key: 'deriveResult',
	    value: function deriveResult() {
	      var parser = Util.alphabetParser(this.variables);
	
	      for (var i = 0; i < this.iterations; i++) {
	        this.setInstructions(parser);
	      }
	    }
	  }, {
	    key: 'setInstructions',
	    value: function setInstructions(parser) {
	      var _this = this;
	
	      this.state = this.state.replace(new RegExp(parser, 'gi'), function (match) {
	        return _this.rules[match];
	      });
	    }
	  }, {
	    key: 'angles',
	    value: function angles() {
	
	      var offset = Util.offsetCalc(this.offset, this.iterations);
	
	      if (this.iterations == 1) {
	        this.x += Math.round(Math.cos(this.currentAngle) * canvas.height / 5);
	
	        this.y += Math.round(Math.sin(this.currentAngle) * canvas.height / 5);
	      } else {
	        this.x += Math.round(Math.cos(this.currentAngle) * canvas.height / offset);
	
	        this.y += Math.round(Math.sin(this.currentAngle) * canvas.height / offset);
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var parser = Util.alphabetParser(this.constants);
	      var matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
	      this.async(matched, 0);
	    }
	  }, {
	    key: 'async',
	    value: function async(array, index) {
	      var _this2 = this;
	
	      var constant = array[index];
	      var delay = 0;
	
	      if (constant === "+") {
	        this.currentAngle -= this.angleChange;
	      } else if (constant === "-") {
	        this.currentAngle += this.angleChange;
	      } else {
	        ctx.beginPath();
	        ctx.moveTo(this.x, this.y);
	        this.angles();
	        ctx.lineTo(this.x, this.y);
	        ctx.strokeStyle = "black";
	        ctx.lineWidth = 2;
	        ctx.stroke();
	
	        delay = this.speed;
	      }
	      if (index < array.length - 1) {
	        var timeOutkey = setTimeout(function () {
	          return _this2.async(array, index + 1);
	        }, delay);
	
	        this.timeoutKeys.push(timeOutkey);
	      }
	    }
	  }]);
	
	  return lSystem;
	}();
	
	module.exports = lSystem;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }
	
	  _createClass(Util, null, [{
	    key: "alphabetParser",
	    value: function alphabetParser(alphabet) {
	      var parser = "";
	      var letters = Array.from(new Set(alphabet.match(/\w/g)));
	
	      letters.forEach(function (char) {
	        parser += char + "|";
	      });
	
	      return parser.slice(0, parser.length - 1);
	    }
	  }, {
	    key: "degreesToRadian",
	    value: function degreesToRadian(angle) {
	      return angle * Math.PI / 180;
	    }
	  }, {
	    key: "offsetCalc",
	    value: function offsetCalc(offset, iterations) {
	
	      var currentOffset = offset[0];
	      for (var i = offset[1]; i < parseInt(iterations); i = i + offset[2]) {
	        currentOffset = currentOffset * 2;
	      }
	
	      return currentOffset;
	    }
	  }, {
	    key: "calculateDelay",
	    value: function calculateDelay(delay, iterations) {
	      if (delay === "1") {
	        return 30;
	      } else if (delay === "2") {
	        return 15;
	      } else {
	        return 5;
	      }
	    }
	  }]);
	
	  return Util;
	}();
	
	module.exports = Util;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
	    rules: { X: "X+YF+", Y: "-FX-Y" }, angle: 90, iterations: 1, offset: [2.5, 0, 2], customStart: true, speed: "1" },
	  sierpinski: { variables: "AB", constants: "AB+-", axiom: "A",
	    rules: { A: "+B-A-B+", B: "-A+B+A-" }, angle: 60, iterations: 1, offset: [1.5, 0, 1], speed: "1" },
	  koch: { variables: "F", constants: "F+-", axiom: "F",
	    rules: { F: "F+F-F-F+F" }, angle: 90, iterations: 1, offset: [6, 0, 1], speed: "1" },
	  hilbert: { variables: "AB", constants: "F+-", axiom: "A",
	    rules: { A: "+BF-AFA-FB+", B: "-AF+BFB+FA-" }, angle: 90, iterations: 1, offset: [3, 1, 1], speed: "1" }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map