import { Solver } from "src/app/models/solver.model";

export default class Day15 extends Solver {

  matrix: string[][] = [];
  coordinates: number[][][] = [];

  public override part1(rawInput: string) {
    return this.solveOne(rawInput, 2000000);
  }

  public override part2(rawInput: string) {
     return this.solveTwo(rawInput, 4000000);
  }

  solveOne(data: string, y: number): any {
    let count = 0;

    const seenXs = new Set();
    for (const { sx, sy, bx, by, dist } of this.parseCoordinates(data)) {
      if (sy === y) {
        seenXs.add(sx);
      }
      if (by === y) {
        seenXs.add(bx);
      }

      for (let x = sx - dist; x <= sx + dist; x++) {
        if (!seenXs.has(x) && this.calculateDistance(x, y, sx, sy) <= dist) {
          seenXs.add(x);
          count++;
        }
      }
    }

    return count;
  }

  solveTwo(data: string, maxXY: number): any {
    const sensorData = this.parseCoordinates(data);

    const isOurOfAllSensorRanges = (x: number, y: number) => sensorData.every(({ sx, sy, dist }) =>
      this.calculateDistance(x, y, sx, sy) > dist
    );

    // distress beacon has only one possible position so it's located near edge of some sensor area,
    // otherwise we had more than 1 possible position
    // so we check only nearest points for every sensor
    for (const { sx, sy, dist } of sensorData) {
      for (const xo of [-1, 1]) {
        for (const yo of [-1, 1]) {
          for (let dx = 0; dx <= dist + 1; dx++) {
            const dy = dist + 1 - dx;
            const x = sx + dx * xo;
            const y = sy + dy * yo;
            if (x >= 0 && y >= 0 && x <= maxXY && y <= maxXY && isOurOfAllSensorRanges(x, y)) {
              return x * 4000000 + y;
            }
          }
        }
      }
    }
  }

  parseCoordinates(data: string) {
    return data.split('\n').map(line => {
      const pointsArr = line.split(': closest beacon is at x=');
      const [sx, sy] = pointsArr[0].replace('Sensor at x=', '').split(', y=').map(Number);
      const [bx, by] = pointsArr[1].split(', y=').map(Number);
      return { sx, sy, bx, by, dist: this.calculateDistance(sx, sy, bx, by) };
    });
  }

  calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
  }

}
