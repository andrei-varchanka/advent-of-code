import { Solver } from "src/app/models/solver.model";

type Coordinate = { x: number, y: number };
enum Direction { TOP, RIGHT, BOTTOM, LEFT };

export default class Day10 extends Solver {

  data = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;


  data2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

  rightConnection = ['7', '-', 'J'];
  leftConnection = ['F', '-', 'L'];
  topConnection = ['7', '|', 'F'];
  bottomConnection = ['J', '|', 'L'];

  public override part1(rawInput: string) {
    const matrix = rawInput.split('\r\n').map(line => line.split(''));
    const startX = matrix.findIndex(line => line.includes('S'));
    const startY = matrix[startX].findIndex(el => el == 'S');
    let cur: Coordinate = { x: startX, y: startY };
    let prev: Coordinate = { x: startX, y: startY };
    console.log(matrix);
    if (this.tryDirection(matrix, cur, Direction.TOP)) {
      cur.x--;
    } else if (this.tryDirection(matrix, cur, Direction.RIGHT)) {
      cur.y++;
    } else {
      // Bottom and left are valid
      cur.x++;
    }
    let counter = 1;
    while (!(cur.x == startX && cur.y == startY)) {
      [cur, prev] = this.makeStep(matrix, cur, prev);
      counter++;
    }
    return counter / 2;
  }

  tryDirection(matrix: string[][], coord: Coordinate, direction: Direction): boolean {
    if (direction == Direction.TOP && matrix[coord.x - 1]) {
      return this.topConnection.includes(matrix[coord.x - 1][coord.y]);
    } else if (direction == Direction.RIGHT && matrix[coord.x][coord.y + 1]) {
      return this.rightConnection.includes(matrix[coord.x][coord.y + 1]);
    } else if (direction == Direction.BOTTOM && matrix[coord.x + 1]) {
      return this.bottomConnection.includes(matrix[coord.x + 1][coord.y]);
    } else if (direction == Direction.LEFT && matrix[coord.x][coord.y - 1]) {
      return this.leftConnection.includes(matrix[coord.x][coord.y - 1]);
    } else return true;
  }

  makeStep(matrix: string[][], cur: Coordinate, prev: Coordinate): [Coordinate, Coordinate] {
    const curValue = matrix[cur.x][cur.y];
    const newCoord: Coordinate = { x: cur.x, y: cur.y };
    if (curValue == '|') {
      cur.x > prev.x ? newCoord.x++ : newCoord.x--;
    }
    if (curValue == '-') {
      cur.y > prev.y ? newCoord.y++ : newCoord.y--;
    }
    if (curValue == 'L') {
      cur.x > prev.x ? newCoord.y++ : newCoord.x--;
    }
    if (curValue == 'J') {
      cur.x > prev.x ? newCoord.y-- : newCoord.x--;
    }
    if (curValue == '7') {
      cur.x == prev.x ? newCoord.x++ : newCoord.y--;
    }
    if (curValue == 'F') {
      cur.x == prev.x ? newCoord.x++ : newCoord.y++;
    }
    prev = cur;
    return [newCoord, prev];
  }

  public override part2(rawInput: string) {
    return 0;
  }

}
