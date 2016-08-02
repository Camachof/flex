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
	
	// const rules = {
	//   A: "-BF+AFA+FB-", // Rule 1
	//   B: "+AF-BFB-FA+"  // Rule 2
	// };
	
	// const rules = {
	//   F: "F+F-F-F+F"
	// };
	
	const canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("2d");
	const min = Math.min(canvas.width, canvas.height);
	
	class lSystem {
	  constructor(alphabet, axiom, rules, iterations, angle = 0){
	    this.alphabet = alphabet;
	    this.state = axiom;
	    this.rules = rules;
	    this.iterations = iterations;
	    this.x = canvas.width / 2;
	    this.y = canvas.height;
	    this.angle = angle;
	
	    this.produce();
	  }
	
	  produce(){
	    this.deriveResult();
	    this.draw();
	  }
	
	  alphabetParser(){
	    let parser = "";
	    const letters = Array.from(new Set(this.alphabet.match(/\w/g)));
	
	    letters.forEach( char => {
	      parser += char + "|";
	    });
	
	    return parser.slice(0, parser.length - 1);
	  }
	
	  // constantParser(){
	  //   let parser = "/";
	  //
	  //   const constants = Array.from(new Set(this.constants.match(/\w/g)));
	  //
	  //   constants.forEach( char => {
	  //     parser += char + "/";
	  //   });
	  //
	  //   return parser + "gi";
	  // }
	
	  deriveResult(){
	    let parser = this.alphabetParser();
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
	    let matched = this.state.match(/a|b|\+|-/gi);
	    matched.forEach( constant => {
	      if (constant.toLowerCase() === "a" || constant.toLowerCase() === "b") {
	        ctx.beginPath();
	        ctx.moveTo(this.x, this.y);
	        this.angles();
	        ctx.lineTo(this.x, this.y);
	        debugger;
	        ctx.stroke();
	      } else if (constant === "+") {
	        this.angle += Math.PI/3;
	      } else if (constant === "-") {
	        this.angle -= Math.PI/3;
	      }
	    });
	  }
	}
	let trial = new lSystem("AB","A",{ A: "B-A-B", B: "A+B+A" }, 8);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map