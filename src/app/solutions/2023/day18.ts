import { Solver } from "src/app/models/solver.model";
import { Coordinate } from "src/app/models/types";
import { getLines, getNumericMatrix } from "src/app/utils/input";

enum Direction {
  U = 'U',
  R = 'R',
  D = 'D',
  L = 'L'
};

type Command = {
  direction: Direction;
  steps: number;
}

type Range = {
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  len: number,
  direction: Direction
}

export default class Day18 extends Solver {

  data = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

  dirs = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };

  public override part1(rawInput: string) {
    const commands: Command[] = this.getCommands1(rawInput);
    const pool = new Map([['0, 0', { x: 0, y: 0 }]]);
    let position: Coordinate = { x: 0, y: 0 };
    for (const command of commands) {
      const [xDir, yDir] = this.dirs[command.direction];
      for (let i = 0; i < command.steps; i++) {
        position = {
          x: position.x + xDir,
          y: position.y + yDir,
        }
        pool.set(`${position.x}, ${position.y}`, { x: position.x, y: position.y });
      }
    }
    const maxRow = [...pool.values()].reduce((a, b) => a.y > b.y ? a : b, { x: 0, y: 0 }).y;
    const maxCol = [...pool.values()].reduce((a, b) => a.x > b.x ? a : b, { x: 0, y: 0 }).x;
    const minRow = [...pool.values()].reduce((a, b) => a.y < b.y ? a : b, { x: 0, y: 0 }).y;
    const minCol = [...pool.values()].reduce((a, b) => a.x < b.x ? a : b, { x: 0, y: 0 }).x;
    let goodPoint;
    for (let y = minRow; y <= maxRow && !goodPoint; y++) {
      for (let x = minCol; x <= maxCol && !goodPoint; x++) {
        const isWall = pool.has(`${x}, ${y}`);
        if (!goodPoint && !isWall) {
          if (pool.has(`${x - 1}, ${y}`) && pool.has(`${x}, ${y - 1}`)) {
            goodPoint = { x, y };
          }
        }
      }
    }

    let toVisit = new Set([`${(goodPoint as Coordinate).x}, ${(goodPoint as Coordinate).y}`]);
    for (const point of toVisit) {
      if (pool.has(point)) { continue; }
      const [pointX, pointY] = point.split(', ').map(Number);
      pool.set(point, { x: pointX, y: pointY });
      for (const curDir of ['U', 'D', 'L', 'R']) {
        const [xDir, yDir] = this.dirs[curDir as keyof typeof this.dirs];
        const nextX = pointX + xDir;
        const nextY = pointY + yDir;
        toVisit.add(`${nextX}, ${nextY}`);
      }
    }
    return pool.size;
  }

  public override part2(rawInput: string) {
    const commands: Command[] = this.getCommands2(rawInput);
    let position: Coordinate = { x: 0, y: 0 };
    const ranges: Range[] = [];
    for (const command of commands) {
      const [xDir, yDir] = this.dirs[command.direction];
      let range: Range = {
        xStart: position.x,
        yStart: position.y,
        xEnd: position.x + xDir * command.steps,
        yEnd: position.y + yDir * command.steps,
        len: command.steps + 1,
        direction: command.direction,
      }
      ranges.push(range);
      position = {
        x: position.x + xDir * command.steps,
        y: position.y + yDir * command.steps
      }
    }

    const minCol = ranges.reduce((acc, cur) => Math.min(cur.xStart, cur.xEnd, acc), 0);
    const leftMost: Range = ranges.find(x => x.xStart === minCol && (x.direction === Direction.U || x.direction === Direction.D)) as Range;
    let matchingDir = leftMost.direction === Direction.U ? Direction.D : Direction.U;
    let interior = 0;
    const wallSize = ranges.reduce((acc, cur) => {
      if (cur.direction === matchingDir || cur.direction === leftMost.direction) {
        return acc + cur.len;
      }
      return acc + cur.len - 2;
    }, 0);

    const rightWalls: Range[] = ranges.filter(opWall => opWall.direction === matchingDir).sort((a, b) => (a.xStart - b.xStart));
    const leftWalls = ranges.filter(x => x.direction === leftMost.direction).sort((a, b) => (a.xStart - b.xStart));
    const blockingWalls = ranges.filter(x => x.direction === Direction.R || x.direction === Direction.L);
    for (const curWall of leftWalls) {
      const topPoint = Math.min(curWall.yStart, curWall.yEnd);
      const bottomPoint = Math.max(curWall.yStart, curWall.yEnd);
      for (let y = topPoint; y <= bottomPoint; y++) {
        if (y === topPoint || y === bottomPoint) {
          const isBlocked = blockingWalls.find(blocker => 
            blocker.yEnd === y 
            && ((blocker.direction === Direction.L && blocker.xEnd === curWall.xStart) || (blocker.direction === Direction.R && blocker.xStart === curWall.xStart)))
          if (isBlocked) {
            continue;
          }
        }
        const matchingWall: Range = rightWalls.find(opWall => opWall.xStart > curWall.xStart && Math.min(opWall.yStart, opWall.yEnd) <= y && Math.max(opWall.yStart, opWall.yEnd) >= y) as Range;
        interior += matchingWall.xStart - curWall.xStart - 1;
      }
    }

    return interior + wallSize;
  }

  getCommands1(data: string): Command[] {
    return getLines(data).map(str => {
      const arr = str.split(' ');
      return {
        direction: arr[0] as Direction,
        steps: +arr[1],
        color: arr[2].substring(1, arr[2].length - 1)
      }
    });
  }

  getCommands2(data: string): Command[] {
    return getLines(data).map(x => {
      const color = x.split(' ')[2];
      const hex = color.substring(1, color.length - 1);
      const steps = parseInt(hex.substring(1, 6), 16);
      const dir = parseInt(hex.substring(6, 7), 16);
      return {
        direction: dir === 0 ? Direction.R : dir === 1 ? Direction.D : dir === 2 ? Direction.L : Direction.U,
        steps: Number(steps),
      }
    });
  }

}
