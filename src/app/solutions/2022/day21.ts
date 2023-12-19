import { Solver } from "src/app/models/solver.model";

type Monkeys = {
  [key: string]: string
}

export default class Day21 extends Solver {

  knownNumbers: Map<string, number> = new Map();

  public override part1(rawInput: string) {
    return this.getYell(this.parseMonkeys(rawInput));
  }

  public override part2(rawInput: string) {
    return this.getHumnValue(this.parseMonkeys(rawInput));
  }

  parseMonkeys(str: string): Monkeys {
    return str.split('\r\n').reduce((acc: { [key: string]: string }, cur) => {
      const [name, operation] = cur.split(': ');
      acc[name] = operation;
      return acc;
    }, {})
  }

  getYell(monkeys: Monkeys, who = 'root'): number {
    const yell = monkeys[who];

    if (/^\d+$/.test(yell)) return Number(yell);

    const [left, oper, right] = yell.split(' ');

    if (oper === '+') return this.getYell(monkeys, left) + this.getYell(monkeys, right);
    if (oper === '-') return this.getYell(monkeys, left) - this.getYell(monkeys, right);
    if (oper === '*') return this.getYell(monkeys, left) * this.getYell(monkeys, right);
    if (oper === '/') return this.getYell(monkeys, left) / this.getYell(monkeys, right);

    throw new Error('invalid yell: ' + yell);
  }

  getParent(monkeys: Monkeys, monkey: string): string {
    const entries = Object.entries(monkeys);
    return (entries.find(entry => entry[1].includes(monkey)) as Array<string>)[0];
  }

  getAncestry(monkeys: Monkeys, monkey: string): string[] {
    const result = [];
    while (monkey !== 'root') {
      result.unshift(monkey);
      const parent = this.getParent(monkeys, monkey);
      monkey = parent;
    }
    return result;
  }

  getHumnValue(monkeys: Monkeys): number {
    const ancestry = this.getAncestry(monkeys, 'humn');

    const getOther = (branch: string, name: string) =>
      monkeys[branch].split(' ').find(s => /[a-z]/.test(s) && s !== name);

    const humnBranch = ancestry[0];
    const otherBranch = getOther('root', humnBranch);

    let currentNum = this.getYell(monkeys, otherBranch);

    for (let i = 0; i < ancestry.length - 1; i++) {
      const cur = ancestry[i];
      const next = ancestry[i + 1];
      const other = getOther(cur, next);

      const otherNum = this.getYell(monkeys, other);

      const [left, oper, _right] = monkeys[cur].split(' ');

      if (left === next) {
        // next ? otherNum = currentNum
        if (oper === '+') {
          currentNum = currentNum - otherNum;
        } else if (oper === '-') {
          currentNum = currentNum + otherNum;
        } else if (oper === '*') {
          currentNum = currentNum / otherNum;
        } else if (oper === '/') {
          currentNum = currentNum * otherNum;
        }
      } else {
        // otherNum ? next = currentNum
        if (oper === '+') {
          currentNum = currentNum - otherNum;
        } else if (oper === '-') {
          currentNum = otherNum - currentNum;
        } else if (oper === '*') {
          currentNum = currentNum / otherNum;
        } else if (oper === '/') {
          currentNum = otherNum / currentNum;
        }
      }
    }
    return currentNum;
  }
}
