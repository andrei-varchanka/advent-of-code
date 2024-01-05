import { Solver } from "src/app/models/solver.model";

export default class Day12 extends Solver {

  data = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

  public override part1(rawInput: string) {
    let arrangements = 0;
    // const lines = rawInput.split('\r\n');
    const lines = this.data.split('\n');

    for (const line of lines) {
      const [str, numsS] = line.split(" ");
      const nums = numsS.split(",").map(num => +num);
      arrangements += this.countWays(str, nums);
    }
    return arrangements;
  }

  public override part2(rawInput: string) {
    let arrangements = 0;
    // const lines = rawInput.split('\r\n');
    const lines = this.data.split('\n');

    for (const line of lines) {
      const [str, numsS] = line.split(" ");
      const nums = numsS.split(",").map(num => +num);

      const strExpanded = [str, str, str, str, str].join("?");
      const numsExpanded = [...nums, ...nums, ...nums, ...nums, ...nums];
      arrangements += this.countWays(strExpanded, numsExpanded);
    }
    return arrangements;
  }

  memoize<Args extends unknown[], Result>(func: (...args: Args) => Result): (...args: Args) => Result {
    const stored = new Map<string, Result>();

    return (...args) => {
      const k = JSON.stringify(args);
      if (stored.has(k)) {
        return stored.get(k)!;
      }
      const result = func(...args);
      stored.set(k, result);
      return result;
    };
  }

  sum(...nums: number[] | (readonly number[])[]): number {
    let tot = 0;
    for (const x of nums) {
      if (typeof x === "number") {
        tot += x;
      } else {
        for (const y of x) {
          tot += y;
        }
      }
    }
    return tot;
  }

  countWays = this.memoize(
    (line: string, runs: readonly number[]): number => {
      if (line.length === 0) {
        if (runs.length === 0) {
          return 1;
        }
        return 0;
      }
      if (runs.length === 0) {
        for (let i = 0; i < line.length; i++) {
          if (line[i] === "#") {
            return 0;
          }
        }
        return 1;
      }

      if (line.length < this.sum(runs) + runs.length - 1) {
        // The line is not long enough for all runs
        return 0;
      }

      if (line[0] === ".") {
        return this.countWays(line.slice(1), runs);
      }
      if (line[0] === "#") {
        const [run, ...leftoverRuns] = runs;
        for (let i = 0; i < run; i++) {
          if (line[i] === ".") {
            return 0;
          }
        }
        if (line[run] === "#") {
          return 0;
        }

        return this.countWays(line.slice(run + 1), leftoverRuns);
      }
      // Otherwise dunno first spot, pick
      return (
        this.countWays("#" + line.slice(1), runs) + this.countWays("." + line.slice(1), runs)
      );
    }
  );

}
