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

	//
	// L-system
	//
	// Alphabet : A, B
	// Constants : F + −
	// Axiom : A
	// Production rules:
	// A → − B F + A F A + F B −
	// B → + A F − B F B − F A +
	// Here, "F" means "draw forward",
	//       "−" means "turn left 90°",
	//       "+" means "turn right 90°" and
	//       "A" and "B" are ignored during drawing.
	
	// Axiom / intial state
	
	// const rules = {
	//   A: "-BF+AFA+FB-", // Rule 1
	//   B: "+AF-BFB-FA+"  // Rule 2
	// };
	
	// const rules = {
	//   F: "F+F-F-F+F"
	// };
	
	const Util = __webpack_require__(1);
	
	const canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("2d");
	const min = Math.min(canvas.width, canvas.height);
	
	class lSystem {
	  constructor(alphabet, actionableAlphabet, axiom, rules, angleChange, iterations){
	    this.alphabet = alphabet;
	    this.actionableAlphabet = actionableAlphabet;
	    this.state = axiom;
	    this.rules = rules;
	    this.angleChange = angleChange;
	    this.iterations = iterations;
	
	    this.currentAngle = 0;
	    this.x = canvas.width / 2;
	    this.y = canvas.height;
	
	    this.execute();
	  }
	
	  execute(){
	    Util.degreesToRadian(this.angle);
	    this.deriveResult();
	    debugger;
	    this.draw();
	  }
	
	  deriveResult(){
	    const parser = Util.alphabetParser(this.alphabet);
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
	    this.x += Math.round(Math.cos(this.angle));
	    this.y += Math.round(Math.sin(this.angle)) * -1;
	  }
	
	  draw(){
	    const parser = Util.alphabetParser(this.actionableAlphabet);
	    const matched = this.state.match(new RegExp(parser + "|\+|-", 'gi'));
	    matched.forEach( constant => {
	      if (constant === "+") {
	        this.currentAngle += this.angleChange;
	      } else if (constant === "-") {
	        this.currentAngle -= this.angleChange;
	      } else {
	          ctx.beginPath();
	          ctx.moveTo(this.x, this.y);
	          this.angles();
	          ctx.lineTo(this.x, this.y);
	          ctx.stroke();
	      }
	    });
	  }
	}
	let trial = new lSystem("XY", "F+-", "FX",{ X: "X+YF+", Y: "-FX-Y" }, 90, 2);


/***/ },
/* 1 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map