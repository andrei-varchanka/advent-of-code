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
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == "S") {
          matrix[i][j] = "F";
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
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] != TARGET) {
            continue;
          }
          matrix[i][j] = ".";
          this.tryWalk1(matrix, i - 1, j, FUTURE);
          this.tryWalk1(matrix, i + 1, j, FUTURE);
          this.tryWalk1(matrix, i, j - 1, FUTURE);
          this.tryWalk1(matrix, i, j + 1, FUTURE);
        }
      }
      if (step == 64) {
        break;
      }
    }
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == "." || matrix[i][j] == "#") {
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
    let startX = 0;
    let startY = 0;
    const lines = getLines(rawInput);
    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        const index = i * this.DIM + j
        if (lines[i][j] == "#") {
          MAP[index] = this.ROCK;
          continue;
        }
        if (lines[i][j] == "S") {
          startX = i;
          startY = j;
        }
      }
    }
    const squareA = this.walkAndCount(MAP, startX, startY, 129);
    const squareB = this.walkAndCount(MAP, startX, startY, 130);
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



  tryWalk1(matrix: string[][], i: number, j: number, future: string) {
    if (i < 0 || j < 0 || i > matrix.length - 1 || j > matrix[0].length - 1 || matrix[i][j] == "#") {
      return;
    }
    matrix[i][j] = future;
  }

  tryWalk2(map: Uint8Array, i: number, j: number, future: number) {
    const index = i * this.DIM + j;
    if (i < 0 || j < 0 || i > this.DIM - 1 || j > this.DIM - 1 || map[index] == this.ROCK) {
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
      for (let i = 0; i < this.DIM; i++) {
        for (let j = 0; j < this.DIM; j++) {
          const index = i * this.DIM + j;
          if (map[index] != TARGET) {
            continue;
          }
          map[index] = this.FREE;
          this.tryWalk2(map, i - 1, j, FUTURE);
          this.tryWalk2(map, i + 1, j, FUTURE);
          this.tryWalk2(map, i, j - 1, FUTURE);
          this.tryWalk2(map, i, j + 1, FUTURE);
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
    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        const index = i * this.DIM + j;
        if (map[index] == this.FREE || map[index] == this.ROCK) {
          continue;
        }
        count += 1;
      }
    }
    return count;
  }

}
