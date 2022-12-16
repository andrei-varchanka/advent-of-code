import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-iii',
  templateUrl: './day-iii.component.html',
  styleUrls: ['./day-iii.component.scss']
})
export class DayIIIComponent implements OnInit {

  result: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input3.txt', { responseType: 'text' }).subscribe(data => {
      this.result = this.getPrioritiesSum(data);
    });
  }

  getPrioritiesSum(data: string): number {
    const arr: string[] = data.split('\r\n');
    let sum = 0;
    arr.forEach(item => {
      console.log(item);
      const char = this.getRepeatingChar(item);
      sum += this.getPriority(char);
    });
    return sum;
  }

  getRepeatingChar(str: string): string {
    const arr = str.split('');
    let repeatingChar = '';
    const middleIndex = Math.ceil(arr.length / 2);
    const uniqueFirstHalf = [...new Set(arr.splice(0, middleIndex))];
    const uniqueSecondHalf = [...new Set(arr.splice(-middleIndex))];
    const sortedUniqueArr = uniqueFirstHalf.concat(uniqueSecondHalf).sort();
    for (let i = 1; i < sortedUniqueArr.length; i++) {
      if (sortedUniqueArr[i] == sortedUniqueArr[i - 1]) {
        repeatingChar = sortedUniqueArr[i];
      }
    }
    return repeatingChar;
  }

  getPriority(char: string): number {
    const charCode = char.charCodeAt(0);
    let priority = 0;
    if (charCode >= 65 && charCode <= 90) {
      // A-Z
      priority = charCode - 38;
    }
    if (charCode >= 97 && charCode <= 122) {
      // a-z
      priority = charCode - 96;
    }
    return priority;
  }

}
