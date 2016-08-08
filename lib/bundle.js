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
	
	const form = document.getElementById('customCurve');
	let currentCurve = Constants.hilbert;
	
	form.addEventListener("submit", e => {
	  e.preventDefault();
	
	  let angle = $('#angle').val();
	  let iterations = $('#iterations').val();
	
	  let userCurve = { angle: angle, iterations: iterations };
	  let mergedInputs = Object.assign(currentCurve, userCurve);
	
	
	  new lSystem(mergedInputs);
	});
	
	const sierpinski = document.getElementById('sierpinski');
	const dragon = document.getElementById('dragon');
	const hilbert = document.getElementById('hilbert');
	const koch = document.getElementById('koch');
	
	sierpinski.addEventListener("click", e => {
	  e.preventDefault();
	  new lSystem(Constants.sierpinski);
	
	  $('#angle').val(Constants.sierpinski.angle);
	  $('#iterations').val(Constants.sierpinski.iterations);
	
	  currentCurve = Object.assign({}, Constants.sierpinski);
	});
	dragon.addEventListener("click", e => {
	  e.preventDefault();
	  new lSystem(Constants.dragon);
	
	  $('#angle').val(Constants.dragon.angle);
	  $('#iterations').val(Constants.dragon.iterations);
	
	  currentCurve = Object.assign({}, Constants.dragon);
	});
	hilbert.addEventListener("click", e => {
	  e.preventDefault();
	  new lSystem(Constants.hilbert);
	
	  $('#angle').val(Constants.hilbert.angle);
	  $('#iterations').val(Constants.hilbert.iterations);
	
	  currentCurve = Object.assign({}, Constants.hilbert);
	});
	koch.addEventListener("click", e => {
	  e.preventDefault();
	  new lSystem(Constants.koch);
	
	  $('#angle').val(Constants.koch.angle);
	  $('#iterations').val(Constants.koch.iterations);
	
	  currentCurve = Object.assign({}, Constants.koch);
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
	
	    // this.x = this.calculateX();
	    this.x = canvas.width / 3;
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
	
	  // calculateX(){
	  //   if(this.iterations <= 5){
	  //     return (canvas.width / 2) - (60 / this.iterations);
	  //   } else {
	  //     return (canvas.width / 2) - (80 * (this.iterations - 5));
	  //   }
	  // }
	
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
	      this.x += Math.round((Math.cos(this.currentAngle) * canvas.width) / (Math.pow(this.iterations, this.iterationOffset)));
	
	      this.y += Math.round((Math.sin(this.currentAngle) * canvas.width) / (Math.pow(this.iterations, this.iterationOffset)));
	  }
	
	  findDimensions(){
	    const parser = Util.alphabetParser(this.constants);
	    const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
	
	    let minX = 0;
	    let maxX = canvas.width;
	
	    let minY = 0;
	    let maxY = canvas.height;
	
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
	
	    if (maxX >= canvas.width){
	      const diff = maxX - canvas.width;
	      this.x = canvas.width / 3;
	      this.x -= diff;
	    }
	
	    if (minX < 0) {
	      const diff = Math.abs(minX);
	      this.x = canvas.width / 3;
	      this.x += diff;
	    }
	
	    if (maxY > canvas.height){
	      const diff = maxY - canvas.height;
	      this.y = canvas.height - (canvas.height / 3); 
	      this.y -= diff;
	    }
	    debugger;
	    if (minY < 0) {
	      const diff = Math.abs(minY);
	      this.y = canvas.height - (canvas.height / 3);
	      this.y += diff;
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
	  constructor(){
	
	  }
	
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
	    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, iterations: 5, iterationOffset: 3},
	  koch: { variables: "F", constants: "F+-", axiom: "F",
	    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 3 , iterationOffset: 3.7},
	  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
	    rules: { A: "+BF-AFA-FB+", B: "-AF+BFB+FA-"}, angle: 90, iterations: 2, iterationOffset: 3}
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map