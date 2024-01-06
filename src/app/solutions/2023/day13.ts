import { Solver } from "src/app/models/solver.model";

export default class Day13 extends Solver {

  data = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  public override part1(rawInput: string) {
    let verticalReflectionColumns = 0;
    let horizontalReflectionRows = 0;
    const patterns = rawInput.split('\r\n\r\n').map(patternStr => patternStr.split('\r\n').map(row => row.split('')));
    patterns.forEach(pattern => {
      verticalReflectionColumns += this.findVerticalReflection(pattern, false);
      horizontalReflectionRows += this.findHorizontalReflection(pattern, false);
    });
    return horizontalReflectionRows * 100 + verticalReflectionColumns;
  }

  public override part2(rawInput: string) {
    let verticalReflectionColumns = 0;
    let horizontalReflectionRows = 0;
    const patterns = rawInput.split('\r\n\r\n').map(patternStr => patternStr.split('\r\n').map(row => row.split('')));
    // const patterns = this.data.split('\n\n').map(patternStr => patternStr.split('\n').map(row => row.split('')));
    patterns.forEach(pattern => {
      verticalReflectionColumns += this.findVerticalReflection(pattern, true);
      horizontalReflectionRows += this.findHorizontalReflection(pattern, true);
    });
    return horizontalReflectionRows * 100 + verticalReflectionColumns;
  }

  findVerticalReflection(pattern: string[][], part2: boolean) {
    const possibleLines = [];
    for (let i = 1; i < pattern[0].length; i++) {
      const curLine = this.getColumn(pattern, i);
      const prevLine = this.getColumn(pattern, i - 1);
      if (part2) {
        if (this.countArrDifference(curLine, prevLine) == 1 || this.countArrDifference(curLine, prevLine) == 0) {
          possibleLines.push(i);
        }
      } else {
        if (this.countArrDifference(curLine, prevLine) == 0) {
          possibleLines.push(i);
        }
      }
    }
    for (let possibleLine of possibleLines) {
      const a = possibleLine;
      const b = possibleLine - 1;
      let i = 0;
      let smudgeFound = false;
      let perfectReflection = true;
      while (perfectReflection && this.getColumn(pattern, a + i).length > 0 && this.getColumn(pattern, b - i).length > 0) {
        const newA = this.getColumn(pattern, a + i);
        const newB = this.getColumn(pattern, b - i);
        const difference = this.countArrDifference(newA, newB);
        if (part2 && difference == 1) {
          if (smudgeFound) {
            perfectReflection = false;
          } else {
            smudgeFound = true;
          }
        } else {
          if (difference > 0) {
            perfectReflection = false;
          }
        }
        i++;
      }
      if (part2) {
        if (perfectReflection && smudgeFound) {
          return possibleLine;
        }
      } else {
        if (perfectReflection) {
          return possibleLine;
        }
      }
    }
    return 0;
  }

  findHorizontalReflection(pattern: string[][], part2: boolean) {
    const possibleLines = [];
    for (let i = 1; i < pattern.length; i++) {
      const curLine = pattern[i];
      const prevLine = pattern[i - 1];
      if (part2) {
        if (this.countArrDifference(curLine, prevLine) == 1 || this.countArrDifference(curLine, prevLine) == 0) {
          possibleLines.push(i);
        }
      } else {
        if (this.countArrDifference(curLine, prevLine) == 0) {
          possibleLines.push(i);
        }
      }
    }
    for (let possibleLine of possibleLines) {
      const a = possibleLine;
      const b = possibleLine - 1;
      let i = 0;
      let smudgeFound = false;
      let perfectReflection = true;
      while (perfectReflection && pattern[a + i] && pattern[b - i]) {
        const difference = this.countArrDifference(pattern[a + i], pattern[b - i]);
        if (part2 && difference == 1) {
          if (smudgeFound) {
            perfectReflection = false;
          } else {
            smudgeFound = true;
          }
        } else {
          if (difference > 0) {
            perfectReflection = false;
          }
        }
        i++;
      }
      if (part2) {
        if (perfectReflection && smudgeFound) {
          return possibleLine;
        }
      } else {
        if (perfectReflection) {
          return possibleLine;
        }
      }
    }
    return 0;
  }

  countArrDifference(arr1: string[], arr2: string[]): number {
    let difference = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        difference++;
      }
    }
    return difference;
  }

  getColumn(matrix: string[][], i: number): string[] {
    if (matrix[0][i]) {
      return matrix.map(row => row[i]);
    } else {
      return [];
    }
  }

}
