import { Solver } from "src/app/models/solver.model";

class Rock {
  constructor(public shape: any[], public r: number, public c: number) { }

  generateCoordinates() {
    const coordinates = [];
    for (const [ro, row] of this.shape.entries()) {
      for (const [co, char] of row.entries()) {
        if (char) {
          coordinates.push([this.r - ro, this.c + co]);
        }
      }
    }
    return coordinates;
  }
}

export default class Day17 extends Solver {

  rockTypes = [
    [
      ['#', '#', '#', '#']
    ],
    [
      ['', '#', ''],
      ['#', '#', '#'],
      ['', '#', ''],
    ],
    [
      ['', '', '#'],
      ['', '', '#'],
      ['#', '#', '#'],
    ],
    [
      ['#'],
      ['#'],
      ['#'],
      ['#'],
    ],
    [
      ['#', '#'],
      ['#', '#'],
    ],
  ];

  public override part1(rawInput: string) {
    return this.solve(rawInput, 2022);
  }

  public override part2(rawInput: string) {
    return this.solve(rawInput, 1000000000000);
  }

  circularArray(arr: any[]) {
    return {
      index: 0,
      next() {
        const item = arr[this.index];
        this.index++;
        if (this.index >= arr.length) {
          this.index = 0;
        }
        return item;
      }
    }
  }

  getHeight(world: Set<string>) {
    let height = 0;
    for (const key of world) {
      height = Math.max(height, parseInt(key));
    }
    return height + 1;
  }

  solve(data: string, rocksNumber: number) {
    const rocks = this.circularArray(this.rockTypes);
    const jets = this.circularArray(data.split(''));

    const world = new Set<string>();
    const patterns = new Map();
    let additionalHeight = 0;
    for (let rocksPlaced = 0; rocksPlaced < rocksNumber; rocksPlaced++) {
      const shape = rocks.next();
      const rock = new Rock(shape, this.getHeight(world) + (rocksPlaced ? 3 : 2) + shape.length - 1, 2);
      while (true) {
        const jet = jets.next();
        const coordinates = rock.generateCoordinates();
        if (
          jet === '<'
          && rock.c
          && coordinates.every(([r, c]) => !world.has(`${r},${c - 1}`))
        ) {
          rock.c--;
        } else if (
          jet === '>'
          && rock.c + rock.shape[0].length < 7
          && coordinates.every(([r, c]) => !world.has(`${r},${c + 1}`))
        ) {
          rock.c++;
        }

        if (rock.generateCoordinates().some(([r, c]) => r - 1 < 0 || world.has(`${r - 1},${c}`))) {
          break;
        } else {
          rock.r--;
        }
      }

      for (const [rr, row] of rock.shape.entries()) {
        for (const [cc, char] of row.entries()) {
          if (char) {
            world.add(`${rock.r - rr},${rock.c + cc}`);
          }
        }
      }

      const height = this.getHeight(world);
      let patternKey = `${jets.index}|${rocks.index}`;
      for (let r = height; r >= height - 5; r--) {
        let row = '';
        for (let c = 0; c < 7; c++) {
          row += world.has(`${r},${c}`) ? '#' : '.';
        }
        patternKey += `|${row}`;
      }
      if (patterns.has(patternKey)) {
        const previous = patterns.get(patternKey);
        const rocksChanges = rocksPlaced - previous.rocksPlaced;
        const highestPointChanges = height - previous.height;
        const cycles = Math.floor((rocksNumber - previous.rocksPlaced) / rocksChanges) - 1;
        additionalHeight += cycles * highestPointChanges;
        rocksPlaced += cycles * rocksChanges;
      }
      else {
        patterns.set(patternKey, { rocksPlaced, height });
      }
    }

    return additionalHeight + this.getHeight(world);
  }

}
