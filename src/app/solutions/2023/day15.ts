import { Solver } from "src/app/models/solver.model";

enum Direction { NORTH, WEST, SOUTH, EAST };

export default class Day15 extends Solver {

  data = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  public override part1(rawInput: string) {
    const strArr = rawInput.split(',');
    console.log(strArr);
    return strArr.reduce((acc, str) => acc += this.getHash(str), 0);
  }

  public override part2(rawInput: string) {
    return 0;
  }

  getHash(str: string): number {
    let value = 0;
    for(let char of str) {
      value += char.charCodeAt(0);
      value = value * 17 % 256;
    }
    return value;
  }

}
