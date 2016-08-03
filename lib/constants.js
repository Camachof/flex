
module.exports = {
  dragon: { variables: "XY", constants: "F+-", axiom: "FX",
    rules: { X: "X+YF+", Y: "-FX-Y"}, angle: 90, itertations: 5 },
  sierpinski: { variables: "AB", constants: "+-", axiom: "A",
    rules: { A: "+B-A-B+", B: "-A+B+A-"}, angle: 60, itertations: 5 },
  koch: { variables: "F", constants: "+-", axiom: "F",
    rules: { F: "F+F-F-F+F"}, angle: 90, iterations: 5 },
  hilbert: {variable: "AB", constants: "F+-", axiom: "A",
    rules: { A: "-BF+AFA+FB-", B: "+AF−BFB−FA+"}, degrees: 90, iterations: 10}
};
