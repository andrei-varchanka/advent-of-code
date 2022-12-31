import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type NumberMonkey = { key: string; number: number; };
type OperationMonkey = { key: string; operand1: string | number; operator: string; operand2: string | number; };

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
      const [numberMonkeys, operationMonkeys] = this.parseInput(data);
      console.log(numberMonkeys);
      console.log(operationMonkeys);
      this.launch(numberMonkeys, operationMonkeys);
      this.result1 = this.knownNumbers.get('root') as number;
    });
  }

  launch(numberMonkeys: NumberMonkey[], operationMonkeys: OperationMonkey[]) {
    while (!this.knownNumbers.has('root')) {
      const numberMonkey = numberMonkeys.shift() as NumberMonkey;
      this.knownNumbers.set(numberMonkey.key, numberMonkey.number);
      operationMonkeys.forEach(operationMonkey => {
        let canCalculate = true;
        if (typeof operationMonkey.operand1 == 'string') {
          if (this.knownNumbers.has(operationMonkey.operand1 as string)) {
            operationMonkey.operand1 = this.knownNumbers.get(operationMonkey.operand1 as string) as number;
          } else {
            canCalculate = false;
          }
        }
        if (typeof operationMonkey.operand2 == 'string') {
          if ( this.knownNumbers.has(operationMonkey.operand2 as string)) {
            operationMonkey.operand2 = this.knownNumbers.get(operationMonkey.operand2 as string) as number;
          } else {
            canCalculate = false;
          }
        }
        if (canCalculate) {
          let result;
          if (operationMonkey.operator == '+') result = (operationMonkey.operand1 as number) + (operationMonkey.operand2 as number);
          if (operationMonkey.operator == '-') result = (operationMonkey.operand1 as number) - (operationMonkey.operand2 as number);
          if (operationMonkey.operator == '*') result = (operationMonkey.operand1 as number) * (operationMonkey.operand2 as number);
          if (operationMonkey.operator == '/') result = (operationMonkey.operand1 as number) / (operationMonkey.operand2 as number);
          numberMonkeys.push({key: operationMonkey.key, number: result as number});
          this.knownNumbers.set(operationMonkey.key, result as number);
          operationMonkeys.filter(monkey => monkey.key != operationMonkey.key);
        }
      });
    }
  }

  parseInput(data: string): [NumberMonkey[], OperationMonkey[]] {
    const numberMonkeys: NumberMonkey[] = [];
    const operationMonkeys: OperationMonkey[] = [];
    data.split('\n').forEach(monkey => {
      let [key, value] = monkey.split(': ');
      if (Number.isNaN(+value)) {
        const valueArr = value.split(' ');
        operationMonkeys.push({
          key,
          operand1: valueArr[0],
          operator: valueArr[1],
          operand2: valueArr[2]
        });
      } else {
        numberMonkeys.push({
          key,
          number: +value
        });
      }
    });
    return [numberMonkeys, operationMonkeys];
  }

}
