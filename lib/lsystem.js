const Util = require('./util.js');
const Defaults = require('./defaults.js');

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
