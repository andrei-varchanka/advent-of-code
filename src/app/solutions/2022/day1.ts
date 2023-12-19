import {Solver } from "src/app/models/solver.model";

type Input = (number | null)[];

export default class Day01 extends Solver {
  private transform(rawInput: string): Input {
    return rawInput.trim().split("\n").map((line) => (line === "" ? null : parseInt(line, 10)));
  }

  public override part1(rawInput: string) {
    const input: Input = this.transform(rawInput);
    let calculatedArray: number[] = [];
    let index = 0;
    input.forEach(item => {
      if (item) {
        calculatedArray[index] = calculatedArray[index] || 0;
        calculatedArray[index] += item;
      } else {
        index++;
      }
    });
    calculatedArray = calculatedArray.sort((a, b) => a - b);
    return calculatedArray[calculatedArray.length - 1];
  }

  public override part2(rawInput: string) {
    const input: Input = this.transform(rawInput);
    let calculatedArray: number[] = [];
    let index = 0;
    input.forEach(item => {
      if (item) {
        calculatedArray[index] = calculatedArray[index] || 0;
        calculatedArray[index] += item;
      } else {
        index++;
      }
    });
    calculatedArray = calculatedArray.sort((a, b) => a - b);
    const lastThree = calculatedArray.slice(-3);
    return lastThree.reduce((a, b) => a + b, 0);
  }
}
