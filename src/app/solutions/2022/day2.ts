import { Solver } from "src/app/models/solver.model";

export default class Day02 extends Solver {
  partnerSignArr = ['A', 'B', 'C'];
  mySignArr = ['X', 'Y', 'Z'];

  winMatrix1 = [
    [4, 8, 3],
    [1, 5, 9],
    [7, 2, 6]
  ];

  winMatrix2 = [
    [3, 4, 8],
    [1, 5, 9],
    [2, 6, 7]
  ];

  public override part1(rawInput: string) {
    let score = 0;
    const arr = rawInput.trim().split("\n");
    arr.forEach(round => {
      if (round.trim()) {
        const partnerSign = round[0];
        const mySign = round[2];
        score += this.winMatrix1[this.partnerSignArr.indexOf(partnerSign)][this.mySignArr.indexOf(mySign)];
      }
    });
    return score;
  }

  public override part2(rawInput: string) {
    let score = 0;
    const arr = rawInput.trim().split("\n");
    arr.forEach(round => {
      if (round.trim()) {
        const partnerSign = round[0];
        const mySign = round[2];
        score += this.winMatrix2[this.partnerSignArr.indexOf(partnerSign)][this.mySignArr.indexOf(mySign)];
      }
    });
    return score;
  }
}
