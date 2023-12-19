import {Solver } from "src/app/models/solver.model";

export default class Day01 extends Solver {

  data = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

  numbers: Map<string, number> = new Map([
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
    const arr = rawInput.trim().split("\n");
    arr.forEach(line => {
      // numbers.forEach(number => line.replaceAll)
      const numbers = line.split('').filter(char => !isNaN(parseInt(char)));
      sum += +(numbers.length > 1 ? numbers[0] + numbers[numbers.length - 1] : numbers[0] + numbers[0]);
    });
    return 0;
  }
}
