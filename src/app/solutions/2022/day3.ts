import { Solver } from "src/app/models/solver.model";

export default class Day03 extends Solver {

  public override part1(rawInput: string) {
    let sum = 0;
    const arr = rawInput.trim().split("\n");
    arr.forEach((item: string) => {
      const firstHalf = item.substring(0, item.length / 2);
      const secondHalf = item.substring(item.length / 2)
      const char = this.getRepeatingChar([firstHalf, secondHalf], 2);
      sum += this.getPriority(char);
    });
    return sum;
  }

  public override part2(rawInput: string) {
    const arr = rawInput.trim().split("\n");
    const group3Arr: Array<string[]> = [];
    let i = 0;
    let sum = 0;
    arr.forEach((item: string) => {
      group3Arr[i] = group3Arr[i] || [];
      if (group3Arr[i].length == 3) {
        i++;
        group3Arr[i] = [];
      }      
      group3Arr[i].push(item);
    });
    group3Arr.forEach(item => {
      const char = this.getRepeatingChar(item, 3);
      console.log(char);
      sum += this.getPriority(char);
    });
    return sum;
  }

  getRepeatingChar(strArr: string[], repeatingNumber: number): string {
    let repeatingChar = '';
    const uniqueStrArr = strArr.map(item => [...new Set(item.split(''))]);
    const sortedUniqueArr = uniqueStrArr.flat().sort();
    let repeatedItemsCount = 1;
    for (let i = 1; i < sortedUniqueArr.length; i++) {
      if (sortedUniqueArr[i] == sortedUniqueArr[i - 1]) {
        repeatedItemsCount++;
      } else {
        repeatedItemsCount = 1;
      }
      if (repeatedItemsCount == repeatingNumber) {
        repeatingChar = sortedUniqueArr[i];
      }
    }
    return repeatingChar;
  }

  getPriority(char: string): number {
    const charCode = char.charCodeAt(0);
    let priority = 0;
    if (charCode >= 65 && charCode <= 90) {
      // A-Z
      priority = charCode - 38;
    }
    if (charCode >= 97 && charCode <= 122) {
      // a-z
      priority = charCode - 96;
    }
    return priority;
  }
}
