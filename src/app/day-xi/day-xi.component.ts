import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xi',
  templateUrl: './day-xi.component.html',
  styleUrls: ['./day-xi.component.scss']
})
export class DayXIComponent implements OnInit {

  data = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

  monkeys: any[] = [];

  monkeyBusinessLevel = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input11.txt', { responseType: 'text' }).subscribe(data => {
      this.monkeys = data.split('Monkey');
      this.monkeys.shift();
      this.monkeys = this.monkeys.map(str => {
        return this.convertMonkeyStrToObj(str);
      });
      console.log(this.monkeys);
      this.play();
      this.monkeys.sort((a, b) => b.inspectionTimes - a.inspectionTimes);
      this.monkeyBusinessLevel = this.monkeys[0].inspectionTimes * this.monkeys[1].inspectionTimes;
    });
  }

  convertMonkeyStrToObj(str: string) {
    const fieldsArr = str.split('\n');
    return {
      startingItems: fieldsArr[1].split('Starting items: ')[1].split(',').map((item: string) => +item),
      operationOperator: fieldsArr[2].split('old ')[1].split(' ')[0],
      operationOperand: fieldsArr[2].split('old ')[1].split(' ')[1],
      test: +fieldsArr[3].split('by ')[1],
      ifTrue: +fieldsArr[4].split('monkey ')[1],
      ifFalse: +fieldsArr[5].split('monkey ')[1],
      inspectionTimes: 0
    }
  }

  play() {
    for (let i = 0; i < 20; i++) {
      this.monkeys.forEach(monkey => {
        while (monkey.startingItems.length > 0) {
          let item = monkey.startingItems.shift();
          monkey.inspectionTimes++;
          item = Math.floor(this.changeWorryLevel(item, monkey.operationOperator, monkey.operationOperand) / 3);
          this.monkeys[item % monkey.test ? monkey.ifFalse : monkey.ifTrue].startingItems.push(item);
        }
      });
      console.log(this.monkeys);
    }
  }

  changeWorryLevel(initialLevel: number, operator: string, operand: string) {
    if (operator == '+') {
      return initialLevel + (operand == 'old' ? initialLevel : +operand);
    } else {
      return initialLevel * (operand == 'old' ? initialLevel : +operand);
    }
  }

}
