import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-i',
  templateUrl: './day-i.component.html',
  styleUrls: ['./day-i.component.scss']
})
export class DayIComponent implements OnInit {

  data = `1000
  2000
  3000
  
  4000
  
  5000
  6000
  
  7000
  8000
  9000
  
  10000`;

  result1: number = 0;

  result2: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input1.txt', { responseType: 'text' })
      .subscribe(data => {
        [this.result1, this.result2] = this.findMaxCalories(data);
      });
  }

  findMaxCalories(data: string): [number, number] {
    const arr: string[] = data.split('\n');
    let calculatedArray: number[] = [];
    let index = 0;
    arr.forEach(item => {
      const value = +item.trim();
      if (value) {
        calculatedArray[index] = calculatedArray[index] || 0;
        calculatedArray[index] += value;
      } else {
        index++;
      }
    });
    calculatedArray = calculatedArray.sort((a, b) => a - b);
    const lastThree = calculatedArray.slice(-3);
    return [lastThree[lastThree.length - 1], lastThree.reduce((a, b) => a + b, 0)];
  }

}
