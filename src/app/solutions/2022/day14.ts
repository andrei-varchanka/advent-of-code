import { Solver } from "src/app/models/solver.model";

export default class Day14 extends Solver {

  matrix: string[][] = [[]];

  startPoint: number[] = [];

  public override part1(rawInput: string) {
    const rockLines = rawInput.split('\n').map(line => line.split(' -> ').map(point => point.split(',').map(value => +value)));
    this.generateCaveMatrix(rockLines);
    return this.startFlow1();
  }

  public override part2(rawInput: string) {
    const rockLines = rawInput.split('\n').map(line => line.split(' -> ').map(point => point.split(',').map(value => +value)));
    this.generateCaveMatrix(rockLines, true);
    return this.startFlow2();
  }

  generateCaveMatrix(rockLines: Array<number[][]>, withFloor?: boolean) {
    let minX = Number.MAX_VALUE;
    let maxX = 0;
    let maxY = 0;
    this.startPoint = [500, 0];
    rockLines.forEach(rockLine => {
      rockLine.forEach(point => {
        if (point[0] < minX) {
          minX = point[0]
        }
        if (point[0] > maxX) {
          maxX = point[0];
        }
        if (point[1] > maxY) {
          maxY = point[1];
        }
      });
    });
    const width = maxX - minX + 1;
    const height = maxY + 1;
    this.startPoint[0] -= minX;
    this.matrix = new Array(height).fill(0).map(() => new Array(width).fill('.'));
    for (let i = 0; i < rockLines.length; i++) {
      for (let j = 1; j < rockLines[i].length; j++) {
        const currentPoint = rockLines[i][j];
        const previousPoint = rockLines[i][j - 1];
        if (currentPoint[0] == previousPoint[0]) {
          // vertical
          let startIndex = Math.min(currentPoint[1], previousPoint[1]);
          let endIndex = Math.max(currentPoint[1], previousPoint[1]);
          for (let k = startIndex; k <= endIndex; k++) {
            this.matrix[k][currentPoint[0] - minX] = '#';
          }
        }
        if (currentPoint[1] == previousPoint[1]) {
          // horizontal
          let startIndex = Math.min(currentPoint[0], previousPoint[0]);
          let endIndex = Math.max(currentPoint[0], previousPoint[0]);
          for (let k = startIndex; k <= endIndex; k++) {
            this.matrix[currentPoint[1]][k - minX] = '#';
          }
        }
      }
    }
    if (withFloor) {
      this.matrix.push(new Array(width).fill('.'));
      this.matrix.push(new Array(width).fill('#'));
    }
  }

  startFlow1(): number {
    let count = 0;
    let isFlowing = true;
    while (isFlowing) {
      let sandPoint = [...this.startPoint];
      let isLanded = false;
      while (!isLanded) {
        if (!this.matrix[sandPoint[1] + 1] || !this.matrix[sandPoint[1] + 1][sandPoint[0]]) {
          isLanded = true;
          isFlowing = false;
        } else if (this.matrix[sandPoint[1] + 1][sandPoint[0]] == '.') {
          sandPoint[1]++;
        } else if (!this.matrix[sandPoint[1] + 1] || !this.matrix[sandPoint[1] + 1][sandPoint[0] - 1]) {
          isLanded = true;
          isFlowing = false;
        } else if (this.matrix[sandPoint[1] + 1][sandPoint[0] - 1] == '.') {
          sandPoint[1]++;
          sandPoint[0]--;
        } else if (!this.matrix[sandPoint[1] + 1] || !this.matrix[sandPoint[1] + 1][sandPoint[0] + 1]) {
          isLanded = true;
          isFlowing = false;
        } else if (this.matrix[sandPoint[1] + 1][sandPoint[0] + 1] == '.') {
          sandPoint[1]++;
          sandPoint[0]++;
        } else {
          isLanded = true;
        }
      }
      if (isFlowing) {
        this.matrix[sandPoint[1]][sandPoint[0]] = 'o';
        count++;
      }
    }
    return count;
  }

  startFlow2(): number {
    let count = 0;
    while (this.matrix[this.startPoint[1]][this.startPoint[0]] != 'o') {
      let sandPoint = [...this.startPoint];
      let isLanded = false;
      while (!isLanded) {
        if (this.matrix[sandPoint[1] + 1][sandPoint[0]] == '.') {
          sandPoint[1]++;
        } else {
          if (!this.matrix[sandPoint[1] + 1][sandPoint[0] - 1]) {
            for (let i = 0; i < this.matrix.length; i++) {
              this.matrix[i].unshift(i == this.matrix.length - 1 ? '#' : '.');
            }
            sandPoint[0]++;
            this.startPoint[0]++;
          }
          if (this.matrix[sandPoint[1] + 1][sandPoint[0] - 1] == '.') {
            sandPoint[1]++;
            sandPoint[0]--;
          } else {
            if (!this.matrix[sandPoint[1] + 1][sandPoint[0] + 1]) {
              for (let i = 0; i < this.matrix.length; i++) {
                this.matrix[i].push(i == this.matrix.length - 1 ? '#' : '.');
              }
            }
            if (this.matrix[sandPoint[1] + 1][sandPoint[0] + 1] == '.') {
              sandPoint[1]++;
              sandPoint[0]++;
            } else {
              isLanded = true;
            }
          }
        }
      }
      this.matrix[sandPoint[1]][sandPoint[0]] = 'o';
      count++;
    }
    return count;
  }
}
