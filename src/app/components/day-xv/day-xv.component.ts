import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xv',
  templateUrl: './day-xv.component.html',
  styleUrls: ['./day-xv.component.scss']
})
export class DayXVComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  data = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

  matrix: string[][] = [];
  coordinates: number[][][] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input15.txt', { responseType: 'text' }).subscribe(data => {
      //this.result1 = this.solveOne(this.data, 10);
      this.result1 = this.solveOne(data, 2000000);
      this.result2 = this.solveTwo(data, 4000000);
      //this.result2 = this.solveTwo(this.data, 20);
    });
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
