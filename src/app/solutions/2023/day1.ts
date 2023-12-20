import {Solver } from "src/app/models/solver.model";

export default class Day01 extends Solver {

  public override part1(rawInput: string) {
    let sum = 0;
    const arr = rawInput.trim().split("\n");
    arr.forEach(line => {
      const numbers = line.split('').filter(char => !isNaN(parseInt(char)));
      sum += +(numbers.length > 1 ? numbers[0] + numbers[numbers.length - 1] : numbers[0] + numbers[0]);
    });
    return sum;
  }

  public override part2(rawInput: string) {
    let sum = 0;
    const NUMBERS = new Map([
      ['one', 1],
      ['two', 2],
      ['three', 3],
      ['four', 4],
      ['five', 5],
      ['six', 6],
      ['seven', 7],
      ['eight', 8],
      ['nine', 9],
    ]); 
    const arr = rawInput.trim().split("\n");
    arr.forEach(line => {
      NUMBERS.forEach((value, key) => {
        let numberArr = key.split('');
        numberArr.splice(1, 0, value.toString());
        const combinedNumber = numberArr.join();
        line = line.replaceAll(key, combinedNumber);
      });
      const numbers = line.split('').filter(char => !isNaN(parseInt(char)));
      sum += +(numbers.length > 1 ? numbers[0] + numbers[numbers.length - 1] : numbers[0] + numbers[0]);
    });
    return sum;
  }
}
