import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-vi',
  templateUrl: './day-vi.component.html',
  styleUrls: ['./day-vi.component.scss']
})
export class DayVIComponent implements OnInit {

  result1 = 0;

  MARKER_LENGTH = 4;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input6.txt', { responseType: 'text' }).subscribe(data => {
      this.result1 = this.findMarkerPosition(data);
    });
  }

  findMarkerPosition(str: string): number {
    let result = 0;
    let charsArr = str.slice(0, this.MARKER_LENGTH).split('');
    for (let i = this.MARKER_LENGTH; i < str.length; i++) {
      if (this.checkCharsUnique(charsArr)) {
        result = i;
        break;
      }
      charsArr.shift();
      charsArr.push(str[i]);
    }
    return result;
  }

  checkCharsUnique(arr: string[]): boolean {
    return arr.length == [...new Set(arr)].length;
  }

}
