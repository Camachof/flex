const lSystem = require('./lSystem.js');
const Constants = require('./constants.js');

const sierpinski = document.getElementById('sierpinski');
debugger;
sierpinski.addEventListener("click", e => {
  debugger;
  e.preventDefault();
  new lSystem(Constants.sierpinski);
});
// dragonCurve.addEventListener("submit", e => {
//   debugger;
//   e.preventDefault();
//   new lSystem(Constants.dragonCurve);
// });
// dragonCurve.addEventListener("submit", e => {
//   debugger;
//   e.preventDefault();
//   new lSystem(Constants.dragonCurve);
// });
// dragonCurve.addEventListener("submit", e => {
//   debugger;
//   e.preventDefault();
//   new lSystem(Constants.dragonCurve);
// });
