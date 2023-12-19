import { Solver } from "src/app/models/solver.model";

export default class Day13 extends Solver {

  public override part1(rawInput: string) {
    let result = 0;
    const pairs = rawInput.split('\r\n\r\n').map(pair => pair.split('\r\n').map(packet => JSON.parse(packet)));
    for (let i = 0; i < pairs.length; i++) {
      if (this.isRightOrder(pairs[i])) {
        result += i + 1;
      }
    }
    return result;
  }

  public override part2(rawInput: string) {
    const pairs = rawInput.split('\r\n\r\n').map(pair => pair.split('\r\n').map(packet => JSON.parse(packet)));
    let flatPackets = pairs.flat();
    const dividerPacket1 = [[2]];
    const dividerPacket2 = [[6]];
    flatPackets.push(dividerPacket1);
    flatPackets.push(dividerPacket2);
    flatPackets = flatPackets.sort(this.sortPackets.bind(this));
    const dividerPacket1Position = flatPackets.findIndex(packet => JSON.stringify(packet) == JSON.stringify(dividerPacket1)) + 1;
    const dividerPacket2Position = flatPackets.findIndex(packet => JSON.stringify(packet) == JSON.stringify(dividerPacket2)) + 1;
    return dividerPacket1Position * dividerPacket2Position;
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
