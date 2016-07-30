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
	
	class lSystem {
	  constructor(iterations){
	    this.iterations = iterations;
	    this.state = "A";
	    this.parser = /A|B/;
	  }
	
	  deriveResult(){
	    for (var i = 0; i < this.iterations; i++) {
	      this.executeRules();
	    }
	  }
	
	  executeRules(){
	    this.state = this.state.replace(this.parser, match => {
	      return rules[match];
	    });
	  }
	
	}
	
	let trial = new lSystem(1);
	trial.deriveResult();


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map