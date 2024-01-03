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
    // const dataBlocks = this.data.split('\n\n');
    let numbers = dataBlocks[0].split(': ')[1].split(' ').map(i => +i);
    dataBlocks.shift(); // remove seeds
    numbers = this.doMapping(dataBlocks, numbers);
    return Math.min(...numbers);
  }

  public override part2(rawInput: string) {
    // const dataBlocks = this.data.split('\n\n');
    const dataBlocks = rawInput.split('\r\n\r\n');
    let ranges = dataBlocks[0].split(': ')[1].split(' ').map(i => +i);
    dataBlocks.shift(); // remove seeds
    let minValue = Number.MAX_VALUE;
    for (let i = 0; i < ranges.length;) {
      const startValue = ranges[i];
      const endValue = startValue + ranges[i + 1];
      for (let j = startValue; j < endValue; j++) {
        let number = j;
        for (let k = 0; k < dataBlocks.length; k++) {
          const mapping = this.getMappingFromStr(dataBlocks[k]);
          number = this.getDestinationNumber(number, mapping);
        }
        minValue = number < minValue ? number : minValue;
        console.log(minValue);
      }
      i += 2;
    }
    return minValue;
  }

  doMapping(dataBlocks: string[], initialNumbers: number[]): number[] {
    let numbers = initialNumbers;
    for (let i = 0; i < dataBlocks.length; i++) {
      const mapping = this.getMappingFromStr(dataBlocks[i]);
      numbers = this.getDestinationNumbers(numbers, mapping);
    }
    return numbers;
  }

  getMappingFromStr(mappingStr: string): number[][] {
    const lines = mappingStr.split('\n').map(line => line.split(' ').map(i => +i));
    lines.shift(); // remove text line;
    return lines;
  }

  getDestinationNumbers(sourceNumbers: number[], mapping: number[][]): number[] {
    return sourceNumbers.map(sourceNumber => this.getDestinationNumber(sourceNumber, mapping));
  }

  getDestinationNumber(sourceNumber: number, mapping: number[][]): number {
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
  }

  getNumbersFromRanges(ranges: number[]): number[] {
    let numbers: number[] = [];
    for (let i = 0; i < ranges.length - 1;) {
      const startValue = ranges[i];
      const rangeLength = ranges[i + 1];
      for (let j = startValue; j < startValue + rangeLength; j++) {
        numbers.push(j);
      }
      i += 2;
    }
    return numbers;
  }
}
