import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-iv',
  templateUrl: './day-iv.component.html',
  styleUrls: ['./day-iv.component.scss']
})
export class DayIVComponent implements OnInit {

  result1: number = 0;
  result2: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input4.txt', { responseType: 'text' }).subscribe(data => {
      const arr: string[] = data.split('\n');
      [this.result1, this.result2] = this.countRanges(arr);
    });
  }

  countRanges(arr: string[]): [number, number] {
    let containedRangesCount = 0;
    let overlapsCount = 0
    arr.forEach(item => {
      let [firstRange, secondRange] = item.split(',');
      let firstArray = this.getArrayFromStrRange(firstRange);
      let secondArray = this.getArrayFromStrRange(secondRange);
      let mergedArray = firstArray.concat(secondArray);
      let uniqueMergedArray = [...new Set(mergedArray)];
      if (uniqueMergedArray.length <= Math.max(firstArray.length, secondArray.length)) {
        containedRangesCount++;
      }
      if (uniqueMergedArray.length < mergedArray.length) {
        overlapsCount++;
      }
    });
    return [containedRangesCount, overlapsCount];
  }

  getArrayFromStrRange(str: string): number[] {
    let firstNumber = +str.split('-')[0];
    let lastNumber = +str.split('-')[1];
    const arr = [];
    for (let i = firstNumber; i <= lastNumber; i++) {
      arr.push(i);
    }
    return arr;
  }
}
