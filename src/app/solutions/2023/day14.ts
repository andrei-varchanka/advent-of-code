import { Solver } from "src/app/models/solver.model";

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
    const matrix = rawInput.split('\r\n').map(row => row.split(''));
    let load = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      let column = matrix.map(row => row[i]);
      let movableAreas = column.join('').split('#');
      movableAreas = movableAreas.map(area => area.split('').sort().reverse().join(''));
      column = movableAreas.join('#').split('');
      load += this.countLoad(column);
    }
    return load;
  }

  public override part2(rawInput: string) {
    return 0;
  }

  countLoad(column: string[]): number {
    let load = 0;
    for (let i = 0; i < column.length; i++) {
      if (column[i] == 'O') {
        load += column.length - i;
      }
    }
    return load;
  }

}
