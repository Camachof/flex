
class Util {
  constructor(){

  }

  static alphabetParser(alphabet){
    let parser = "";
    const letters = Array.from(new Set(alphabet.match(/\w/g)));

    letters.forEach( char => {
      parser += char + "|";
    });

    return parser.slice(0, parser.length - 1);
  }

  static degreesToRadian(angle){
    return (angle * Math.PI) / 180;
  }
}

module.exports = Util;
