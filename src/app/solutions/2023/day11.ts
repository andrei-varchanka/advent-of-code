import { Solver } from "src/app/models/solver.model";

type Coordinate = { x: number, y: number };

export default class Day11 extends Solver {

  data = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

  public override part1(rawInput: string) {
    // let matrix = this.data.split('\n').map(line => line.split(''));
    let matrix = rawInput.split('\r\n').map(line => line.split(''));
    const [emptyRows, emptyColumns] = this.findEmptyLines(matrix);
    matrix = this.expandMatrix(matrix, emptyRows, emptyColumns);
    console.log(matrix);
    const coordinates = this.geGalaxiesCoordinates(matrix);
    return this.countDistances(coordinates);
  }

  public override part2(rawInput: string) {

    return 0;
  }

  findEmptyLines(matrix: string[][]): [Array<boolean>, Array<boolean>] {
    const emptyColumns = new Array(matrix[0].length).fill(true);
    const emptyRows = new Array(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
      let isRowEmpty = true;
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == '#') {
          isRowEmpty = false;
          emptyColumns[j] = false;
        }
      }
      emptyRows[i] = isRowEmpty;
    }
    return [emptyRows, emptyColumns];
  }

  expandMatrix(matrix: string[][], emptyRows: boolean[], emptyColumns: boolean[]): string[][] {
    let bias = 0;
    for (let i = 0; i < emptyRows.length; i++) {
      if (emptyRows[i]) {
        const emptyRow = new Array(matrix[i].length).fill('.');
        matrix.splice(i + bias, 0, emptyRow);
        bias++;
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      let emptyCols = [...emptyColumns];
      for (let j = 0; j < matrix[i].length; j++) {
        if (emptyCols[j]) {
          emptyCols.splice(j, 0, false);
          matrix[i].splice(j, 0, '.');
          j++;
        }
      }
    }
    return matrix;
  }

  geGalaxiesCoordinates(matrix: string[][]): Coordinate[] {
    const coordinates: Coordinate[] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == '#') {
          coordinates.push({x: i, y: j});
        }
      }
    }
    return coordinates;
  }

  countDistances(coordinates: Coordinate[]): number {
    let sum = 0;
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        sum += this.getDistance(coordinates[i], coordinates[j]);
      }
    }
    return sum;
  }

  getDistance(a: Coordinate, b: Coordinate): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

}
