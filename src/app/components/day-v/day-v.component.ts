import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-v',
  templateUrl: './day-v.component.html',
  styleUrls: ['./day-v.component.scss']
})
export class DayVComponent implements OnInit {

  data = `    [D]    
  [N] [C]    
  [Z] [M] [P]
   1   2   3 
  
  move 1 from 2 to 1
  move 3 from 1 to 3
  move 2 from 2 to 1
  move 1 from 1 to 2`

  result1 = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input5.txt', { responseType: 'text' }).subscribe(data => {
      const index = data.indexOf('move');
      const stacksStr = data.slice(0, index);
      let stacks = this.getStacks(stacksStr);
      const commandsArr = data.slice(index).split('\n');
      const separatedCommandsArr = commandsArr.map(command => command.split(' '));
      stacks = this.runCommands(stacks, separatedCommandsArr);
      this.result1 = this.getTopStr(stacks);
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

  runCommands(stacks: Array<string[]>, separatedCommandsArr: Array<string[]>): Array<string[]> {
    separatedCommandsArr.forEach(command => {
      const count = +command[1];
      const fromIndex = +command[3] - 1;
      const toIndex = +command[5] - 1;
      for (let i = 0; i < count; i++) {
        stacks[toIndex].push(stacks[fromIndex].pop() as string);
      }
    });
    return stacks;
  }

  getTopStr(stacks: Array<string[]>): string {
    let result = '';
    stacks.forEach(stack => {
      result += stack[stack.length - 1];
    })
    return result;
  }
}
