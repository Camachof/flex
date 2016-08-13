const lSystem = require('./lSystem.js');
const Constants = require('./constants.js');

new lSystem(Constants.hilbert);

function dragstartHandler(e) {
  const style = window.getComputedStyle(e.target, null);

  const xPos = parseInt(style.getPropertyValue('left'), 10) - e.clientX;
  const yPos = parseInt(style.getPropertyValue('top'), 10) - e.clientY;

  e.dataTransfer.setData('text/plain', (xPos + ',' + yPos));
}

function dropHandler(e){
  e.preventDefault();

  const offset = e.dataTransfer.getData('text/plain').split(',');
  const toolbar = document.getElementById('curveToolbar');

  toolbar.style.left = e.clientX + parseInt(offset[0],10) + 'px';
  toolbar.style.top = e.clientY + parseInt(offset[1],10) + 'px';

  return false;
}

function dragoverHandler(e) {
  e.preventDefault();
}

const toolbar = document.getElementById('curveToolbar');

toolbar.addEventListener('dragstart', dragstartHandler);
document.body.addEventListener('dragover', dragoverHandler);
document.body.addEventListener('drop', dropHandler);

const form = document.getElementById('customForm');
let currentCurve;

form.addEventListener("submit", e => {
  e.preventDefault();

  let angle = $('#angle').val();
  let iterations = $('#iterations').val();

  let userCurve = { angle: angle, iterations: iterations };
  let mergedInputs = Object.assign(currentCurve, userCurve);

  new lSystem(mergedInputs);
});

const buttons = document.getElementById('curveButtons');

buttons.addEventListener("click", e => {
  e.preventDefault();
  const curve = Constants[e.target.id];

  new lSystem(curve);

  $('#angle').val(curve.angle);
  $('#iterations').val(curve.iterations);

  currentCurve = Object.assign({}, curve);
});
