import { Solver } from "src/app/models/solver.model";

export default class Day06 extends Solver {

  public override part1(rawInput: string) {
    return this.findMarkerPosition(rawInput, 4);
  }

  public override part2(rawInput: string) {
    return this.findMarkerPosition(rawInput, 14);
  }

  findMarkerPosition(str: string, markerLength: number): number {
    let result = 0;
    let charsArr = str.slice(0, markerLength).split('');
    for (let i = markerLength; i < str.length; i++) {
      if (this.checkCharsUnique(charsArr)) {
        result = i;
        break;
      }
      charsArr.shift();
      charsArr.push(str[i]);
    }
    return result;
  }

  checkCharsUnique(arr: string[]): boolean {
    return arr.length == [...new Set(arr)].length;
  }

}
