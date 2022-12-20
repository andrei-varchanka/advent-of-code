import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-x',
  templateUrl: './day-x.component.html',
  styleUrls: ['./day-x.component.scss']
})
export class DayXComponent implements OnInit {

  x = 1;
  cycle = 1;

  keyCycles = [20, 60, 100, 140, 180, 220];

  signalStrengthsSum = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input10.txt', { responseType: 'text' }).subscribe(data => {
      const commands = data.split('\n');
      this.runCommands(commands);
    });
  }

  runCommands(commands: string[]) {
    commands.forEach(command => {
      if (command.split(' ')[0] == 'addx') {
        this.startNextCycle();
        this.startNextCycle();
        this.x += +command.split(' ')[1];
      } else {
        this.startNextCycle();
      }
    });
  }

  startNextCycle() {
    this.checkSignalStrength();
    this.cycle++;
  }

  checkSignalStrength() {
    if (this.keyCycles.includes(this.cycle)) {
      this.signalStrengthsSum += this.cycle * this.x;
    }
  }

}
