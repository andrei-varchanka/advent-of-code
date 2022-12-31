import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type Resource = 'ore' | 'clay' | 'obsidian' | 'geode';
type BotRequirements = Record<Resource, number>;

type State = {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
  oreRobots: number;
  clayRobots: number;
  obsidianRobots: number;
  geodeRobots: number;
  minutesLeft: number
}

@Component({
  selector: 'app-day-xix',
  templateUrl: './day-xix.component.html',
  styleUrls: ['./day-xix.component.scss']
})
export class DayXIXComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.time("ExecutionTime");
    this.httpClient.get('assets/input-data/input19.txt', { responseType: 'text' }).subscribe(data => {
      const blueprints = this.parseInput(data);
      this.result1 = blueprints.reduce((sum, blueprint, i) => sum + this.bfs(blueprint.ore, blueprint.clay, blueprint.obsidian, blueprint.geode, 24) * (i + 1), 0)
      this.result2 = blueprints.slice(0, 3).reduce((product, blueprint) => product * this.bfs(blueprint.ore, blueprint.clay, blueprint.obsidian, blueprint.geode, 32), 1);
      console.timeEnd("ExecutionTime");
    });
  }

  parseInput(data: string): Array<Record<Resource, BotRequirements>> {
    return data.split('\n').map(blueprint => {
      const arr = blueprint.split(' ');
      return {
        ore: {
          ore: +arr[6],
          clay: 0,
          obsidian: 0,
          geode: 0
        },
        clay: {
          ore: +arr[12],
          clay: 0,
          obsidian: 0,
          geode: 0
        },
        obsidian: {
          ore: +arr[18],
          clay: +arr[21],
          obsidian: 0,
          geode: 0
        },
        geode: {
          ore: +arr[27],
          clay: 0,
          obsidian: +arr[30],
          geode: 0
        }
      };
    });
  }

  bfs(oreBotReq: BotRequirements, clayBotReq: BotRequirements, obsidianBotReq: BotRequirements, geodeBotReq: BotRequirements, minutesLeft: number) {
    let best = -Infinity;
    const seen = new Set();

    const stack: State[] = [{
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
      oreRobots: 1,
      clayRobots: 0,
      obsidianRobots: 0,
      geodeRobots: 0,
      minutesLeft
    }];
    while (stack.length) {
      const next = stack.pop()!;
      let { ore, clay, obsidian, geode, oreRobots, clayRobots, obsidianRobots, geodeRobots, minutesLeft } = next;
      best = Math.max(best, geode)
      if (minutesLeft === 0) {
        continue;
      } 

      const maxOreCost = Math.max(oreBotReq.ore, clayBotReq.ore, obsidianBotReq.ore, geodeBotReq.ore);

      oreRobots = Math.min(oreRobots, maxOreCost)
      ore = Math.min(ore, minutesLeft * maxOreCost - oreRobots * (minutesLeft - 1))

      clayRobots = Math.min(clayRobots, obsidianBotReq.clay)
      clay = Math.min(clay, minutesLeft * obsidianBotReq.clay - clayRobots * (minutesLeft - 1))

      geodeRobots = Math.min(geodeRobots, geodeBotReq.obsidian)
      obsidian = Math.min(obsidian, minutesLeft * geodeBotReq.obsidian - geodeRobots * (minutesLeft - 1))


      const key = [ore, clay, obsidian, geode, oreRobots, clayRobots, obsidianRobots, geodeRobots, minutesLeft].join(',');
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      const newState = {
        ore: ore + oreRobots,
        clay: clay + clayRobots,
        obsidian: obsidian + obsidianRobots,
        geode: geode + geodeRobots,
        oreRobots,
        clayRobots,
        obsidianRobots,
        geodeRobots,
        minutesLeft: minutesLeft - 1
      }
      stack.push(newState);
      if (ore >= geodeBotReq.ore && obsidian >= geodeBotReq.obsidian) {
        stack.push({
          ore: newState.ore - geodeBotReq.ore,
          clay: newState.clay,
          obsidian: newState.obsidian - geodeBotReq.obsidian,
          geode: newState.geode,
          oreRobots,
          clayRobots,
          obsidianRobots,
          geodeRobots: geodeRobots + 1,
          minutesLeft: newState.minutesLeft
        });
      }
      else if (ore >= obsidianBotReq.ore && clay >= obsidianBotReq.clay) {
        stack.push({
          ore: newState.ore - obsidianBotReq.ore,
          clay: newState.clay - obsidianBotReq.clay,
          obsidian: newState.obsidian,
          geode: newState.geode,
          oreRobots,
          clayRobots,
          obsidianRobots: obsidianRobots + 1,
          geodeRobots: geodeRobots,
          minutesLeft: newState.minutesLeft
        });
      } else {
        if (ore >= clayBotReq.ore) {
          stack.push({
            ore: newState.ore - clayBotReq.ore,
            clay: newState.clay,
            obsidian: newState.obsidian,
            geode: newState.geode,
            oreRobots,
            clayRobots: clayRobots + 1,
            obsidianRobots: obsidianRobots,
            geodeRobots: geodeRobots,
            minutesLeft: newState.minutesLeft
          });
        }
        if (ore >= oreBotReq.ore) {
          stack.push({
            ore: newState.ore - oreBotReq.ore,
            clay: newState.clay,
            obsidian: newState.obsidian,
            geode: newState.geode,
            oreRobots: oreRobots + 1,
            clayRobots: clayRobots,
            obsidianRobots: obsidianRobots,
            geodeRobots: geodeRobots,
            minutesLeft: newState.minutesLeft
          });
        }
      }
    }
    return best;
  }

}
