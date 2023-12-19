import { Solver } from "src/app/models/solver.model";

type State = [row: number, column: number, minutes: number];
type Position = [row: number, column: number];
type Visited = Array<Array<Array<boolean>>>;

export default class Day24 extends Solver {

  rows: number = 0;
  columns: number = 0;
  start: Position = [0, 0];
  end: Position = [0, 0];
  winds: string[] = [];

  public override part1(rawInput: string) {
    this.parseInput(rawInput);
    return this.travelTime(this.start, this.end, 0);
  }

  public override part2(rawInput: string) {
    this.parseInput(rawInput);
    const result = this.travelTime(this.start, this.end, 0);
    const backForSnacks = this.travelTime(this.end, this.start, result);
    return this.travelTime(this.start, this.end, backForSnacks);
  }

  parseInput(data: string) {
    let inputLines = data.split(/\r?\n/);
    this.rows = inputLines.length - 2;
    this.columns = inputLines[0].length - 2;
    this.start = [0, 1];
    this.end = [this.rows + 1, this.columns];
    this.winds = inputLines.slice(1, -1).map((line) => line.substring(1, line.length - 1));
  }

  mod(n: number, d: number): number {
    return ((n % d) + d) % d;
  }

  hasWind(row: number, column: number, minutes: number): boolean {
    row -= 1;
    column -= 1;
    return (
      this.winds[this.mod(row - minutes, this.rows)][column] === "v" ||
      this.winds[this.mod(row + minutes, this.rows)][column] === "^" ||
      this.winds[row][this.mod(column - minutes, this.columns)] === ">" ||
      this.winds[row][this.mod(column + minutes, this.columns)] === "<"
    );
  }

  canMove(row: number, column: number, minutes: number, visited: Visited): boolean {
    if ((row === this.start[0] && column === this.start[1]) || (row === this.end[0] && column === this.end[1]))
      return true; // starting positions
    if (
      row < 0 ||
      row > this.rows ||
      row === 0 ||
      row === this.rows + 1 ||
      column === 0 ||
      column === this.columns + 1
    )
      return false; // boundary
    return !this.hasWind(row, column, minutes) && !visited[row][column][minutes % (this.rows * this.columns)];
  }

  travelTime(from: Position, to: Position, initialMinutes: number): number {
    const visited: Visited = new Array(this.rows + 2)
      .fill(undefined)
      .map(() =>
        new Array(this.columns + 2).fill(undefined).map(() => new Array(this.rows * this.columns).fill(false))
      );
    const stack: Array<State> = [[from[0], from[1], initialMinutes]];
    while (stack.length > 0) {
      const [row, column, minutes] = stack.shift()!;
      if (row === to[0] && column === to[1]) {
        return minutes;
      }
  
      const next: Array<State> = [];
      if (this.canMove(row, column, minutes + 1, visited)) next.push([row, column, minutes + 1]);
      if (this.canMove(row + 1, column, minutes + 1, visited)) next.push([row + 1, column, minutes + 1]);
      if (this.canMove(row - 1, column, minutes + 1, visited)) next.push([row - 1, column, minutes + 1]);
      if (this.canMove(row, column + 1, minutes + 1, visited)) next.push([row, column + 1, minutes + 1]);
      if (this.canMove(row, column - 1, minutes + 1, visited)) next.push([row, column - 1, minutes + 1]);
  
      for (const nextState of next) {
        stack.push(nextState);
        visited[nextState[0]][nextState[1]][nextState[2] % (this.rows * this.columns)] = true;
      }
    }
    return -1;
  }
  

}
