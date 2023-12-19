import { Solver } from "src/app/models/solver.model";

export default class Day10 extends Solver {
  x = 1;
  cycle = 1;

  keyCycles = [20, 60, 100, 140, 180, 220];

  signalStrengthsSum = 0;

  canvas: Array<string[]> = Array(6).fill(0).map(() => Array(40).fill(0));

  public override part1(rawInput: string) {
    const commands = rawInput.split('\n').map(item => item.replace('\r', ''));
    this.runCommands(commands);
    return this.signalStrengthsSum;
  }

  public override part2(rawInput: string) {
    console.log(this.canvas.map(row => row.join('')).join('\n'));
    return 'In console';
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
