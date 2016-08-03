
module.exports = {
  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
    rules: { X: "X+YF+", Y: "-FX-Y"}, angle: 90, iterations: 5 },
  sierpinski: { variables: "AB", constants: "AB+-", axiom: "A",
    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, iterations: 5 },
  koch: { variables: "F", constants: "F+-", axiom: "F",
    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 3 },
  hilbert: {variables: "AB", constants: "F+-", axiom: "A",
    rules: { A: "-BF+AFA+FB-", B: "+AF−BFB−FA+"}, angle: 90, iterations: 2}
};
