import { Solver } from "src/app/models/solver.model";
import { getLines } from "src/app/utils/input";

type Connection = {
  edgeA: [number, number];
  start: [number, number];
  distance: number;
  end: [number, number];
  edgeB: [number, number];
};

export default class Day23 extends Solver {

  data = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

  slopeDirection: Record<string, string> = {
    '>': '0:1',
    '<': '0:-1',
    '^': '-1:0',
    v: '1:0',
  };

  public override part1(rawInput: string) {
    const matrix = getLines(rawInput);
    const rows = matrix.length - 1;
    const columns = matrix[0].length - 1;
    const [tr, tc] = [rows, columns - 1];
    return this.walkP1(matrix, 1, 1, tr, tc, ['0:1'], 0);
  }

  public override part2(rawInput: string) {
    const matrix = getLines(rawInput);
    const rows = matrix.length - 1;
    const columns = matrix[0].length - 1;
    const [tr, tc] = [rows, columns - 1];
    const graph = this.buildGraph(matrix, tr, tc);
    return this.walkP2(graph, '0,1', `${tr},${tc}`, [], 0);
  }

  buildGraph(tm: string[], tr: number, tc: number) {
    const queue: [[number, number], [number, number]][] = [
      [
        [0, 1],
        [1, 1],
      ],
    ];
    const connections: Connection[] = [];
    const graph: Map<string, Map<string, number>> = new Map();
    const getNode = (nk: string) => {
      let n = graph.get(nk);
      if (n === undefined) {
        n = new Map();
        graph.set(nk, n);
      }
      return n;
    };
    const setDistance = (f: string, t: string, d: number) => {
      const n = getNode(f);
      const cd = n.get(t);
      if (cd === undefined || cd < d) {
        n.set(t, d);
      }
    };
    while (queue.length) {
      const [[ar, ac], [sr, sc]] = queue.shift()!;
      if (
        connections.some(
          c =>
            (c.edgeB[0] === ar &&
              c.edgeB[1] === ac &&
              c.end[0] === sr &&
              c.end[1] === sc) ||
            (c.edgeA[0] === ar &&
              c.edgeA[1] === ac &&
              c.start[0] === sr &&
              c.start[1] === sc),
        )
      ) {
        continue;
      }
      let [cr, cc] = [sr, sc];
      let [pr, pc] = [ar, ac];
      let connectionLength = 1;
      let distance = 0;
      let next: number[][] = [];
      let targetFound = false;
      while (connectionLength === 1 && !targetFound) {
        next = [
          [cr - 1, cc],
          [cr, cc - 1],
          [cr, cc + 1],
          [cr + 1, cc],
        ].filter(
          ([nr, nc]) => !(nr === pr && nc === pc) && tm[nr][nc] !== '#',
        );
        connectionLength = next.length;
        if (connectionLength === 1) {
          [pr, pc] = [cr, cc];
          [cr, cc] = next[0];
        }
        distance = distance + 1;
        targetFound = cr === tr && cc === tc;
      }
      if (targetFound) {
        connections.push({
          edgeA: [ar, ac],
          start: [sr, sc],
          end: [pr, pc],
          edgeB: [cr, cc],
          distance: distance,
        });
        break;
      }
      if (connectionLength > 0) {
        connections.push({
          edgeA: [ar, ac],
          start: [sr, sc],
          end: [pr, pc],
          edgeB: [cr, cc],
          distance,
        });
        for (const [nr, nc] of next) {
          queue.push([
            [cr, cc],
            [nr, nc],
          ]);
        }
      }
    }
    for (const c of connections) {
      const a = c.edgeA.toString();
      const b = c.edgeB.toString();
      setDistance(a, b, c.distance);
      setDistance(b, a, c.distance);
    }
    return graph;
  };

  walkP1(tm: string[], r: number, c: number, tr: number, tc: number, visited: string[], cd: number): number {
    if (r === tr && c === tc) {
      return cd + 1;
    }
    const ct = tm[r][c];
    visited = [...visited, `${r}:${c}`];
    let maxCD = 0;
    for (const [nr, nc] of [
      [r - 1, c],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c],
    ]) {
      const nt = tm[nr][nc];
      if (
        nt === '#' ||
        visited.includes(`${nr}:${nc}`) ||
        (ct !== '.' && this.slopeDirection[ct] !== `${nr - r}:${nc - c}`)
      ) {
        continue;
      }
      maxCD = Math.max(maxCD, this.walkP1(tm, nr, nc, tr, tc, visited, cd + 1));
    }
    return maxCD;
  };

  walkP2 = (
    g: Map<string, Map<string, number>>,
    nk: string,
    tnk: string,
    visited: string[],
    cd: number,
  ) => {
    if (nk === tnk) {
      return cd + 1;
    }
    visited = [...visited, nk];
    let maxD = 0;
    for (const [ck, d] of g.get(nk)!) {
      if (visited.includes(ck)) {
        continue;
      }
      maxD = Math.max(maxD, this.walkP2(g, ck, tnk, visited, cd + d));
    }
    return maxD;
  };
}

