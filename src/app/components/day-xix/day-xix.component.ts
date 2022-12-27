import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type Resources = {
  ore: number,
  clay: number,
  obsidian: number,
  geode: number,
}

type Blueprint = {
  ore: Resources,
  clay: Resources,
  obsidian: Resources,
  geode: Resources,
};

type State = {
  remainingTime: number;
  robots: Resources,
  resources: Resources
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

  blueprints: Array<Blueprint> = [];

  input: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.time("ExecutionTime");
    this.httpClient.get('assets/input-data/input19.txt', { responseType: 'text' }).subscribe(data => {
      this.parseInput(data);

      // this.blueprints.forEach((blueprint, i) => {
      //   const geodeCount = this.collectGeodes(blueprint, {
      //     remainingTime: 24,
      //     robots: {
      //       ore: 1,
      //       clay: 0,
      //       obsidian: 0,
      //       geode: 0
      //     },
      //     resources: {
      //       ore: 0,
      //       clay: 0,
      //       obsidian: 0,
      //       geode: 0
      //     }
      //   });
      //   console.log(geodeCount);
      //   this.result1 += geodeCount * (i + 1);
      // });
      let i = 1;
      for (let blueprint of this.input) {
        let score = this.nextOptimalRobot(
          { ore: 0, orePerSecond: 1 },
          { clay: 0, clayPerSecond: 0 },
          { obsidian: 0, obsidianPerSecond: 0 },
          { geode: 0, geodePerSecond: 0 },
          24,
          blueprint
        );
        console.log(score);
        this.result1 += score * i++;
      }
      console.timeEnd("ExecutionTime");
    });
  }

  parseInput(data: string) {
    this.input = data
      .trim()
      .split("\n")
      .map((line) => {
        let split = line.split(" ");
        let robotCosts = [];
        // Ore robot
        let type = split[3];
        let resource = split[7].slice(0, -1);
        let amount = parseInt(split[6]);
        let cost = [{ resource, amount }];
        robotCosts.push({ type, cost });
        // Clay robot
        type = split[9];
        resource = split[13].slice(0, -1);
        amount = parseInt(split[12]);
        cost = [{ resource, amount }];
        robotCosts.push({ type, cost });
        // Obsidian robot
        type = split[15];
        let resource1 = split[19];
        let amount1 = parseInt(split[18]);
        let resource2 = split[22].slice(0, -1);
        let amount2 = parseInt(split[21]);
        cost = [
          { resource: resource1, amount: amount1 },
          { resource: resource2, amount: amount2 },
        ];
        robotCosts.push({ type, cost });
        // Geode robot
        type = split[24];
        resource1 = split[28];
        amount1 = parseInt(split[27]);
        resource2 = split[31].slice(0, -1);
        amount2 = parseInt(split[30]);
        cost = [
          { resource: resource1, amount: amount1 },
          { resource: resource2, amount: amount2 },
        ];
        robotCosts.push({ type, cost });

        return robotCosts;
      });
    // this.blueprints = data.split('\n').map(blueprint => {
    //   const arr = blueprint.split(' ');
    //   return {
    //     ore: {
    //       ore: +arr[6],
    //       clay: 0,
    //       obsidian: 0,
    //       geode: 0
    //     },
    //     clay: {
    //       ore: +arr[12],
    //       clay: 0,
    //       obsidian: 0,
    //       geode: 0
    //     },
    //     obsidian: {
    //       ore: +arr[18],
    //       clay: +arr[21],
    //       obsidian: 0,
    //       geode: 0
    //     },
    //     geode: {
    //       ore: +arr[27],
    //       clay: 0,
    //       obsidian: +arr[30],
    //       geode: 0
    //     }
    //   };
    // });
  }

  canAfford(cost: any[], ore: number, clay: number, obsidian: number) {
    let oreCost = cost.find((c) => c.resource === "ore");
    let clayCost = cost.find((c) => c.resource === "clay");
    let obsidianCost = cost.find((c) => c.resource === "obsidian");

    return (
      (oreCost === undefined || oreCost.amount <= ore) &&
      (clayCost === undefined || clayCost.amount <= clay) &&
      (obsidianCost === undefined || obsidianCost.amount <= obsidian)
    );
  };

  craftRobot = (
    robotCost: any[],
    oreProduction: { ore: number, orePerSecond: number },
    clayProduction: { clay: number, clayPerSecond: number },
    obsidianProduction: { obsidian: number, obsidianPerSecond: number },
    newTimeLeft: number) => {
    let { ore, orePerSecond } = oreProduction;
    let { clay, clayPerSecond } = clayProduction;
    let { obsidian, obsidianPerSecond } = obsidianProduction;

    while (!this.canAfford(robotCost, ore, clay, obsidian) && newTimeLeft > 0) {
      ore += orePerSecond;
      clay += clayPerSecond;
      obsidian += obsidianPerSecond;
      newTimeLeft--;
    }
    ore += orePerSecond;
    clay += clayPerSecond;
    obsidian += obsidianPerSecond;
    newTimeLeft--;
    for (let cost of robotCost) {
      if (cost.resource === "ore") ore -= cost.amount;

      if (cost.resource === "clay") clay -= cost.amount;
      if (cost.resource === "obsidian") obsidian -= cost.amount;
    }

    return { ore, clay, obsidian, newTimeLeft };
  };

  nextOptimalRobot(
    oreProduction: { ore: number, orePerSecond: number },
    clayProduction: { clay: number, clayPerSecond: number },
    obsidianProduction: { obsidian: number, obsidianPerSecond: number },
    geodeProduction: { geode: number, geodePerSecond: number },
    timeLeft: number,
    blueprint: any[]
  ) {
    let geodeProduced = 0;
    for (let robot of blueprint) {
      if (robot.type === "ore" && timeLeft < 16) continue;
      if (robot.type === "clay" && timeLeft < 6) continue;
      if (robot.type === "obsidian" && timeLeft < 3) continue;
      if (robot.type === "geode" && timeLeft < 2) continue;
      let { ore, clay, obsidian, newTimeLeft } = this.craftRobot(
        robot.cost,
        oreProduction,
        clayProduction,
        obsidianProduction,
        timeLeft
      );
      if (newTimeLeft <= 0) {
        continue;
      }

      let newOreProduction = { ...oreProduction };
      let newClayProduction = { ...clayProduction };
      let newObsidianProduction = { ...obsidianProduction };
      let newGeodeProduction = { ...geodeProduction };
      if (robot.type === "ore") newOreProduction.orePerSecond++;
      if (robot.type === "clay") newClayProduction.clayPerSecond++;
      if (robot.type === "obsidian") newObsidianProduction.obsidianPerSecond++;
      if (robot.type === "geode") newGeodeProduction.geodePerSecond++;
      newOreProduction.ore = ore;
      newClayProduction.clay = clay;
      newObsidianProduction.obsidian = obsidian;
      let score = robot.type === "geode" ? newTimeLeft : 0;

      score += this.nextOptimalRobot(
        newOreProduction,
        newClayProduction,
        newObsidianProduction,
        newGeodeProduction,
        newTimeLeft,
        blueprint
      );

      if (score > geodeProduced) {
        geodeProduced = score;
      }
    }
    return geodeProduced;
  };

  // craftRobot(robotType: string, blueprint: Blueprint, state: State) {
  //   const cost: Resources = blueprint[robotType as keyof Blueprint];
  //   while (!this.canAfford(cost, state) && state.remainingTime > 0) {
  //     this.collectResourcesPerMinute(state);
  //   }
  //   Object.keys(cost).forEach(resourceType => {
  //     state.resources[resourceType as keyof Resources] -= cost[resourceType as keyof Resources];
  //   });
  //   this.collectResourcesPerMinute(state);
  //   state.robots[robotType as keyof Resources]++;
  // };

  // collectGeodes(blueprint: Blueprint, state: State): number {
  //   let geodeProduced = 0;
  //   for (let robotType of Object.keys(blueprint)) {
  //     if (robotType === "ore" && state.remainingTime < 16) continue;
  //     if (robotType === "clay" && state.remainingTime < 6) continue;
  //     if (robotType === "obsidian" && state.remainingTime < 3) continue;
  //     if (robotType === "geode" && state.remainingTime < 2) continue;
  //     let tempState = JSON.parse(JSON.stringify(state));
  //     this.craftRobot(robotType, blueprint, tempState);
  //     if (tempState.remainingTime <= 0) {
  //       continue;
  //     }

  //     let score = robotType === "geode" ? state.remainingTime : 0;
  //     score += this.collectGeodes(blueprint, tempState);
  //     if (score > geodeProduced) {
  //       geodeProduced = score;
  //     }
  //   }
  //   return geodeProduced;
  // }

  // canAfford(cost: Resources, state: State): boolean {
  //   return Object.keys(cost).every(requiredResourceType =>
  //     state.resources[requiredResourceType as keyof Resources] >= cost[requiredResourceType as keyof Resources]);
  // }

  // collectResourcesPerMinute(state: State) {
  //   Object.keys(state.robots).forEach(resourceType => {
  //     state.resources[resourceType as keyof Resources] += state.robots[resourceType as keyof Resources];
  //   });
  //   state.remainingTime--;
  //   // console.log(state.remainingTime);
  // }

}
