const lSystem = require('./lSystem.js');
const Constants = require('./constants.js');

let currentSystem = new lSystem(Constants.hilbert);

const toolbar2 = document.getElementById('curveToolbar');
const range = document.getElementById('inputRange');
const angle = document.getElementById('angle');

range.addEventListener("input", (e)=> {
  angle.value = e.target.value;
});

range.addEventListener('mousedown', () => { toolbar2.setAttribute("draggable", false); });
range.addEventListener('mouseup', () => { toolbar2.setAttribute("draggable", true); });

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
  removeWarning();

  let angle = $('#angle').val();
  let iterations = $('#iterations').val();

  if(parseInt(iterations) > 8){
    addWarning();
  } else {
    let userCurve = { angle: angle, iterations: iterations };
    let mergedInputs = Object.assign(currentCurve, userCurve);

    currentSystem.timeoutKeys.forEach((key) => {
      clearTimeout(key);
    });

    currentSystem = new lSystem(mergedInputs);
  }

});

const buttons = document.getElementById('curveButtons');

buttons.addEventListener("click", e => {
  e.preventDefault();
  removeWarning();

  const curve = Constants[e.target.id];

  currentSystem.timeoutKeys.forEach((key) => {
    clearTimeout(key);
  });

  currentSystem = new lSystem(curve);

  $('#angle').val(curve.angle);
  $('#iterations').val(curve.iterations);

  currentCurve = Object.assign({}, curve);
});

const iterationButtons = document.getElementById('buttons');

iterationButtons.addEventListener("click", e => {
  e.preventDefault();
  removeWarning();

  let iterations = parseInt($('#iterations').val());
  e.target.id === "arrow-down" ? iterations -= 1 : iterations += 1;

  if(iterations > 0 && iterations < 9){
    $('#iterations').val(iterations);
  } else if (document.getElementById('warning') === null) {
    addWarning();
  }
});

function addWarning(){
  const boundsSign = document.createElement('p');
  boundsSign.id = "warning";
  const textSign = document.createTextNode('Between 1 and 8!');
  boundsSign.appendChild(textSign);

  document.getElementsByClassName('iterationParent')[0].appendChild(boundsSign);
}

function removeWarning(){
  const toRemove = document.getElementById('warning');
  if(toRemove){
    const trial = document.getElementsByClassName('iterationParent');
    trial[0].removeChild(toRemove);
  }
}
