import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-vi',
  templateUrl: './day-vi.component.html',
  styleUrls: ['./day-vi.component.scss']
})
export class DayVIComponent implements OnInit {

  result1 = 0;
  result2 = 0;

  PACKAGE_MARKER_LENGTH = 4;
  MESSAGE_MARKER_LENGTH = 14;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input6.txt', { responseType: 'text' }).subscribe(data => {
      this.result1 = this.findMarkerPosition(data, this.PACKAGE_MARKER_LENGTH);
      this.result2 = this.findMarkerPosition(data, this.MESSAGE_MARKER_LENGTH);
    });
  }

  findMarkerPosition(str: string, markerLength: number): number {
    let result = 0;
    let charsArr = str.slice(0, markerLength).split('');
    for (let i = markerLength; i < str.length; i++) {
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
