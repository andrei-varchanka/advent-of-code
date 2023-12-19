import { Solver } from "src/app/models/solver.model";

export default class Day22 extends Solver {

  directionToVector = {
    'U': [-1, 0],
    'D': [1, 0],
    'L': [0, -1],
    'R': [0, 1],
  }

  directions = ['U', 'R', 'D', 'L'];

  maxR = -Infinity;
  maxC = -Infinity;
  minR = Infinity;
  minC = Infinity;

  current: [number, number, keyof typeof this.directionToVector] = [Infinity, Infinity, 'R'];

  world = new Map<string, '.' | '#'>();

  rawMoves: string = '';

  public override part1(rawInput: string) {
    this.parseInput(rawInput);
    return this.walk();
  }

  public override part2(rawInput: string) {
    this.current = [Infinity, Infinity, 'R'];
    this.parseInput(rawInput);
    return this.walk(true);
  }

  parseInput(data: string) {
    const [rawMap, rawMoves] = data.split('\r\n\r\n');
    this.rawMoves = rawMoves;
    for (const [r, line] of rawMap.split('\r\n').entries()) {
      for (const [c, char] of [...line].entries()) {
        if (r + 1 > this.maxR) this.maxR = r + 1;
        if (r + 1 < this.minR) this.minR = r + 1;
        if (c + 1 > this.maxC) this.maxC = c + 1;
        if (c + 1 < this.minC) this.minC = c + 1;

        if (!char.trim()) continue;
        this.world.set(`${r + 1},${c + 1}`, char as '.' | '#');
        if (char === '.' && this.current[0] === Infinity && this.current[1] === Infinity) {
          this.current = [r + 1, c + 1, 'R'];
        }
      }
    }
  }

  walk(isCube?: boolean) {

    let digits = '';
    for (let i = 0; i < this.rawMoves.length; i++) {
      const char = this.rawMoves[i];
      if (char === 'R' || char === 'L') {
        if (isCube) {
          this.makeMoveCube(parseInt(digits, 10));
        } else {
          this.makeMove(parseInt(digits, 10));
        }
        digits = '';
        if (char === 'L') {
          // @ts-ignore
          this.current[2] = this.directions[(this.directions.indexOf(this.current[2]) + 3) % 4];
        } else {
          // @ts-ignore
          this.current[2] = this.directions[(this.directions.indexOf(this.current[2]) + 1) % 4];
        }
        digits = '';
      } else {
        digits += char;
      }
    }
    if (digits) {
      if (isCube) {
        this.makeMoveCube(parseInt(digits, 10));
      } else {
        this.makeMove(parseInt(digits, 10));
      }
    }

    const directionToScore = {
      'U': 3,
      'D': 1,
      'L': 2,
      'R': 0,
    }
    return 1000 * this.current[0] + (4 * this.current[1]) + directionToScore[this.current[2]];
  }

  visualize() {
    let lines: string[] = []
    for (let r = this.minR; r <= this.maxR; r++) {
      let line = '';
      for (let c = this.minC; c <= this.maxC; c++) {
        const char = this.world.get(`${r},${c}`);
        if (char === '#') {
          line += '#';
        } else if (r === this.current[0] && c === this.current[1]) {
          line += this.current[2];
        }
        else if (char === '.') {
          line += '.';
        } else {
          line += ' ';
        }
      }
      lines.push(line);
    }
  }

  findEdgeFrom(r: number, c: number, dir: keyof typeof this.directionToVector): '.' | '#' | undefined {
    const [dr, dc] = this.directionToVector[dir];
    let last;
    let lastR = r;
    let lastC = c;
    while (r >= this.minR && r <= this.maxR && c >= this.minC && c <= this.maxC) {
      const next = this.world.get(`${r + dr},${c + dc}`);
      if (next) {
        last = next;
        lastR = r + dr;
        lastC = c + dc;
      }
      r += dr;
      c += dc;
    }
    // @ts-ignore
    return [last, lastR, lastC]
  }

  makeMove(steps: number) {
    let [r, c, dir] = this.current;

    const [dr, dc] = this.directionToVector[dir];
    for (let i = 0; i < steps; i++) {
      r = this.current[0];
      c = this.current[1];
      let next = this.world.get(`${r + dr},${c + dc}`);
      // @ts-ignore
      if (!next) {
        // @ts-ignore
        let [found, nr, nc] = this.findEdgeFrom(r, c, this.directions[(this.directions.indexOf(dir) + 2) % 4]);
        if (found === '.') {
          // @ts-ignore
          r = nr - dr;
          c = nc - dc;
        } else if (found === '#') next = '#';
      }
      if (next === '#') break

      this.current = [r + dr, c + dc, dir];
    }
  }

  makeMoveCube(steps: number) {
    let [r, c, dir] = this.current;

    for (let i = 0; i < steps; i++) {
      const [dr, dc] = this.directionToVector[dir];
      r = this.current[0];
      c = this.current[1];
      let next = this.world.get(`${r + dr},${c + dc}`);
      // @ts-ignore
      if (!next) {
        let [nr, nc, nd] = this.wrapAroundCube(r, c, dir);
        let found = this.world.get(`${nr},${nc}`);

        if (found === '.') {
          // @ts-ignore
          this.current = [nr, nc, nd];
          // @ts-ignore
          r = nr;
          // @ts-ignore
          c = nc;
          // @ts-ignore
          dir = nd;
          continue
        } else if (found === '#') next = '#';
      }
      if (next === '#') break

      this.current = [r + dr, c + dc, dir];
    }
  }

  wrapAroundCube(r: number, c: number, dir: keyof typeof this.directionToVector) {
    const [dr, dc] = this.directionToVector[dir];
    let [ar, ac] = [r + dr, c + dc];
    switch (dir) {
      case 'U':
        if (c <= 50) {
          dir = 'R';
          ar = c + 50;
          ac = 51;
        } else if (c <= 100) {
          dir = 'R';
          ar = c + 100;
          ac = 1;
        } else {
          dir = 'U';
          ar = 200;
          ac = c - 100;
        }
        break;
      case 'D':
        if (c <= 50) {
          dir = 'D';
          ar = 1;
          ac = c + 100;
        } else if (c <= 100) {
          dir = 'L';
          ar = c + 100;
          ac = 50;
        } else {
          dir = 'L';
          ar = c - 50;
          ac = 100;
        }
        break;
      case 'L':
        if (r <= 50) {
          dir = 'R';
          ar = 151 - r;
          ac = 1;
        } else if (r <= 100) {
          dir = 'D';
          ar = 101;
          ac = r - 50;
        } else if (r <= 150) {
          dir = 'R';
          ar = 151 - r;
          ac = 51;
        } else {
          dir = 'D';
          ar = 1;
          ac = r - 100;
        }
        break;
      case 'R':
        if (r <= 50) {
          dir = 'L'
          ar = 151 - r
          ac = 100;
        } else if (r <= 100) {
          dir = 'U'
          ar = 50;
          ac = 50 + r;
        } else if (r <= 150) {
          dir = 'L'
          ar = 151 - r;
          ac = 150
        } else {
          dir = 'U'
          ar = 150
          ac = r - 100
        }
        break;
    }

    return [ar, ac, dir];
  }

}
