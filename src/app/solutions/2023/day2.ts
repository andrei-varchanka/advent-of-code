import { Solver } from "src/app/models/solver.model";

export default class Day01 extends Solver {

  data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  maxColorCount: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
  }

  public override part1(rawInput: string) {
    let sum = 0;
    const arr = rawInput.split("\n");
    arr.forEach(line => { // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      const lineArr = line.split(': ');
      const sets = lineArr[1].split('; '); // ["8 green, 6 blue, 20 red", "5 blue, 4 red, 13 green", "5 green, 1 red"]
      const colorCounts = this.countSetColorsCount(sets);
      if (colorCounts["red"] <= this.maxColorCount["red"] && colorCounts["blue"] <= this.maxColorCount["blue"] && colorCounts["green"] <= this.maxColorCount["green"]) {
        const numberMatch = lineArr[0].match(/\d+/) || [];
        const gameNumber = +(numberMatch[0] || 0);
        sum += gameNumber;
      }
    });
    return sum;
  }

  public override part2(rawInput: string) {
    let sum = 0;
    const arr = rawInput.split("\n");
    arr.forEach(line => { // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      const lineArr = line.split(': ');
      const sets = lineArr[1].split('; '); // ["8 green, 6 blue, 20 red", "5 blue, 4 red, 13 green", "5 green, 1 red"]
      const colorCounts = this.countSetColorsCount(sets);
      const power = colorCounts["red"] * colorCounts["blue"] * colorCounts["green"];
      sum += power;
    });
    return sum;
  }

  countSetColorsCount(sets: string[]): Record<string, number> {
    const colorCounts: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0
    }
    sets.forEach(set => { // 8 green, 6 blue, 20 red
      const cubes = set.split(', '); // ["8 green", "6 blue", "20 red"]
      cubes.forEach(cube => { // 20 red
        const cubeArr = cube.split(' '); // ["20", "red"]
        const cubeCount = +cubeArr[0];
        const cubeColor = cubeArr[1].trim();
        if (cubeCount > colorCounts[cubeColor]) {
          colorCounts[cubeColor] = cubeCount;
        }
      });
    });
    return colorCounts;
  }
}
