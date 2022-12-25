import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xiii',
  templateUrl: './day-xiii.component.html',
  styleUrls: ['./day-xiii.component.scss']
})
export class DayXIIIComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  data = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input13.txt', { responseType: 'text' }).subscribe(data => {
      const pairs = data.split('\n\n').map(pair => pair.split('\n').map(packet => JSON.parse(packet)));
      for (let i = 0; i < pairs.length; i++) {
        if (this.isRightOrder(pairs[i])) {
          this.result1+= i + 1;
        }
      }
      let flatPackets = pairs.flat();
      const dividerPacket1 = [[2]];
      const dividerPacket2 = [[6]];
      flatPackets.push(dividerPacket1);
      flatPackets.push(dividerPacket2);
      flatPackets = flatPackets.sort(this.sortPackets.bind(this));
      console.log(flatPackets);
      const dividerPacket1Position = flatPackets.findIndex(packet => JSON.stringify(packet) == JSON.stringify(dividerPacket1)) + 1;
      const dividerPacket2Position = flatPackets.findIndex(packet => JSON.stringify(packet) == JSON.stringify(dividerPacket2)) + 1;
      this.result2 = dividerPacket1Position * dividerPacket2Position;
    });
  }

  isRightOrder(pair: any[]): boolean | undefined {
    if (!pair) {
      debugger;
    }
    let left = pair[0];
    let right = pair[1];
    if (typeof left == 'number' && typeof right == 'number') {
      if (left < right) {
        return true;
      }
      if (left > right) {
        return false;
      }
      // if equal - continue
    }
    if (Array.isArray(left) || Array.isArray(right)) {
      if (typeof left == 'number') {
        left = [left];
      }
      if (typeof right == 'number') {
        right = [right];
      }
      for (let i = 0; i < Math.max(left.length, right.length); i++) {
        if (left[i] == null) {
          return true;
        }
        if (right[i] == null) {
          return false;
        }
        let isRightOrder;
        isRightOrder = this.isRightOrder([left[i], right[i]]);
        if (isRightOrder != undefined) {
          return isRightOrder;
        }
      }
    }
    return undefined;
  }

  sortPackets(a: any[], b: any[]) {
    const isRightOrder = this.isRightOrder([a, b]);
    if (isRightOrder) {
      return -1;
    } 
    if (isRightOrder == false) {
      return 1;
    }
    return 0;
  }

}
