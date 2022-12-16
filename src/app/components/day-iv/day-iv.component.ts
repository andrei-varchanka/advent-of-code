import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-iv',
  templateUrl: './day-iv.component.html',
  styleUrls: ['./day-iv.component.scss']
})
export class DayIVComponent implements OnInit {

  data = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

result: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // this.result = this.findContainedRanges(this.data);
    this.httpClient.get('assets/input-data/input4.txt', { responseType: 'text' }).subscribe(data => {
      this.result = this.findContainedRanges(data);
    });
  }

  findContainedRanges(data: string): number {
    let count = 0;
    const arr: string[] = data.split('\n');
    arr.forEach(item => {
     let [firstRange, secondRange] = item.split(',');
     let firstArray = this.getArrayFromStrRange(firstRange);
     let secondArray = this.getArrayFromStrRange(secondRange);
     let mergedArray = firstArray.concat(secondArray);
     let uniqueMergedArray = [...new Set(mergedArray)];
     if (uniqueMergedArray.length <= Math.max(firstArray.length, secondArray.length)) {
      count++;
     }
    });
    return count;
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
