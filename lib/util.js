
class Util {

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

  static offsetCalc(offset, iterations){

    let currentOffset = offset[0];
    for (var i = offset[1]; i < parseInt(iterations); i = i + offset[2]) {
      currentOffset = currentOffset * 2;
    }

    return currentOffset;
  }

  static calculateDelay(delay, iterations){
    if(delay === "1"){
      return 30;
    } else if (delay === "2") {
      return 15;
    } else {
      return 5;
    }
  }
}

module.exports = Util;
