import { Solver } from "src/app/models/solver.model";

export default class Day12 extends Solver {

  data = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

  cache = new Map<string, number>();

  public override part1(rawInput: string) {
    const lines = rawInput.split('\r\n');
    // const lines = this.data.split('\n');
    let arrangementsCount = 0;
    lines.forEach(line => {
      const [row, numbersStr] = line.split(' ');
      const numbers = numbersStr.split(',').map(i => +i);
      arrangementsCount += this.countWays(row, numbers);
    })
    return arrangementsCount;
  }

  public override part2(rawInput: string) {
    const lines = rawInput.split('\r\n');
    // const lines = this.data.split('\n');
    let arrangementsCount = 0;
    lines.forEach(line => {
      const [str, numStr] = line.split(' ');
      const nums = numStr.split(",").map(num => +num);
      const strExpanded = [str, str, str, str, str].join("?");
      const numsExpanded = [...nums, ...nums, ...nums, ...nums, ...nums];
      arrangementsCount += this.countWays(strExpanded, numsExpanded);
    })
    return arrangementsCount;
  }

  countWays = (row: string, ns: number[]): number => {
    row = row.replace(/^\.+|\.+$/, '');
    if (row === '') return ns.length ? 0 : 1;
    if (!ns.length) return row.includes('#') ? 0 : 1;
    const key = [row, ns].join(' ');
    if (this.cache.has(key)) return this.cache.get(key)!;

    let result = 0;
    const damaged = row.match(/^#+(?=\.|$)/);
    if (damaged) {
      if (damaged[0].length === ns[0]) {
        result += this.countWays(row.slice(ns[0]), ns.slice(1));
      }
    } else if (row.includes('?')) {
      const total = ns.reduce(this.sum);
      result += this.countWays(row.replace('?', '.'), ns);
      if ((row.match(/#/g) || []).length < total) {
        result += this.countWays(row.replace('?', '#'), ns);
      }
    }
    this.cache.set(key, result);
    return result;
  }

  sum(a: number, b: number) {
    return a + b;
  }
}
