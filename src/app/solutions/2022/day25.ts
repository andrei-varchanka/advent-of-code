import { Solver } from "src/app/models/solver.model";

export default class Day25 extends Solver {

  snafuToDecimalDigit: Record<string, number> = {
    "=": -2,
    "-": -1,
    "0": 0,
    "1": 1,
    "2": 2,
  };

  decimalToSnafuDigit: Record<string, string> = {
    "-2": "=",
    "-1": "-",
    "0": "0",
    "1": "1",
    "2": "2",
  };

  public override part1(rawInput: string) {
    let snafuNumbers = rawInput.split(/\r?\n/);
     return this.decimalToSnafu(snafuNumbers.map(this.snafuToDecimal.bind(this)).reduce((sum, value) => sum + value, 0));
  }

  public override part2(rawInput: string) {
    return 'N/A';
  }

  snafuToDecimal(snafu: string): number {
    let result = 0;
    for (let index = 0; index < snafu.length; ++index) {
      const digitValue = 5 ** (snafu.length - index - 1);
      result += this.snafuToDecimalDigit[snafu[index]] * digitValue;
    }
    return result;
  }

  decimalToSnafu(decimal: number): string {
    let result = "";
    let quotient = decimal;
    while (quotient > 0) {
      const remainder = ((quotient + 2) % 5) - 2;
      quotient = Math.floor((quotient + 2) / 5);
      result = this.decimalToSnafuDigit[remainder] + result;
    }
    return result;
  }

}
