import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Valve {
  valveName: string;
  flowRate: number;
  tunnelNames: string[];
}

@Component({
  selector: 'app-day-xvi',
  templateUrl: './day-xvi.component.html',
  styleUrls: ['./day-xvi.component.scss']
})
export class DayXVIComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  data = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

  allValves: string[] = [];

  valveMap: { [key: string]: { flowRate: number, tunnelConnections: string[] } } = {};

  pathCosts: { [key: string]: { [key: string]: number } } = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input16.txt', { responseType: 'text' }).subscribe(data => {
      this.initValves(data);
      this.result1 = this.solveOne();
      this.result2 = this.solveTwo();
    });
  }

  initValves(input: string) {
    this.valveMap = Object.fromEntries(
      input.split('\n').map((line) => {
        const arr = line.split(' ');
        const label = arr[1];
        const flowRate = +line.split('rate=')[1].split(';')[0];
        const tunnelConnections = arr.slice(9).map(item => item.replace(',', ''));
        return [label, { flowRate, tunnelConnections }] as const;
      })
    );

    // Rooms with no flowRate aren't worth considering as node worth passing through. Those with flowrate are valid nodes
    this.allValves = Object.entries(this.valveMap)
      .map(([label, { flowRate }]) => (flowRate > 0 ? label : null))
      .filter(Boolean) as string[];

    this.pathCosts = Object.fromEntries(
      ['AA', ...this.allValves].map((start) => [
        start,
        Object.fromEntries(
          this.allValves
            .filter((end) => end !== start)
            .map((end) => [end, this.getLowestCost(start, end)])
        ),
      ])
    );
  }

  // This is basic pathfinding just to find the time to travel from any valid valve to any other valid valve. 
  // Important to prevent moving unproductively into worthless rooms
  getLowestCost(start: string, end: string) {
    const queue: { room: string; cost: number; visited: string[] }[] = [
      { room: start, cost: 0, visited: [start] },
    ];
    while (queue.length) {
      const { room, cost, visited } = queue.shift()!;
      if (room === end) return cost;
      const { tunnelConnections } = this.valveMap[room];
      if (tunnelConnections.includes(end)) return cost + 1;
      tunnelConnections.forEach((tunnel) => {
        if (!visited.includes(tunnel))
          queue.push({
            room: tunnel,
            cost: cost + 1,
            visited: [...visited, tunnel],
          });
      });
    }
    return -1;
  };

  // I actually found that it was faster to just generate all the possible routes within the time and then process their scores separately as opposed to pathing and calculating as I went. 
  // This is mainly because of how Part 2 works, this just allowed more control over ensuring things could be memoized and be smooth enough
  makeAllPaths(time: number) {
    const pathList: Set<string> = new Set();
    const getRemainingPath = (
      steps: string[],
      left: string[],
      costThusFar: number
    ): void => {
      const last = steps[steps.length - 1];
      if (!left.length) pathList.add(steps.join('-'));
      return left.forEach((next) => {
        const cost = this.pathCosts[last][next];
        if (cost + 1 + costThusFar >= time) return pathList.add(steps.join('-'));
        return getRemainingPath(
          [...steps, next],
          left.filter((pos) => pos !== next),
          costThusFar + cost + 1
        );
      });
    };
    getRemainingPath(['AA'], [...this.allValves], 0);
    return [...pathList].map((path) => path.split('-'));
  };

  generateKey(remaining: string[], timeLeft: number) {
    return `${remaining.join('-')}-${timeLeft}`;
  }

  scorePath(opened: string[], path: string[], timeLeft: number, memo: any): number {
    const nextStep = path[0];
    const remainingSteps = path.slice(1);
    const nextStepCost = this.pathCosts[opened[0]][nextStep];
    const flowForStep =
      opened[0] === 'AA' ? 0 : this.valveMap[opened[0] as keyof typeof this.valveMap].flowRate * timeLeft;
    if (!path.length) return flowForStep;
    const memoKey = this.generateKey(remainingSteps, timeLeft - 1 - nextStepCost);
    const pressureReleased = this.scorePath([path[0], ...opened], remainingSteps, timeLeft - nextStepCost - 1, memo);
    memo.set(memoKey, pressureReleased);
    return pressureReleased + flowForStep;
  };

  scorePaths(paths: string[][], time: number) {
    const memo: Map<string, number> = new Map();
    const pathScores = paths.map((path) =>
      [path, this.scorePath([path[0]], path.slice(1), time, memo)] as [string[], number]
    ).sort(([_, valA], [__, valB]) => valB - valA);
    return pathScores;
  };

  solveOne() {
    return this.scorePaths(this.makeAllPaths(30), 30)[0][1];
  }

  solveTwo() {
    const pathScores = this.scorePaths(this.makeAllPaths(26), 26);
    const candidates = pathScores.filter(([_, score]) => score > 0).map(([path, score]) => [path.slice(1), score] as [string[], number]);
    const bestCombo = candidates.reduce((best, [path, score], i) => {
      if (score < ((best / 2) | 0)) return best;
      const splitPoint = best === 0 ? undefined : Math.max(0, candidates.findIndex((candidate) => candidate[1] + score < best) + 1 - i);
      const noOverlap = candidates
        .slice(i, splitPoint)
        .find((helper) => helper[0].every((valve) => !path.includes(valve)));
      if (!noOverlap) return best;
      return Math.max(best, noOverlap[1] + score);
    }, 0);
    return bestCombo;
  }
}
