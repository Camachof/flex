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
/***/ function(module, exports) {

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
	
	const rules = {
	  A: "-BF+AFA+FB-", // Rule 1
	  B: "+AF-BFB-FA+"  // Rule 2
	};
	
	const canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("2d");
	const parser = /A|B/gi;
	const min = Math.min(canvas.width, canvas.height);
	
	class lSystem {
	  constructor(iterations){
	    this.iterations = iterations;
	    this.state = "A";
	    this.x = 50;
	    this.y = 50;
	    this.dx = 20;
	    this.dy = 20;
	    this.angle = 0;
	
	    this.produce();
	  }
	
	  produce(){
	    debugger;
	    this.deriveResult();
	    this.draw();
	  }
	
	  deriveResult(){
	    for (var i = 0; i < this.iterations; i++) {
	      this.setInstructions();
	    }
	  }
	
	  setInstructions(){
	    this.state = this.state.replace(parser, match => {
	      debugger;
	      return rules[match];
	    });
	  }
	
	  angles(){
	    this.x += Math.round(Math.cos(this.angle)*min/(Math.pow(this.iterations+1, 2.2)));
	    this.y += Math.round(Math.sin(this.angle)*min/(Math.pow(this.iterations+1, 2.2)))*-1;
	  }
	
	  draw(){
	    let matched = this.state.match(/F|\+|-/gi);
	    matched.forEach( constant => {
	      if (constant.toLowerCase() === "f") {
	        ctx.beginPath();
	        ctx.moveTo(this.x, this.y);
	        this.angles();
	        ctx.lineTo(this.x, this.y);
	        ctx.stroke();
	      } else if (constant === "+") {
	        this.angle -= Math.PI/2;
	      } else if (constant === "-") {
	        this.angle += Math.PI/2;
	      }
	    });
	  }
	}
	
	let trial = new lSystem(1);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map