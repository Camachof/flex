const Util = require('./util.js');
const Constants = require('./constants.js');

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
const ctx = canvas.getContext("2d");

class lSystem {
  constructor(options){

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

    if (options.customStart){
      this.x = canvas.width / 1.7;
      this.y = canvas.height / 2;
    }
    else {
      this.x = canvas.width / 2.5;
      this.y = canvas.height - (canvas.height / 6);
    }

    this.execute();
  }

  execute(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    const offset = Util.offsetCalc(this.offset, this.iterations);

    if (this.iterations == 1){
      this.x += Math.round((Math.cos(this.currentAngle) * canvas.height) / 5);

      this.y += Math.round((Math.sin(this.currentAngle) * canvas.height) / 5);
    } else {
      this.x += Math.round((Math.cos(this.currentAngle) * canvas.height) / offset);

      this.y += Math.round((Math.sin(this.currentAngle) * canvas.height) / offset);
    }
  }

  draw(){
    const parser = Util.alphabetParser(this.constants);
    const matched = this.state.match(new RegExp(parser + "|\\+|-", 'gi'));
    this.async(matched, 0);
  }

  async(array, index){
    const constant = array[index];
    let delay = 0;

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
    if(index < array.length -1 ){
      let timeOutkey = setTimeout(() => this.async(array, index + 1), delay);

      this.timeoutKeys.push(timeOutkey);
    }
  }
}

module.exports = lSystem;
