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

const Util = require('./util.js');

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
