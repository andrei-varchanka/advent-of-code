import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-vii',
  templateUrl: './day-vii.component.html',
  styleUrls: ['./day-vii.component.scss']
})
export class DayVIIComponent implements OnInit {

  result1 = 0;
  result2 = 0;
  DISK_SIZE = 70000000;
  REQUIRED_SIZE = 30000000;

  totalFileSize = 0;
  minimumSizeToDelete = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input7.txt', { responseType: 'text' }).subscribe(data => {
      const obj = this.getStructure(data);
      this.totalFileSize = this.countDirectorySize(obj);
      this.minimumSizeToDelete = this.REQUIRED_SIZE - (this.DISK_SIZE - this.totalFileSize);
      this.result1 = 0;
      this.countDirectorySize(obj);
    });
  }

  getStructure(data: string): Object {
    let obj = new Object();
    let currentPath: string[] = [];
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      if (line[0] == '$') {
        // commands
        if (line.split(' ')[1] == 'cd') {
          if (line.split(' ')[2] == '..') {
            currentPath.pop();
          } else if (line.split(' ')[2] != '/') {
            currentPath.push(line.split(' ')[2]);
          }
        }
      } else {
        //directory content
        if (line.split(' ')[0] == 'dir') {
          Object.assign(this.getObjectByPath(obj, currentPath), { [line.split(' ')[1]]: {} });
        } else {
          //file
          Object.assign(this.getObjectByPath(obj, currentPath), { [line.split(' ')[1]]: line.split(' ')[0] });
        }
      }
      console.log('');
    });
    return obj;
  }

  getObjectByPath(obj: Object, path: string[]): Object {
    return path.reduce((objProperty, key) => objProperty[key as keyof Object], obj);
  }

  countDirectorySize(obj: Object): number {
    let sum = 0;
    Object.keys(obj).forEach(key => {
      if (typeof obj[key as keyof Object] == 'object') {
        sum += this.countDirectorySize(obj[key as keyof Object]);
      } else {
        sum += +obj[key as keyof Object];
      }
    });
    if (sum <= 100000) {
      this.result1 += sum;
    }
    if (this.minimumSizeToDelete && sum >= this.minimumSizeToDelete && (!this.result2 || sum < this.result2)) {
      this.result2 = sum;
    }
    return sum;
  }

}
