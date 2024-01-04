import { Solver } from "src/app/models/solver.model";

export default class Day09 extends Solver {

  data = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  public override part1(rawInput: string) {
    const numbersArr = rawInput.split('\r\n').map(line => line.split(' ').map(i => +i));
    // const numbersArr = this.data.split('\n').map(line => line.split(' ').map(i => +i));
    return this.solve(numbersArr);
  }

  public override part2(rawInput: string) {
    const numbersArr = rawInput.split('\r\n').map(line => line.split(' ').map(i => +i).reverse());
    // const numbersArr = this.data.split('\n').map(line => line.split(' ').map(i => +i).reverse());
    return this.solve(numbersArr);
  }

  solve(numbersArr: number[][]): number {
    let sum = 0;
    numbersArr.forEach(numbers => {
      const differences = this.getDifferences(numbers);
      for (let i = differences.length - 1; i > 0; i--) {
        differences[i - 1].push((differences[i].at(-1) as number) + (differences[i - 1].at(-1) as number));
      }
      sum += differences[0].at(-1) as number;
    });
    return sum;
  }

  getDifferences(numbers: number[]): number[][] {
    const differences = [];
    let previousDifference = numbers;
    differences.push(previousDifference);
    let newDifference: number[];
    do {
      newDifference = [];
      for (let i = 0; i < previousDifference.length - 1; i++) {
        newDifference.push(previousDifference[i + 1] - previousDifference[i]);
      }
      previousDifference = newDifference;
      differences.push(previousDifference);
    } while (!previousDifference.every(item => item == 0))
    return differences;
  }

}
