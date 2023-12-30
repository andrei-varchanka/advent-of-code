import { Solver } from "src/app/models/solver.model";

function* loopedArrGen(arr: any[]) {
  let index = 0;
  while (true) {
    yield arr[index];
    index = (index + 1) % arr.length;
  }
}

export default class Day04 extends Solver {

data = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

  public override part1(rawInput: string) {
    const instructions = rawInput.split('\r\n\r\n')[0].split('');
    const nodes = rawInput.split('\r\n\r\n')[1].split('\r\n');
    const nodesMap = this.getNodesMap(nodes);
    let key = 'AAA';
    let counter = 0;
    for (let instruction of loopedArrGen(instructions)) {
      key = nodesMap.get(key)[+(instruction == 'R')];
      counter++;
      if (key == 'ZZZ') {
        break;
      }
    }
    return counter;
  }

  public override part2(rawInput: string) {
    const instructions = rawInput.split('\r\n\r\n')[0].split('');
    const nodes = rawInput.split('\r\n\r\n')[1].split('\r\n');
    const nodesMap = this.getNodesMap(nodes);
    let keys = [...nodesMap.keys()].filter(item => item.at(-1) == 'A');
    let counts: any[] = [];
    keys.forEach(key => {
      let counter = 0;
      for (let instruction of loopedArrGen(instructions)) {
        key = nodesMap.get(key)[+(instruction == 'R')];
        counter++;
        if (key.at(-1) == 'Z') {
          break;
        }
      }
      counts.push(counter);
    });
    return counts.reduce((n, x) => this.lcm(x, n), 1);
  }

  gcd = (a: number, b: number) => {
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };

  lcm = (a: number, b: number) => (a * b) / this.gcd(a, b);

  getNodesMap(nodes: string[]) {
    const nodesMap = new Map();
    nodes.forEach(node =>{
      const arr = node.split(' = (');
      const key = arr[0];
      const value = arr[1].replace(')', '').split(', ')
      nodesMap.set(key, value);
    });
    return nodesMap;
  }

}
