//
// L-system
//
// Alphabet : A, B
// Constants : F + −
// Axiom : A
// Production rules:
// A → − B F + A F A + F B −
// B → + A F − B F B − F A +
// Here, "F" means "draw forward",
//       "−" means "turn left 90°",
//       "+" means "turn right 90°" and
//       "A" and "B" are ignored during drawing.

// Axiom / intial state

const rules = {
  A: "-BF+AFA+FB-", // Rule 1
  B: "+AF-BFB-FA+"  // Rule 2
};

class lSystem {
  constructor(iterations){
    this.iterations = iterations;
    this.state = "A";
    this.parser = /A|B/;
  }

  deriveResult(){
    for (var i = 0; i < this.iterations; i++) {
      this.executeRules();
    }
  }

  executeRules(){
    this.state = this.state.replace(this.parser, match => {
      return rules[match];
    });
  }

}

let trial = new lSystem(1);
trial.deriveResult();
