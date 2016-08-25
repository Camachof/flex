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

	const lSystem = __webpack_require__(1);
	const Constants = __webpack_require__(4);
	
	new lSystem(Constants.hilbert);
	
	function dragstartHandler(e) {
	  const style = window.getComputedStyle(e.target, null);
	
	  const xPos = parseInt(style.getPropertyValue('left'), 10) - e.clientX;
	  const yPos = parseInt(style.getPropertyValue('top'), 10) - e.clientY;
	
	  e.dataTransfer.setData('text/plain', (xPos + ',' + yPos));
	}
	
	function dropHandler(e){
	  e.preventDefault();
	
	  const offset = e.dataTransfer.getData('text/plain').split(',');
	  const toolbar = document.getElementById('curveToolbar');
	
	  toolbar.style.left = e.clientX + parseInt(offset[0],10) + 'px';
	  toolbar.style.top = e.clientY + parseInt(offset[1],10) + 'px';
	
	  return false;
	}
	
	function dragoverHandler(e) {
	  e.preventDefault();
	}
	
	const toolbar = document.getElementById('curveToolbar');
	
	toolbar.addEventListener('dragstart', dragstartHandler);
	document.body.addEventListener('dragover', dragoverHandler);
	document.body.addEventListener('drop', dropHandler);
	
	const form = document.getElementById('customForm');
	let currentCurve;
	
	form.addEventListener("submit", e => {
	  e.preventDefault();
	
	  let angle = $('#angle').val();
	  let iterations = $('#iterations').val();
	
	  let userCurve = { angle: angle, iterations: iterations };
	  let mergedInputs = Object.assign(currentCurve, userCurve);
	
	  new lSystem(mergedInputs);
	});
	
	const buttons = document.getElementById('curveButtons');
	
	buttons.addEventListener("click", e => {
	  e.preventDefault();
	  const curve = Constants[e.target.id];
	
	  new lSystem(curve);
	
	  $('#angle').val(curve.angle);
	  $('#iterations').val(curve.iterations);
	
	  currentCurve = Object.assign({}, curve);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const Defaults = __webpack_require__(3);
	
	const canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("2d");
	
	
	class lSystem {
	  constructor(options){
	    const mergedInputs = Object.assign(Defaults.hilbert, options);
	
	    this.variables = mergedInputs.variables;
	    this.constants = mergedInputs.constants;
	    this.state = mergedInputs.axiom;
	    this.rules = mergedInputs.rules;
	    this.angleChange = Util.degreesToRadian(mergedInputs.angle);
	    this.iterations = mergedInputs.iterations;
	    this.iterationOffset = mergedInputs.iterationOffset;
	
	    this.currentAngle = 0;
	
	    this.x = canvas.width / 2;
	    this.y = canvas.height - (canvas.height / 3);
	
	    this.execute();
	  }
	
	  execute(){
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    Util.degreesToRadian(this.angle);
	    this.deriveResult();
	    this.findDimensions();
	    this.draw();
	  }
	
	  deriveResult(){
	    const parser = Util.alphabetParser(this.variables);
	
	    for (var i = 0; i < this.iterations; i++) {
	      this.setInstructions(parser);
	    }
	  }
	
	  setInstructions(parser){
	    this.state = this.state.replace(new RegExp(parser, 'gi'), match => {
	      return this.rules[match];
	    });
	  }
	
	  angles(){
	    if (this.iterations == 1){
	      this.x += Math.round((Math.cos(this.currentAngle) * canvas.width) / 5);
	
	      this.y += Math.round((Math.sin(this.currentAngle) * canvas.width) / 5);
	    } else {
	      this.x += Math.round((Math.cos(this.currentAngle) * canvas.width) / (Math.pow(this.iterations, this.iterationOffset)));
	
	      this.y += Math.round((Math.sin(this.currentAngle) * canvas.width) / (Math.pow(this.iterations, this.iterationOffset)));
	    }
	  }
	
	  findDimensions(){
	    const parser = Util.alphabetParser(this.constants);
	    const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
	
	    let minX = 0;
	    let maxX = canvas.width;
	
	    let minY = 0;
	    let maxY = canvas.height - 100;
	
	    matched.forEach( constant => {
	      if (constant === "+") {
	        this.currentAngle -= this.angleChange;
	      } else if (constant === "-") {
	        this.currentAngle += this.angleChange;
	      } else {
	          this.angles();
	      }
	
	      if (this.x < minX){
	        minX = this.x;
	      } else if (this.x > maxX) {
	        maxX = this.x;
	      }
	
	      if (this.y < minY){
	        minY = this.y;
	      } else if (this.y > maxY) {
	        maxY = this.y;
	      }
	    });
	
	    if (maxX > canvas.width){
	      const diff = maxX - canvas.width;
	      this.x = canvas.width / 3;
	      this.x -= diff + 150;
	    }
	    else if (minX < 200) {
	      const diff = Math.abs(minX);
	      this.x = canvas.width / 3;
	      this.x += diff + 150;
	    }
	    else {
	      this.x = canvas.width / 3;
	    }
	
	    if (maxY > canvas.height - 100){
	      const diff = maxY - canvas.height;
	      this.y = canvas.height - (canvas.height / 3);
	      this.y -= diff + 150;
	    }
	    else if (minY < 0) {
	      const diff = Math.abs(minY);
	      this.y = canvas.height - (canvas.height / 3);
	      this.y += diff + 150;
	    }
	    else {
	      this.y = canvas.height - (canvas.height / 3);
	    }
	
	    this.currentAngle = 0;
	  }
	
	  draw(){
	    const parser = Util.alphabetParser(this.constants);
	    const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
	
	    matched.forEach( constant => {
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
	      }
	    });
	  }
	}
	
	module.exports = lSystem;


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Util {
	
	  static alphabetParser(alphabet){
	    let parser = "";
	    const letters = Array.from(new Set(alphabet.match(/\w/g)));
	
	    letters.forEach( char => {
	      parser += char + "|";
	    });
	
	    return parser.slice(0, parser.length - 1);
	  }
	
	  static degreesToRadian(angle){
	    return (angle * Math.PI) / 180;
	  }
	}
	
	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	module.exports = {
	  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
	    rules: { A: "-BF+AFA+FB-", B: "+AF−BFB−FA+"}, angle: 90, iterations: 5}
	  };


/***/ },
/* 4 */
/***/ function(module, exports) {

	// hilbert: 3
	// Kock: 3.7
	// sierpinski: 3
	// dragon: 2.2
	
	module.exports = {
	  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
	    rules: { X: "X+YF+", Y: "-FX-Y"}, angle: 90, iterations: 1 , iterationOffset: 2.2},
	  sierpinski: { variables: "AB", constants: "AB+-", axiom: "A",
	    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, iterations: 1, iterationOffset: 3},
	  koch: { variables: "F", constants: "F+-", axiom: "F",
	    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 1 , iterationOffset: 3.7},
	  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
	    rules: { A: "+BF-AFA-FB+", B: "-AF+BFB+FA-"}, angle: 90, iterations: 1, iterationOffset: 3}
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map