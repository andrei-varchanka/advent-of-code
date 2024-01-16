import { Solver } from "src/app/models/solver.model";

enum Direction { TOP, RIGHT, BOTTOM, LEFT };

type VectorCoordinate = {
  direction: Direction,
  x: number,
  y: number
}

export default class Day16 extends Solver {

  grid: string[][] = [];

  public override part1(rawInput: string) {
    this.grid = rawInput.split('\r\n').map(row => row.split(''));
    console.log(this.grid);
    let vc: VectorCoordinate = {
      direction: Direction.RIGHT,
      x: 0,
      y: 0
    };
    return this.getCount(vc);
  }

  public override part2(rawInput: string) {
    this.grid = rawInput.split('\r\n').map(row => row.split(''));
    console.log(this.grid);
    let vc: VectorCoordinate = {
      direction: Direction.RIGHT,
      x: 0,
      y: 0
    };
    let maxCount = 0;
    for (let i = 0; i < this.grid.length; i++) {
      maxCount = Math.max(maxCount, this.getCount({x: i, y: 0, direction: Direction.RIGHT}));
    }
    for (let i = 0; i < this.grid.length; i++) {
      maxCount = Math.max(maxCount, this.getCount({x: i, y: this.grid[0].length - 1, direction: Direction.LEFT}));
    }
    for (let i = 0; i < this.grid[0].length; i++) {
      maxCount = Math.max(maxCount, this.getCount({x: 0, y: i, direction: Direction.BOTTOM}));
    }
    for (let i = 0; i < this.grid[0].length; i++) {
      maxCount = Math.max(maxCount, this.getCount({x: this.grid.length - 1, y: i, direction: Direction.TOP}));
    }
    return maxCount;
  }

  getCount(vc: VectorCoordinate) {
    const stateStorage: Set<string> = new Set<string>();
    const energizedSet: Set<string> = new Set<string>();
    this.runBeam(vc, stateStorage, energizedSet);
    return energizedSet.size;
  }

  runBeam(vc: VectorCoordinate, stateStorage: Set<string>, energizedSet: Set<string>) {
    while (!stateStorage.has(JSON.stringify(vc))) {
      stateStorage.add(JSON.stringify(vc));
      energizedSet.add(JSON.stringify({ x: vc.x, y: vc.y }));
      const vcs = this.makeStep(vc);
      vcs.forEach((vc: VectorCoordinate) => {
        this.runBeam(vc, stateStorage, energizedSet);
      });
    }
  }

  makeStep(vc: VectorCoordinate): VectorCoordinate[] {
    const tile = this.grid[vc.x][vc.y];
    let newVc = { ...vc };
    let newVc2 = { ...vc };
    let oneBeam = false;
    if (
      tile == '.'
      || (tile == '-' && (vc.direction == Direction.LEFT || vc.direction == Direction.RIGHT))
      || (tile == '|' && (vc.direction == Direction.TOP || vc.direction == Direction.BOTTOM))
    ) {
      oneBeam = true;
      if (vc.direction == Direction.RIGHT) {
        newVc.y++;
      }
      if (vc.direction == Direction.BOTTOM) {
        newVc.x++;
      }
      if (vc.direction == Direction.LEFT) {
        newVc.y--;
      }
      if (vc.direction == Direction.TOP) {
        newVc.x--;
      }
    }
    if (tile == '\\') {
      oneBeam = true;
      if (vc.direction == Direction.RIGHT) {
        newVc.x++;
        newVc.direction = Direction.BOTTOM;
      }
      if (vc.direction == Direction.BOTTOM) {
        newVc.y++;
        newVc.direction = Direction.RIGHT;
      }
      if (vc.direction == Direction.LEFT) {
        newVc.x--;
        newVc.direction = Direction.TOP;
      }
      if (vc.direction == Direction.TOP) {
        newVc.y--;
        newVc.direction = Direction.LEFT
      }
    }
    if (tile == '/') {
      oneBeam = true;
      if (vc.direction == Direction.RIGHT) {
        newVc.x--;
        newVc.direction = Direction.TOP;
      }
      if (vc.direction == Direction.BOTTOM) {
        newVc.y--;
        newVc.direction = Direction.LEFT;
      }
      if (vc.direction == Direction.LEFT) {
        newVc.x++;
        newVc.direction = Direction.BOTTOM;
      }
      if (vc.direction == Direction.TOP) {
        newVc.y++;
        newVc.direction = Direction.RIGHT;
      }
    }
    if (oneBeam) {
      return [newVc].filter((item) => this.checkGridBorders(item));
    }
    // else two beams
    if (tile == '-') {
      newVc.y--;
      newVc.direction = Direction.LEFT;
      newVc2.y++;
      newVc2.direction = Direction.RIGHT;
    }
    if (tile == '|') {
      newVc.x--;
      newVc.direction = Direction.TOP;
      newVc2.x++;
      newVc2.direction = Direction.BOTTOM;
    }
    return [newVc, newVc2].filter((item) => this.checkGridBorders(item));
  }

  checkGridBorders(vc: VectorCoordinate) {
    return vc.x >= 0 && vc.y >= 0 && vc.x < this.grid.length && vc.y < this.grid[0].length;
  }

}
