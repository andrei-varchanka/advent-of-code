import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xxv',
  templateUrl: './day-xxv.component.html',
  styleUrls: ['./day-xxv.component.scss']
})
export class DayXXVComponent implements OnInit {

  result1: string = '';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input25.txt', { responseType: 'text' }).subscribe(data => {
      let snafuNumbers = data.split(/\r?\n/);
      this.result1 = this.decimalToSnafu(snafuNumbers.map(this.snafuToDecimal.bind(this)).reduce((sum, value) => sum + value, 0));

    });
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
