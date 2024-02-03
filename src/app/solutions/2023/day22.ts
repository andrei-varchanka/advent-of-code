import { Solver } from "src/app/models/solver.model";
import { getLines, getStringMatrix } from "src/app/utils/input";

type Brick = {
  id: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  z1: number,
  z2: number,
  holders: number[],
  mounteds: number[]
}

export default class Day22 extends Solver {

  data = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

  bricks: Record<number, Brick> = {};

  levels: Record<number, Brick[]> = {};

  public override part1(rawInput: string) {
    this.processInput(rawInput);
    this.placeBricksOnLevels();
    this.settleBricks();
    return this.countUnneededBricks();
  }

  public override part2(rawInput: string) {
    return 0;
  }

  processInput(input: string) {
    let top = 0;
    const lines = getLines(input);
    for (let id = 0; id < lines.length; id++) {
      // 1,0,1~1,2,1
      const groups = lines[id].trim().split("~");
      const coordA = groups[0].split(",").map(Number);
      const coordB = groups[1].split(",").map(Number);
      const brick: Brick = {
        id: id,
        x1: coordA[0],
        x2: coordB[0],
        y1: coordA[1],
        y2: coordB[1],
        z1: coordA[2],
        z2: coordB[2],
        holders: [],
        mounteds: []
      }
      this.bricks[id] = brick;
      top = Math.max(top, brick.z1, brick.z2);
    }
    for (let n = 1; n <= top; n++) {
      this.levels[n] = [];
    }
  }

  placeBricksOnLevels() {
    for (const key in this.bricks) {
      this.placeBrickOnLevels(this.bricks[key]);
    }
  }

  placeBrickOnLevels(brick: Brick) {
    for (let n = brick.z1; n <= brick.z2; n++) {
      this.levels[n].push(brick);
    }
  }

  settleBricks() {
    let n = 1;
    while (true) {
      n++;
      const level = this.levels[n];
      if (level == undefined) {
        return;
      }
      const bricks = level.slice();
      for (const brick of bricks) {
        this.settleBrick(brick, n);
      }
    }
  }

  settleBrick(master: Brick, floor: number) {
    if (master.z1 != floor) {  // floor does not match the bottom of the (tower) brick
      return;
    }
    while (true) {
      floor--;
      const level = this.levels[floor];
      if (level == undefined) { // no holder found   
        this.bringBrickDown(master, 1);
        return;
      }
      for (const brick of level) {
        if (!this.bricksMatch(master, brick)) {
          continue;
        }
        master.holders.push(brick.id);
        brick.mounteds.push(master.id);
      }
      if (master.holders.length == 0) {
        continue;
      }
      const newFloor = floor + 1;
      if (master.z1 != newFloor) {
        this.bringBrickDown(master, newFloor);
      }
      return
    }
  }

  bringBrickDown(brick: Brick, newFloor: number) {
    this.removeBrickFromLevels(brick)
    const delta = brick.z2 - brick.z1;
    brick.z1 = newFloor;
    brick.z2 = brick.z1 + delta;
    this.placeBrickOnLevels(brick);
  }

  bricksMatch(a: Brick, b: Brick) {
    if (a.x1 > b.x2) { return false }
    if (a.x2 < b.x1) { return false }
    if (a.y1 > b.y2) { return false }
    if (a.y2 < b.y1) { return false }
    return true;
  }

  removeBrickFromLevels(brick: Brick) {
    for (let n = brick.z1; n <= brick.z2; n++) {
      const level = this.levels[n];
      const index = level.indexOf(brick);
      level.splice(index, 1);
    }
  }

  countUnneededBricks() {
    let count = 0;
    for (const key in this.bricks) {
      if (!this.isNecessaryBrick(this.bricks[key])) {
        count++;
      }
    }
    return count;
  }

  isNecessaryBrick(candidate: Brick) {
    for (const id of candidate.mounteds) {
      const mounted = this.bricks[id];
      if (mounted.holders.length == 1) {
        return true;
      }
    }
    return false;
  }
}
