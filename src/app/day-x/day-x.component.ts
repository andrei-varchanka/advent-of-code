import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-x',
  templateUrl: './day-x.component.html',
  styleUrls: ['./day-x.component.scss']
})
export class DayXComponent implements OnInit {

  data = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

  x = 1;
  cycle = 1;

  keyCycles = [20, 60, 100, 140, 180, 220];

  signalStrengthsSum = 0;

  canvas: Array<string[]> = Array(6).fill(0).map(() => Array(40).fill(0))

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input10.txt', { responseType: 'text' }).subscribe(data => {
      const commands = data.split('\n');
      this.runCommands(commands);
      console.log(this.canvas.map(row => row.join('')).join('\n'));
    });
  }

  runCommands(commands: string[]) {
    commands.forEach(command => {
      if (command.split(' ')[0] == 'addx') {
        this.startNextCycle();
        this.startNextCycle();
        this.x += +command.split(' ')[1];
        console.log(this.x);
      } else {
        this.startNextCycle();
      }
    });
  }

  startNextCycle() {
    this.checkSignalStrength();
    this.draw();
    this.cycle++;
  }

  checkSignalStrength() {
    if (this.keyCycles.includes(this.cycle)) {
      this.signalStrengthsSum += this.cycle * this.x;
    }
  }

  draw() {
    const i = Math.floor((this.cycle - 1) / 40);
    const j = (this.cycle - 1) % 40;
    this.canvas[i][j] = Math.abs(this.x - j) < 2 ? '#' : '.';
  }

}
