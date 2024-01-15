import { Solver } from "src/app/models/solver.model";

enum Direction { NORTH, WEST, SOUTH, EAST };

type LabeledLense = {
  label: string;
  focalLength: number;
}

export default class Day15 extends Solver {

  data = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  public override part1(rawInput: string) {
    const strArr = rawInput.split(',');
    return strArr.reduce((acc, str) => acc += this.getHash(str), 0);
  }

  public override part2(rawInput: string) {
    const strArr = rawInput.split(',');
    const boxes = new Map<number, LabeledLense[]>();
    for (let i = 0; i < 256; i++) {
      boxes.set(i, []);
    }
    strArr.forEach(str => {
      let label = str.substring(0, str.length - (str.includes('-') ? 1 : 2));
      const boxNumber = this.getHash(label);
      let boxLenses = boxes.get(boxNumber) as LabeledLense[];
      if (str.includes('-')) {
        boxLenses = boxLenses.filter(lens => lens.label != label);
      } else {
        const focalLength = +str.split('=')[1];
        const lensWithLabel = boxLenses.find(lens => lens.label == label);
        if (lensWithLabel) {
          lensWithLabel.focalLength = focalLength;
        } else {
          boxLenses?.push({ label, focalLength });
        }
      }
      boxes.set(boxNumber, boxLenses);
    });
    return this.calculateFocusingPowers(boxes);
  }

  getHash(str: string): number {
    let value = 0;
    for (let char of str) {
      value += char.charCodeAt(0);
      value = value * 17 % 256;
    }
    return value;
  }

  calculateFocusingPowers(boxes: Map<number, LabeledLense[]>): number {
    let sum = 0;
    boxes.forEach((lenses, boxNumber) => {
      lenses.forEach((lens, i) => {
        sum += (boxNumber + 1) * (i + 1) * lens.focalLength;
      });
    });
    return sum;
  }

}
