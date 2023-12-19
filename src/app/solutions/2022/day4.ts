import { Solver } from "src/app/models/solver.model";

export default class Day04 extends Solver {

  public override part1(rawInput: string) {
    let containedRangesCount = 0;
    const arr = rawInput.trim().split("\n");
    arr.forEach(item => {
      let [firstRange, secondRange] = item.split(',');
      let firstArray = this.getArrayFromStrRange(firstRange);
      let secondArray = this.getArrayFromStrRange(secondRange);
      let mergedArray = firstArray.concat(secondArray);
      let uniqueMergedArray = [...new Set(mergedArray)];
      if (uniqueMergedArray.length <= Math.max(firstArray.length, secondArray.length)) {
        containedRangesCount++;
      }
    });
    return containedRangesCount;
  }

  public override part2(rawInput: string) {
    let overlapsCount = 0
    const arr = rawInput.trim().split("\n");
    arr.forEach(item => {
      let [firstRange, secondRange] = item.split(',');
      let firstArray = this.getArrayFromStrRange(firstRange);
      let secondArray = this.getArrayFromStrRange(secondRange);
      let mergedArray = firstArray.concat(secondArray);
      let uniqueMergedArray = [...new Set(mergedArray)];
      if (uniqueMergedArray.length < mergedArray.length) {
        overlapsCount++;
      }
    });
    return overlapsCount;
  }

  getArrayFromStrRange(str: string): number[] {
    let firstNumber = +str.split('-')[0];
    let lastNumber = +str.split('-')[1];
    const arr = [];
    for (let i = firstNumber; i <= lastNumber; i++) {
      arr.push(i);
    }
    return arr;
  }
}
