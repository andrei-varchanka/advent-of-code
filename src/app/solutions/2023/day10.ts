import { Solver } from "src/app/models/solver.model";

type Coordinate = { x: number, y: number };
type Connections = {
  top: boolean,
  right: boolean,
  bottom: boolean,
  left: boolean
}
enum Direction { TOP, RIGHT, BOTTOM, LEFT };

export default class Day10 extends Solver {

  data = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;


  data2 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

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
    const connections = this.tryDirections(matrix, cur);
    if (connections.top) {
      cur.x--;
    } else if (connections.right) {
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

  public override part2(rawInput: string) {
    const matrix = rawInput.split('\r\n').map(line => line.split(''));
    const startX = matrix.findIndex(line => line.includes('S'));
    const startY = matrix[startX].findIndex(el => el == 'S');
    let cur: Coordinate = { x: startX, y: startY };
    let prev: Coordinate = { x: startX, y: startY };
    const connections = this.tryDirections(matrix, cur);
    matrix[cur.x][cur.y] = this.getStartValue(connections);
    if (connections.top) {
      cur.x--;
    } else if (connections.right) {
      cur.y++;
    } else {
      // Bottom and left are valid
      cur.x++;
    }
    const pipeCoordinates: Coordinate[] = [];
    pipeCoordinates.push(cur);

    while (!(cur.x == startX && cur.y == startY)) {
      [cur, prev] = this.makeStep(matrix, cur, prev);
      pipeCoordinates.push(cur);
    }
    return this.countEnclosedTiles(matrix, pipeCoordinates);
  }

  tryDirections(matrix: string[][], coord: Coordinate) {
    const connections = {
      top: false,
      right: false,
      bottom: false,
      left: false
    }
    if (matrix[coord.x - 1] && coord.x - 1 >= 0) {
      connections.top = this.topConnection.includes(matrix[coord.x - 1][coord.y]);
    }
    if (matrix[coord.x][coord.y + 1]) {
      connections.right = this.rightConnection.includes(matrix[coord.x][coord.y + 1]);
    }
    if (matrix[coord.x + 1]) {
      connections.bottom = this.bottomConnection.includes(matrix[coord.x + 1][coord.y]);
    }
    if (matrix[coord.x][coord.y - 1] && coord.y - 1 >= 0) {
      connections.left = this.leftConnection.includes(matrix[coord.x][coord.y - 1]);
    }
    return connections;
  }

  getStartValue(connections: Connections): string {
    if (connections.top && connections.right) {
      return 'L';
    }
    if (connections.top && connections.bottom) {
      return '|';
    }
    if (connections.top && connections.left) {
      return 'J';
    }
    if (connections.right && connections.bottom) {
      return 'F';
    }
    if (connections.right && connections.left) {
      return '-';
    }
    if (connections.bottom && connections.left) {
      return '7';
    }
    return '';
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

  countEnclosedTiles(matrix: string[][], pipeCoordinates: Coordinate[]): number {
    // If we encounter a pipe, that means next ground tiles on the other side of the tile 
    // will be inside the loop, and we count it. If we encounter another pipe, the tiles after that are outside the loop,
    // and we will not count it.
    // To count pipes, |, F--J and L--7 with any number of '-' between F and J count as pipe walls. -, F--7 and L--J do not count
    // as pipe walls because they run horizontal to the row and don't verticaly cross the row.
    // When we're inside the loop, the pipe loop can only begin with F or L joints. We can't see - 7 J if we are traversing
    // left to right, because it woudn't be attached to anything.
    let counter = 0;
    let isInside = false;
    let startingJoint: string | null = null;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let value = matrix[i][j];
        if (!pipeCoordinates.find(pipeCoord => pipeCoord.x == i && pipeCoord.y == j)) {
          // We're not in the pipe and inside the loop, possibly count the territory
          if (isInside) {
            counter++;
          }
        } else {
          // We're in the pipe
          if (value == '|') {
            isInside = !isInside;
          } else if (value == 'F' || value == 'L') {
            startingJoint = value;
          } else if (value == 'J') {
            if (startingJoint == 'F') {
              isInside = !isInside;
            }
            startingJoint = null;
          } else if (value == '7') {
            if (startingJoint == 'L') {
              isInside = !isInside;
            }
            startingJoint = null;
          }
        }
      }
    }

    return counter;
  }

}
