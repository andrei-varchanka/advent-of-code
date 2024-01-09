import { Solver } from "src/app/models/solver.model";
import { sha256 } from 'js-sha256';

enum Direction { NORTH, WEST, SOUTH, EAST };

export default class Day14 extends Solver {

  data = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

  public override part1(rawInput: string) {
    // const matrix = this.data.split('\n').map(row => row.split(''));
    let matrix = rawInput.split('\r\n').map(row => row.split(''));
    let load = 0;
    matrix = this.verticalTilt(matrix, Direction.NORTH);
    load += this.countLoad(matrix);
    return load;
  }

  public override part2(rawInput: string) {
    let matrix = rawInput.split('\r\n').map(row => row.split(''));
    const seenStorage = new Set();
    const seenStorageMap = new Map();
    let load = 0;
    for (let i = 0; i < 1000000000; i++) {
      matrix = this.doCycle(matrix);
      const hash = this.hashMatrix(matrix);

      if (seenStorage.has(hash)) {
        const loopOrigin = seenStorageMap.get(hash);
        const loopLength = i - loopOrigin;

        const remaining = 1000000000 - 1 - i;
        const remainingMod = remaining % loopLength;

        for (let j = 0; j < remainingMod; j++) {
          matrix = this.doCycle(matrix);
        }

       load = this.countLoad(matrix);

        break;
      }
      seenStorage.add(hash);
      seenStorageMap.set(hash, i);
    }
    return load;
  }

  doCycle(matrix: string[][]): string[][] {
    matrix = this.verticalTilt(matrix, Direction.NORTH);
    matrix = this.horizontalTilt(matrix, Direction.WEST);
    matrix = this.verticalTilt(matrix, Direction.SOUTH);
    matrix = this.horizontalTilt(matrix, Direction.EAST);
    return matrix;
  }

  verticalTilt(matrix: string[][], direction: Direction): string[][] {
    for (let i = 0; i < matrix[0].length; i++) {
      let column = matrix.map(row => row[i]);
      let movableAreas = column.join('').split('#');
      movableAreas = movableAreas.map(area => {
        let areaArr = area.split('').sort();
        if (direction == Direction.NORTH) {
          areaArr = areaArr.reverse();
        }
        return areaArr.join('');
      });
      column = movableAreas.join('#').split('');
      for (let j = 0; j < column.length; j++) {
        matrix[j][i] = column[j];
      }
    }
    return matrix;
  }

  horizontalTilt(matrix: string[][], direction: Direction): string[][] {
    for (let i = 0; i < matrix.length; i++) {
      let movableAreas = matrix[i].join('').split('#');
      movableAreas = movableAreas.map(area => {
        let areaArr = area.split('').sort();
        if (direction == Direction.WEST) {
          areaArr = areaArr.reverse();
        }
        return areaArr.join('');
      });
      matrix[i] = movableAreas.join('#').split('');
    }
    return matrix;
  }

  countLoad(matrix: string[][]): number {
    let load = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == 'O') {
          load += matrix.length - i;
        }
      }
    }
    return load;
  }

  hashMatrix(matrix: string[][]) {
    return sha256.update(matrix.map(row => row.join("")).join("\n")).hex();
  }

}
