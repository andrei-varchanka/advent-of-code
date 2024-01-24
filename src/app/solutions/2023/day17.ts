import { Solver } from "src/app/models/solver.model";
import { Coordinate } from "src/app/models/types";
import { getNumericMatrix } from "src/app/utils/input";

type State = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  straightSteps: number;
  hl: number;
  fs: boolean; // not start
};

export default class Day17 extends Solver {

  data = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

  delta: [number, number][] = [
    [-1, 0], // N
    [0, 1], // E
    [0, -1], // W
    [1, 0], // S
  ];

  target: Coordinate = {x: 0, y: 0};

  public override part1(rawInput: string) {
    const matrix = getNumericMatrix(this.data);
    this.target = {
      x: matrix.length - 1,
      y: matrix[0].length - 1
    }
    return this.findHeatLoss(matrix, 3, 0);
  }

  public override part2(rawInput: string) {
    const matrix = getNumericMatrix(this.data);
    this.target = {
      x: matrix.length - 1,
      y: matrix[0].length - 1
    }
    return this.findHeatLoss(matrix, 10, 4);
  }

  findHeatLoss(matrix: number[][], maxStraightSteps: number, minStepsBeforeTurn: number) {
    const start: State = { x: 0, y: 0, dx: 0, dy: 0, straightSteps: 0, hl: 0, fs: true };
    const toVisit: State[] = [start];
    const seen = new Set<string>();
    while (toVisit.length) {
      const state = toVisit.shift()!;
      const { x, y, dx, dy, straightSteps, hl, fs } = state;
      if (x === this.target.x && y === this.target.y && minStepsBeforeTurn <= straightSteps) {
        return hl;
      }
      const key = JSON.stringify(state);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      // Excluding first position
      // Follow same direction for min step
      if (!fs && straightSteps < maxStraightSteps) {
        const nx = x + dx;
        const ny = y + dy;
        if (this.isInBound({x: nx, y: ny})) {
          this.pushToQueue(toVisit, nx, ny, dx, dy, straightSteps + 1, hl + matrix[nx][ny]);
        }
      }

      if (fs || minStepsBeforeTurn <= straightSteps) {
        // Take left or right
        for (const [ndx, ndy] of this.delta) {
          if (
            // same direction - avoid it, covered above
            (ndx === dx && ndy === dy) ||
            // same direction - avoid it, covered above
            (ndx === dx * -1 && ndy === dy * -1)
          ) {
            continue;
          }
          const nx = x + ndx;
          const ny = y + ndy;
          if (this.isInBound({x: nx, y: ny})) {
            this.pushToQueue(toVisit, nx, ny, ndx, ndy, 1, hl + matrix[nx][ny]);
          }
        }
      }
    }
    return -1;
  }

  isInBound(coord: Coordinate): boolean {
    return 0 <= coord.x && coord.x <= this.target.x && 0 <= coord.y && coord.y <= this.target.y;
  }
      

  pushToQueue(toVisit: State[], x: number, y: number, dx: number, dy: number, straightSteps: number, hl: number) {
    const state: State = { x, y, dx, dy, straightSteps, hl, fs: false };
    for (let i = toVisit.length - 1; 0 <= i; i--) {
      if (toVisit[i].hl <= state.hl) {
        toVisit.splice(i + 1, 0, state);
        return;
      }
    }
    if (toVisit.length === 0) {
      toVisit.push(state);
      return;
    }
    toVisit.unshift(state);
  }
}
