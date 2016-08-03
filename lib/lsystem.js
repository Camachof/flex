const Util = require('./util.js');
const Defaults = require('./defaults.js');

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const min = Math.min(canvas.width, canvas.height);

class lSystem {
  constructor(options){
    debugger;
    const mergedInputs = Object.assign(Defaults.hilbert, options);

    this.variables = mergedInputs.variables;
    this.constants = mergedInputs.constants;
    this.state = mergedInputs.axiom;
    this.rules = mergedInputs.rules;
    this.angleChange = Util.degreesToRadian(mergedInputs.angle);
    this.iterations = mergedInputs.iterations;

    this.currentAngle = 0;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.execute();
  }

  execute(){
    Util.degreesToRadian(this.angle);
    this.deriveResult();
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
    this.x += Math.round(Math.cos(this.currentAngle) * 10) / this.iterations * 5;
    this.y += Math.round(Math.sin(this.currentAngle)) * 10 * -1 / this.iterations * 5;
  }

  draw(){
    const parser = Util.alphabetParser(this.constants);
    const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
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

module.exports = lSystem;

// let trial = new lSystem("XY", "F+-", "FX",{ X: "X+YF+", Y: "-FX-Y" }, 90, 4);
