import { Solver } from "src/app/models/solver.model";

export default class Day04 extends Solver {

data = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  public override part1(rawInput: string) {
    const dataBlocks = rawInput.split('\r\n\r\n');
    let numbers = dataBlocks[0].split(': ')[1].split(' ').map(i => +i);
    for (let i = 1; i < dataBlocks.length; i++) {
      const mapping = this.getMappingFromStr(dataBlocks[i]);
      numbers = this.getDestinationNumbers(numbers, mapping);
      console.log(numbers);
    }
    return Math.min(...numbers);
  }

  getMappingFromStr(mappingStr: string): number[][] {
    const lines = mappingStr.split('\n').map(line => line.split(' ').map(i => +i));
    lines.shift(); // remove text line;
    return lines;
  }

  getDestinationNumbers(sourceNumbers: number[], mapping: number[][]): number[] {
    return sourceNumbers.map(sourceNumber => {
      let destinationNumber: number | null = null;
      mapping.forEach(range => {
        const baseDestination = range[0];
        const baseSource = range[1];
        const rangeLength = range[2];
        if (sourceNumber >= baseSource && sourceNumber < baseSource + rangeLength) {
          const bias = sourceNumber - baseSource;
          destinationNumber = baseDestination + bias;
        }
      })
      return destinationNumber || sourceNumber;
    });
  }

  public override part2(rawInput: string) {
    const arr = rawInput.split('\n');
    let cards = [];

    return cards.length;
  }
}
