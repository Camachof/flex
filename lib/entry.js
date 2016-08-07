const lSystem = require('./lSystem.js');
const Constants = require('./constants.js');

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
