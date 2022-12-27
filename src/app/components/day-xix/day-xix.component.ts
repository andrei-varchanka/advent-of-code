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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input19.txt', { responseType: 'text' }).subscribe(data => {
      this.parseInput(this.data);

      this.blueprints.forEach((blueprint, i) => {
        const geodeCount = this.collectGeodes(blueprint, {
          remainingTime: 24,
          robots: {
            ore: 1,
            clay: 0,
            obsidian: 0,
            geode: 0
          },
          resources: {
            ore: 0,
            clay: 0,
            obsidian: 0,
            geode: 0
          }
        }, 0);
        console.log(geodeCount);
        this.result1 += geodeCount * (i + 1);
      });
    });
  }

  parseInput(data: string) {
    this.blueprints = data.split('\n').map(blueprint => {
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

  collectGeodes(blueprint: Blueprint, state: State, maxGeodes: number): number {
    while (state.remainingTime > 0) {
      maxGeodes = Math.max(state.resources.geode, maxGeodes);

      let maxOreRobotCount = 0;
      Object.values(blueprint).forEach(cost => {
        maxOreRobotCount = Math.max(cost.ore, maxOreRobotCount);
      });
      const maxRobotCounts: Resources = {
        ore: maxOreRobotCount,
        clay: blueprint.obsidian.clay,
        obsidian: blueprint.geode.obsidian,
        geode: Infinity
      };

      if (state.resources.geode + state.robots.geode * state.remainingTime + this.triangleSum(state.remainingTime) < maxGeodes) {
        state.remainingTime = 0;
      }
      const availableRobotTypes: string[] = this.getAvailableRobotTypes(blueprint, state);
      availableRobotTypes.push(''); // don't make any robot
      let maxGeodesAfterPurchase = 0;
      let mostEfficientRobotType = '';
      if (availableRobotTypes.includes('geode')) {
        mostEfficientRobotType = 'geode';
      } else {
        availableRobotTypes.forEach(robotType => {
          if (state.robots[robotType as keyof Resources] <= maxRobotCounts[robotType as keyof Resources]) {
            let tempState = JSON.parse(JSON.stringify(state));
            this.spendMinute(blueprint, tempState, robotType);
            let collectedGeodes = this.collectGeodes(blueprint, tempState, maxGeodesAfterPurchase);
            if (collectedGeodes > maxGeodesAfterPurchase) {
              maxGeodesAfterPurchase = collectedGeodes;
              mostEfficientRobotType = robotType;
            }
          }
        });
      }
      this.spendMinute(blueprint, state, mostEfficientRobotType);

    }
    return state.resources.geode;
  }


  triangleSum(n: number) {
    let a = 0;
    for (let i = 1; i <= n; i++) {
      a += i;
    }
    return a;
  };

  getAvailableRobotTypes(blueprint: Blueprint, state: State): string[] {
    const availableRobotTypes: string[] = [];
    Object.keys(blueprint).forEach(robotType => {
      const robotCost: Resources = blueprint[robotType as keyof Blueprint];
      let canAfford = Object.keys(robotCost).every(requiredResourceType =>
        state.resources[requiredResourceType as keyof Resources] >= robotCost[requiredResourceType as keyof Resources]);
      if (canAfford) {
        availableRobotTypes.push(robotType);
      }
    });
    return availableRobotTypes;
  }

  spendMinute(blueprint: Blueprint, state: State, robotTypeToCreate: string) {
    if (robotTypeToCreate) {
      // spend resources and start building robot 
      const cost: Resources = blueprint[robotTypeToCreate as keyof Blueprint];
      Object.keys(cost).forEach(resourceType => {
        state.resources[resourceType as keyof Resources] -= cost[resourceType as keyof Resources];
      });
    }

    this.collectResourcesPerMinute(state);

    if (robotTypeToCreate) {
      //  robot is ready 
      state.robots[robotTypeToCreate as keyof Resources]++;
    }
  }

  collectResourcesPerMinute(state: State) {
    Object.keys(state.robots).forEach(resourceType => {
      state.resources[resourceType as keyof Resources] += state.robots[resourceType as keyof Resources];
    });
    state.remainingTime--;
    // console.log(state.remainingTime);
  }

}
