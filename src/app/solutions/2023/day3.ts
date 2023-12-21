import { Solver } from "src/app/models/solver.model";


type Coordinate = { x: number, y: number };

export default class Day03 extends Solver {

  data = `467....114
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  matrix: string[][] = [];

  public override part1(rawInput: string) {
    let sum = 0;
    this.matrix = rawInput.split("\n").map(row => row.split(''));
    this.matrix.forEach((row, i) => {
      let numberStr = '';
      let numberStart: number | null;
      row.forEach((el, j) => {
        if (!isNaN(+el)) {
          numberStr += el;
          numberStart = numberStart || j;
        }
        if (isNaN(+el) || j == row.length - 1) {
          if (numberStr.length > 0 && this.hasAdjacentSymbol(i, numberStart || 0, j)) {
            sum += +numberStr;
          }
          numberStr = '';
          numberStart = null;
        }
      });
    });
    return sum;
  }

  hasAdjacentSymbol(i: number, numberStart: number, numberEnd: number) {
    let result = false;
    for (let k = numberStart - 1; k <= numberEnd; k++) {
      if (this.isSymbol(i, k) || this.isSymbol(i - 1, k) || this.isSymbol(i + 1, k)) {
        result = true;
      }
    }
    return result;
  }

  isSymbol(i: number, j: number) {
    return this.matrix[i] && this.matrix[i][j] && this.matrix[i][j] != '.' && isNaN(+this.matrix[i][j]);
  }

  isNumber(i: number, j: number) {
    return this.matrix[i] && this.matrix[i][j] && !isNaN(+this.matrix[i][j]);
  }

  public override part2(rawInput: string) {
    console.log('part 2');
    let sum = 0;
    this.matrix = rawInput.split("\n").map(row => row.split(''));
    this.matrix.forEach((row, i) => {
      row.forEach((el, j) => {
        if (this.isSymbol(i, j)) {
          let digits: Coordinate[] = this.getAdjacentDigits(i, j);
          if (digits.length < 2) {
            return;
          }
          digits = this.getUniqueNumbers(digits);
          if (digits.length == 2) {
            sum += digits.reduce((acc, d) => acc * this.getNumberByCoordinate(d), 1);
          }
        }
      });
    });
    return sum;
  }

  getAdjacentDigits(i: number, j: number): Coordinate[] {
    const numbers: Coordinate[] = [];
    for (let x = i - 1; x <= i + 1; x++) {
      for (let y = j - 1; y <= j + 1; y++) {
        if (this.isNumber(x, y)) {
          numbers.push({ x, y });
        }
      }
    }
    return numbers;
  }

  getUniqueNumbers(digits: Coordinate[]): Coordinate[] {
    const uniqueNumbers: Coordinate[] = [];

    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      const previousDigits = digits.slice(0, i);
      if (!previousDigits.find(d => Math.abs(d.y - digit.y) == 1 && d.x == digit.x)) {
        uniqueNumbers.push(digit);
      }
    }
    return uniqueNumbers;
  }

  getNumberByCoordinate(coordinate: Coordinate): number {
    const row = this.matrix[coordinate.x];
    let result = 0;
    let numberStr = '';
    let requiredIndex = false;
    row.forEach((el, i) => {
      if (!isNaN(+el)) {
        numberStr += el;
        if (i == coordinate.y) {
          requiredIndex = true;
        }
      }
      if (isNaN(+el) || i == row.length - 1) {
        if (requiredIndex) {
          result = +numberStr;
        }
        numberStr = '';
        requiredIndex = false;
      }
    });
    return result;
  }

}
