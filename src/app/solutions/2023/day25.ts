import { Solver } from "src/app/models/solver.model";
import { getLines } from "src/app/utils/input";

type Node = {
  children?: Node[],
  used: boolean,
  visited: boolean
}

export default class Day25 extends Solver {

  data = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

  NODES: Node[] = [];
  countGroupA = 1;
  countGroupB = 0;

  public override part1(rawInput: string) {
    this.processInput(this.data);
    console.log(this.NODES);
    const master = this.NODES[0];

    for (const node of this.NODES) {
      if (node != master) {
        this.searchThis(node, master);
      }
    }

    return this.countGroupA * this.countGroupB;
  }

  public override part2(rawInput: string) {
    return 0;

  }

  processInput(rawInput: string) {
    const rawData: Record<string, string[]> = {};
    const lines = getLines(rawInput);
    for (const line of lines) {
      const parts = line.trim().split(": ");
      const parent = parts[0];
      const children = parts[1].split(" ");
      rawData[parent] = children;
      for (const child of children) {
        if (rawData[child] == undefined) {
          rawData[child] = [parent];
          continue;
        }
        if (!rawData[child].includes(parent)) {
          rawData[child].push(parent);
        }
      }
    }

    const keys = Object.keys(rawData)
    for (let n = 0; n < keys.length; n++) {
      this.NODES.push({
        children: [],
        used: false,
        visited: false
      });
    }

    let index = -1;
    for (const key of keys) {
      index += 1;
      const node = this.NODES[index];
      const rawChildren = rawData[key];
      for (const rawChild of rawChildren) {
        const rawChildIndex = keys.indexOf(rawChild);
        node.children?.push(this.NODES[rawChildIndex]);
      }
    }
  }

  searchThis(target: Node, master: Node) {
    for (const node of this.NODES) {
      node.used = false;
    }
    master.used = true;

    let connections = 0;
    for (const child of master.children as Node[]) {
      if (connections > 3) {
        break; // for economy
      }

      if (child == target) {
        connections += 1;
        continue;
      }

      const path = this.searchThis2(target, child);
      if (path != null) {
        connections += 1;
        for (const node of path) {
          node.used = true;
        }
      }
    }

    if (connections > 3) {
      this.countGroupA += 1;
    } else {
      this.countGroupB += 1;
    }
  }

  searchThis2(target: Node, root: Node) { // LEAVES AS SOON AS FINDS ONE CONNECTION
    for (const node of this.NODES) {
      node.visited = false;
    }
    root.visited = true;

    const paths = [[root]];
    while (true) {
      const path = paths.shift();
      if (path == undefined) {
        break;
      }
      const lastInPath = path.at(-1) as Node;
      for (const child of lastInPath.children as Node[]) {
        if (target == child) {
          return path;
        }
        if (child.visited || child.used) {
          continue;
        }
        child.visited = true;
        const newPath = path.slice();
        newPath.push(child);
        paths.push(newPath);
      }
    }
    return null;
  }



}

