import { Solver } from "src/app/models/solver.model";

export default class Day04 extends Solver {

  data = `Time:      7  15   30
Distance:  9  40  200`;

  public override part1(rawInput: string) {
    let result = 1;
    const lines = rawInput.split('\n');
    const times = this.strToNumArr(lines[0]);
    const distances = this.strToNumArr(lines[1]);
    for (let i = 0; i < times.length; i++) {
      result *= this.getWinCount(times[i], distances[i]);
    }
    return result;
  }

  getWinCount(t: number, s: number) {
    // to^2 - t*to + s < 0
    const discriminant = Math.sqrt(t * t - 4 * s);
    let t01 = (t - discriminant) / 2;
    let t02 = (t + discriminant) / 2;
    t01 = Number.isInteger(t01) ? t01 + 1 : Math.ceil(t01);
    t02 = Number.isInteger(t02) ? t02 - 1 : Math.floor(t02);
    // console.log('t01: ', t01);
    // console.log('t02: ', t02);
    return t02 - t01 + 1;
  }

  strToNumArr(str: string): number[] {
    return str.split(' ').map(item => +item).filter(item => item);
  }

  public override part2(rawInput: string) {
    let result = 1;
    const lines = rawInput.split('\n');
    const time = +this.strToNumArr(lines[0]).reduce((acc: string, item: number) => acc + item, '');
    const distance = +this.strToNumArr(lines[1]).reduce((acc: string, item: number) => acc + item, '');;
    return this.getWinCount(time, distance);
  }
}
