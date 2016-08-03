const lSystem = require('./lSystem.js');
const Constants = require('./constants.js');

const sierpinski = document.getElementById('sierpinski');
const dragon = document.getElementById('dragon');
const hilbert = document.getElementById('hilbert');
const koch = document.getElementById('koch');

sierpinski.addEventListener("click", e => {
  e.preventDefault();
  new lSystem(Constants.sierpinski);
});
dragon.addEventListener("click", e => {
  e.preventDefault();
  new lSystem(Constants.dragon);
});
hilbert.addEventListener("click", e => {
  e.preventDefault();
  new lSystem(Constants.hilbert);
});
koch.addEventListener("click", e => {
  e.preventDefault();
  new lSystem(Constants.koch);
});
