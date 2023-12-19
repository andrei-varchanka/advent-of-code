import { Solver } from "src/app/models/solver.model";

export default class Day05 extends Solver {

  public override part1(rawInput: string) {
    const finalStacks1 = this.getFinalStacks(rawInput, false);
    return this.getTopStr(finalStacks1);
  }

  public override part2(rawInput: string) {
    const finalStacks2 = this.getFinalStacks(rawInput, true);
    return this.getTopStr(finalStacks2);
  }

  getFinalStacks(data: string, multiPickUp?: boolean) {
    const index = data.indexOf('move');
    const stacksStr = data.slice(0, index);
    const stacks = this.getStacks(stacksStr);
    const commandsArr = data.slice(index).split('\n').filter(command => command);
    const separatedCommandsArr = commandsArr.map(command => command.split(' '));
    return this.runCommands(stacks, separatedCommandsArr, multiPickUp);
  }

  getStacks(stacksStr: string): Array<string[]> {
    const stacksRows = stacksStr.split('\n').filter(item => item);
    stacksRows.pop();
    const stacksCount = (stacksRows[0].length) / 4;
    let stacks = new Array(stacksCount);
    stacksRows.reverse().forEach(row => {
      for (let i = 0; i < stacks.length; i++) {
        stacks[i] = stacks[i] || [];
        const value = row[4 * i + 1];
        if (value != ' ') {
          stacks[i].push(value);
        }
      }
    });
    return stacks;
  }

  runCommands(stacks: Array<string[]>, separatedCommandsArr: Array<string[]>, multiPickUp?: boolean): Array<string[]> {
    const finalStacks = JSON.parse(JSON.stringify(stacks));
    separatedCommandsArr.forEach(command => {
      const count = +command[1];
      const fromIndex = +command[3] - 1;
      const toIndex = +command[5] - 1;
      if (multiPickUp) {
        finalStacks[toIndex] = finalStacks[toIndex].concat(finalStacks[fromIndex].slice(-count));
        finalStacks[fromIndex].length = finalStacks[fromIndex].length - count;
      } else {
        for (let i = 0; i < count; i++) {
          finalStacks[toIndex].push(finalStacks[fromIndex].pop() as string);
        }
      }
    });
    return finalStacks;
  }

  getTopStr(stacks: Array<string[]>): string {
    let result = '';
    stacks.forEach(stack => {
      result += stack[stack.length - 1];
    })
    return result;
  }
}
