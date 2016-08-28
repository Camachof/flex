//calculate offset
// helbert offset == 3, i = 1
// koch offset == 9, i = 0
// dragon offset == 2.5, i = 0, i + 2
// sierpinski offset == 1.5, i == 0

module.exports = {
  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
    rules: { X: "X+YF+", Y: "-FX-Y"}, angle: 90, iterations: 1 , offset: [2.5, 0, 2], customStart: true},
  sierpinski: { variables: "AB", constants: "AB+-", axiom: "A",
    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, iterations: 1, offset: [1.5, 0, 1]},
  koch: { variables: "F", constants: "F+-", axiom: "F",
    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 1 , offset: [6,0,1]},
  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
    rules: { A: "+BF-AFA-FB+", B: "-AF+BFB+FA-"}, angle: 90, iterations: 1, offset: [3,1,1]}
};
