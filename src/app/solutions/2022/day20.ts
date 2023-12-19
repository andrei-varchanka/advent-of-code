import { Solver } from "src/app/models/solver.model";

interface FileNumber {
  value: number;
  index: number;
}

export default class Day20 extends Solver {

  public override part1(rawInput: string) {
    const arr1 = this.mix(...this.parseNumbers(rawInput));
    return this.sum(arr1);
  }

  public override part2(rawInput: string) {
    const [numbers, map] = this.parseNumbers(rawInput, 811589153);
    const arr2 = Array.from({ length: 10 }).reduce<FileNumber[]>(lastNumbers => this.mix(lastNumbers, map), numbers)
    return this.sum(arr2);
  }

  parseNumbers(data: string, multiplier?: number): [FileNumber[], Map<number, FileNumber>] {
    const map = new Map<number, FileNumber>();
    const numbers: FileNumber[] = data.split('\n').map((s, index) => {
      const number = { value: multiplier ? +s * multiplier : +s, index };
      map.set(number.index, number);
      return number
    });
    return [numbers, map];
  }

  sum(numbers: FileNumber[]) {
    const zeroIndex = numbers.findIndex(n => n.value === 0);
    return [1000, 2000, 3000].reduce((sum, io) => sum + numbers[(zeroIndex + io) % numbers.length].value, 0);
  }

  mix(numbers: FileNumber[], map: Map<number, FileNumber>) {
    for (let i = 0; i < numbers.length; i++) {
      const fileNumber = map.get(i)!;
      const currentIndex = numbers.indexOf(fileNumber);
      numbers.splice(currentIndex, 1);
      numbers.splice((currentIndex + fileNumber.value) % numbers.length, 0, fileNumber);
    }
    return numbers;
  }

}
