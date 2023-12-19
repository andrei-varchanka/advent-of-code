import { Solver } from "src/app/models/solver.model";

export default class Day11 extends Solver {

  monkeys: any[] = [];

  public override part1(rawInput: string) {
    this.init(rawInput);
    this.play(20, 'first');
    return this.getBusinessLevel();
  }

  public override part2(rawInput: string) {
    this.init(rawInput);
    this.play(10000, 'second');
    return this.getBusinessLevel();
  }

  init(data: string) {
    this.monkeys = data.split('Monkey');
    this.monkeys.shift();
    this.monkeys = this.monkeys.map(str => {
      return this.convertMonkeyStrToObj(str);
    });
    console.log(this.monkeys);
  }

  getBusinessLevel() {
    this.monkeys.sort((a, b) => b.inspectionTimes - a.inspectionTimes);
    return this.monkeys[0].inspectionTimes * this.monkeys[1].inspectionTimes;
  }

  convertMonkeyStrToObj(str: string) {
    const fieldsArr = str.split('\r\n');
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

  play(roundsNumber: number, mode: string) {
    let modAll = this.monkeys.reduce((ac, monkey) => ac * monkey.test, 1);
    for (let i = 0; i < roundsNumber; i++) {
      this.monkeys.forEach(monkey => {
        while (monkey.startingItems.length > 0) {
          let item = monkey.startingItems.shift();
          monkey.inspectionTimes++;
          if (mode == 'first') {
            item = Math.floor(this.changeWorryLevel(item, monkey.operationOperator, monkey.operationOperand) / 3);
          } else {
            item = this.changeWorryLevel(item, monkey.operationOperator, monkey.operationOperand);
            item = item % modAll;
          }
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
