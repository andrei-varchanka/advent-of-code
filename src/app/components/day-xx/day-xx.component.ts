import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface FileNumber {
  value: number;
  index: number;
}

@Component({
  selector: 'app-day-xx',
  templateUrl: './day-xx.component.html',
  styleUrls: ['./day-xx.component.scss']
})
export class DayXXComponent implements OnInit {

  data = `1
2
-3
3
-2
0
4`;

  result1: number = 0;

  result2: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input20.txt', { responseType: 'text' }).subscribe(data => {
      const arr1 = this.mix(...this.parseNumbers(data));
      this.result1 = this.sum(arr1);
      const [numbers, map] = this.parseNumbers(data, 811589153);
      const arr2 = Array.from({ length: 10 }).reduce<FileNumber[]>(lastNumbers => this.mix(lastNumbers, map), numbers)
      this.result2 = this.sum(arr2);
    });
  }

  parseNumbers(data: string, multiplier?: number): [FileNumber[], Map<number, FileNumber>] {
    const map = new Map<number, FileNumber>();
    const numbers: FileNumber[] = data.split('\n').map((s, index) => {
      const number = { value: multiplier ? +s * multiplier : +s, index };
      map.set(number.index, number);
      return number
    });
    return [numbers, map];
  }

  sum(numbers: FileNumber[]) {
    const zeroIndex = numbers.findIndex(n => n.value === 0);
    return [1000, 2000, 3000].reduce((sum, io) => sum + numbers[(zeroIndex + io) % numbers.length].value, 0);
  }

  mix(numbers: FileNumber[], map: Map<number, FileNumber>) {
    for (let i = 0; i < numbers.length; i++) {
      const fileNumber = map.get(i)!;
      const currentIndex = numbers.indexOf(fileNumber);
      numbers.splice(currentIndex, 1);
      numbers.splice((currentIndex + fileNumber.value) % numbers.length, 0, fileNumber);
    }
    return numbers;
  }

}
