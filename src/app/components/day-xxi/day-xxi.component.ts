import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type Monkeys = {
  [key: string]: string
}

@Component({
  selector: 'app-day-xxi',
  templateUrl: './day-xxi.component.html',
  styleUrls: ['./day-xxi.component.scss']
})
export class DayXXIComponent implements OnInit {

  data = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

  result1: number = 0;

  result2: number = 0;

  knownNumbers: Map<string, number> = new Map();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input21.txt', { responseType: 'text' }).subscribe(data => {
      this.result1 = this.getYell(this.parseMonkeys(data));
      this.result2 = this.getHumnValue(this.parseMonkeys(data));
    });
  }

  parseMonkeys(str: string): Monkeys {
    return str.split('\n').reduce((acc: { [key: string]: string }, cur) => {
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
