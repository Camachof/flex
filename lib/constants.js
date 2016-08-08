// hilbert: 3
// Kock: 3.7
// sierpinski: 3
// dragon: 2.2

module.exports = {
  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
    rules: { X: "X+YF+", Y: "-FX-Y"}, angle: 90, iterations: 1 , iterationOffset: 2.2},
  sierpinski: { variables: "AB", constants: "AB+-", axiom: "A",
    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, iterations: 5, iterationOffset: 3},
  koch: { variables: "F", constants: "F+-", axiom: "F",
    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 3 , iterationOffset: 3.7},
  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
    rules: { A: "+BF-AFA-FB+", B: "-AF+BFB+FA-"}, angle: 90, iterations: 2, iterationOffset: 3}
};
