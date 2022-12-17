import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-v',
  templateUrl: './day-v.component.html',
  styleUrls: ['./day-v.component.scss']
})
export class DayVComponent implements OnInit {

  result1 = '';
  result2 = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input5.txt', { responseType: 'text' }).subscribe(data => {
      const index = data.indexOf('move');
      const stacksStr = data.slice(0, index);
      const stacks = this.getStacks(stacksStr);
      const commandsArr = data.slice(index).split('\n').filter(command => command);
      const separatedCommandsArr = commandsArr.map(command => command.split(' '));
      const finalStacks1 = this.runCommands(stacks, separatedCommandsArr);
      const finalStacks2 = this.runCommands(stacks, separatedCommandsArr, true);
      this.result1 = this.getTopStr(finalStacks1);
      this.result2 = this.getTopStr(finalStacks2);
    });
  }

  getStacks(stacksStr: string): Array<string[]> {
    const stacksRows = stacksStr.split('\n').filter(item => item);
    stacksRows.pop();
    const stacksCount = (stacksRows[0].length + 1) / 4;
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
