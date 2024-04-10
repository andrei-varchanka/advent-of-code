import { Solver } from "src/app/models/solver.model";
import { Coordinate } from "src/app/models/types";
import { getLines } from "src/app/utils/input";

type Hailstone = {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
}

export default class Day24 extends Solver {

  data = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

  testArea = {
    min: 7,
    max: 27
  }

  A: Array<number[]> = [];
  B: Array<number> = [];

  // testArea = {
  //   min: 200000000000000,
  //   max: 400000000000000
  // }

  public override part1(rawInput: string) {
    const hailstones: Hailstone[] = this.getHailstones(rawInput);
    let count = 0;
    for (let i = 0; i < hailstones.length - 1; i++) {
      const hailstone1 = hailstones[i];
      for (let j = i + 1; j < hailstones.length; j++) {
        const hailstone2 = hailstones[j];
        const crossCoordinate = this.findFutureCrossCoordinate(hailstone1, hailstone2);
        if (crossCoordinate
          && crossCoordinate.x >= this.testArea.min && crossCoordinate.x <= this.testArea.max
          && crossCoordinate.y >= this.testArea.min && crossCoordinate.y <= this.testArea.max) {
          count++;
        }
      }
    }
    return count;
  }

  public override part2(rawInput: string) {
    const hailstones: Hailstone[] = this.getHailstones(rawInput);
    for (let i = 1; i <= 3; i++) {
      this.add(hailstones, i);
    }
    const [pxr, pyr, pzr] = this.cramer();
    return pxr + pyr + pzr;
  }

  getHailstones(rawInput: string) {
    return getLines(rawInput).map(str => {
      const positions = str.split(" @ ")[0].split(", ").map(Number);
      const velocities = str.split(" @ ")[1].split(", ").map(Number);
      return {
        px: positions[0],
        py: positions[1],
        pz: positions[2],
        vx: velocities[0],
        vy: velocities[1],
        vz: velocities[2]
      }
    });
  }

  findFutureCrossCoordinate(hailstone1: Hailstone, hailstone2: Hailstone): Coordinate | null {
    const k1 = hailstone1.vy / hailstone1.vx;
    const k2 = hailstone2.vy / hailstone2.vx;
    if (k1 == k2) {
      return null;
    }
    const b1 = hailstone1.py - k1 * hailstone1.px;
    const b2 = hailstone2.py - k2 * hailstone2.px;
    const x = (b2 - b1) / (k1 - k2);
    const y = k1 * x + b1;
    if ((x - hailstone1.px) * hailstone1.vx < 0
      || (y - hailstone1.py) * hailstone1.vy < 0
      || (x - hailstone2.px) * hailstone2.vx < 0
      || (y - hailstone2.py) * hailstone2.vy < 0) {
      // different signs mean it was in the past
      return null;
    }
    return { x, y };
  }

  add(hailstones: Hailstone[], n: number) {
    const [px0, py0, pz0, vx0, vy0, vz0] = [hailstones[0].px, hailstones[0].py, hailstones[0].pz, hailstones[0].vx, hailstones[0].vy, hailstones[0].vz];
    const [pxN, pyN, pzN, vxN, vyN, vzN] = [hailstones[n].px, hailstones[n].py, hailstones[n].pz, hailstones[n].vx, hailstones[n].vy, hailstones[n].vz];
    this.A.push([vy0 - vyN, vxN - vx0, 0, pyN - py0, px0 - pxN, 0]);
    this.B.push(px0 * vy0 - py0 * vx0 - pxN * vyN + pyN * vxN);
    this.A.push([vz0 - vzN, 0, vxN - vx0, pzN - pz0, 0, px0 - pxN]);
    this.B.push(px0 * vz0 - pz0 * vx0 - pxN * vzN + pzN * vxN);
  }

  det(m: any) {
    if (m.length === 0) return 1;
    let [l, ...r] = m;
    r = l.map((n: any, i: any) => n * this.det(r.map((row: any) => row.toSpliced(i, 1))));
    return r.reduce((a: any, b: any, i: any) => (i % 2 ? a - b : a + b), 0);
  }
  
  cramer() {
    const detA = this.det(this.A);
    return this.A.map((_, i) => this.det(this.A.map((r: any, j) => r.toSpliced(i, 1, this.B[j]))) / detA);
  }

}

