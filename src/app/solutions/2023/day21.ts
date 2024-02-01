import { Solver } from "src/app/models/solver.model";
import { getLines, getStringMatrix } from "src/app/utils/input";

export default class Day21 extends Solver {

  data = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

  DIM = 131;
  FREE = 0;
  ROCK = 1;

  public override part1(rawInput: string) {
    const matrix = getStringMatrix(rawInput);
    let TARGET = "T";
    let FUTURE = "F";
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] == "S") {
          matrix[row][col] = "F";
          break;
        }
      }
    }
    let step = 0;
    while (true) {
      step += 1;
      if (TARGET == "T") {
        TARGET = "F";
        FUTURE = "T";
      } else {
        TARGET = "T";
        FUTURE = "F";
      }
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] != TARGET) {
            continue;
          }
          matrix[row][col] = ".";
          this.tryWalk1(matrix, row - 1, col, FUTURE);
          this.tryWalk1(matrix, row + 1, col, FUTURE);
          this.tryWalk1(matrix, row, col - 1, FUTURE);
          this.tryWalk1(matrix, row, col + 1, FUTURE);
        }
      }
      if (step == 64) {
        break;
      }
    }
    let count = 0;
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] == "." || matrix[row][col] == "#") {
          continue;
        }
        count += 1;
      }
    }
    return count;
  }

  public override part2(rawInput: string) {
    const STEPS = 26501365;
    let MAP = new Uint8Array(this.DIM * this.DIM);
    let homeRow = 0;
    let homeCol = 0;
    const lines = getLines(rawInput);
    for (let row = 0; row < this.DIM; row++) {
      for (let col = 0; col < this.DIM; col++) {
        const index = row * this.DIM + col
        if (lines[row][col] == "#") {
          MAP[index] = this.ROCK;
          continue;
        }
        if (lines[row][col] == "S") {
          homeRow = row;
          homeCol = col;
        }
      }
    }
    const squareA = this.walkAndCount(MAP, homeRow, homeCol, 129);
    const squareB = this.walkAndCount(MAP, homeRow, homeCol, 130);
    const smallTriangleA = this.walkAndCount(MAP, 0, 0, 64);
    const smallTriangleB = this.walkAndCount(MAP, 0, 130, 64);
    const smallTriangleC = this.walkAndCount(MAP, 130, 0, 64);
    const smallTriangleD = this.walkAndCount(MAP, 130, 130, 64);
    const bigTriangleA = this.walkAndCount(MAP, 0, 0, 195);
    const bigTriangleB = this.walkAndCount(MAP, 0, 130, 195);
    const bigTriangleC = this.walkAndCount(MAP, 130, 0, 195);
    const bigTriangleD = this.walkAndCount(MAP, 130, 130, 195);
    const tailA = this.walkAndCount(MAP, 0, 65, 130);
    const tailB = this.walkAndCount(MAP, 65, 0, 130);
    const tailC = this.walkAndCount(MAP, 65, 130, 130);
    const tailD = this.walkAndCount(MAP, 130, 65, 130);
    const branche = Math.floor(STEPS / this.DIM);

    let numberOfSquaresA = 1;
    let numberOfSquaresB = 0;
    let amount = 0;

    for (let n = 0; n < branche; n++) {
      if (n % 2 == 0) {
        numberOfSquaresA += amount;
      } else {
        numberOfSquaresB += amount;
      }
      amount += 4;
    }
    const rectangles = numberOfSquaresA * squareA + numberOfSquaresB * squareB;
    const bigTriangles = bigTriangleA + bigTriangleB + bigTriangleC + bigTriangleD;
    const smallTriangles = smallTriangleA + smallTriangleB + smallTriangleC + smallTriangleD;
    const tails = tailA + tailB + tailC + tailD;
    const result = rectangles + (branche - 1) * bigTriangles + branche * smallTriangles + tails;
    return result;
  }



  tryWalk1(matrix: string[][], row: number, col: number, future: string) {
    if (row < 0 || col < 0 || row > matrix.length - 1 || col > matrix[0].length - 1 || matrix[row][col] == "#") {
      return;
    }
    matrix[row][col] = future;
  }

  tryWalk2(map: Uint8Array, row: number, col: number, future: number) {
    const index = row * this.DIM + col;
    if (row < 0 || col < 0 || row > this.DIM - 1 || col > this.DIM - 1 || map[index] == this.ROCK) {
      return;
    }
    map[index] = future;
  }

  walkAndCount(MAP: Uint8Array, startRow: number, startCol: number, maxStep: number) {
    const map = this.walk(MAP, startRow, startCol, maxStep);
    return this.countPlots(map);
  }

  walk(MAP: Uint8Array, startRow: number, startCol: number, maxStep: number) {
    let TARGET = 2;
    let FUTURE = 3;
    const map = this.cloneVirginMap(MAP);
    const index = startRow * this.DIM + startCol;
    map[index] = TARGET;
    let step = 0;

    while (true) {
      step += 1;
      if (step % 2 == 0) {
        TARGET = 3;
        FUTURE = 2;
      } else {
        TARGET = 2;
        FUTURE = 3;
      }
      for (let row = 0; row < this.DIM; row++) {
        for (let col = 0; col < this.DIM; col++) {
          const index = row * this.DIM + col;
          if (map[index] != TARGET) {
            continue;
          }
          map[index] = this.FREE;
          this.tryWalk2(map, row - 1, col, FUTURE);
          this.tryWalk2(map, row + 1, col, FUTURE);
          this.tryWalk2(map, row, col - 1, FUTURE);
          this.tryWalk2(map, row, col + 1, FUTURE);
        }
      }
      if (step == maxStep) {
        return map;
      }
    }
  }

  cloneVirginMap(MAP: Uint8Array): Uint8Array {
    const map = new Uint8Array(this.DIM * this.DIM);
    for (let n = 0; n < map.length; n++) {
      map[n] = MAP[n];
    }
    return map;
  }

  countPlots(map: Uint8Array) {
    let count = 0;
    for (let row = 0; row < this.DIM; row++) {
      for (let col = 0; col < this.DIM; col++) {
        const index = row * this.DIM + col;
        if (map[index] == this.FREE || map[index] == this.ROCK) {
          continue;
        }
        count += 1;
      }
    }
    return count;
  }

}
