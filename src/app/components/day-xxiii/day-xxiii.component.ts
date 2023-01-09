import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xxiii',
  templateUrl: './day-xxiii.component.html',
  styleUrls: ['./day-xxiii.component.scss']
})
export class DayXXIIIComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  directionToOffset = {
    north: [-1, 0],
    south: [1, 0],
    west: [0, -1],
    east: [0, 1],
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input23.txt', { responseType: 'text' }).subscribe(data => {
      this.result1 = this.solve(data, false);
      this.result2 = this.solve(data, true);
    });
  }

  rotatableArray = (arr: string[]) => ({
    start: 0,
    rotate() {
      if (++this.start >= arr.length) {
        this.start = 0;
      } 
    },
    [Symbol.iterator]() {
      return (function* (this: { start: number }) {
        for (let i = 0; i < arr.length; i++) {
          yield arr[(this.start + i) % arr.length];
        }
      }).call(this);
    },
  });

  solve(data: string, partTwo: boolean) {
    const directions = this.rotatableArray(['north', 'south', 'west', 'east']);

    console.log(directions);
    const world = new Set<string>();
    for (const [r, row] of data.split('\n').entries()) {
      for (const [c, col] of [...row].entries()) {
        if (col === '#') world.add(`${r},${c}`);
      }
    }
  
    const moves = new Map<string, string[]>();
    const rounds = partTwo ? Infinity : 10;
    for (let r = 0; r < rounds; r++) {
      for (const elf of world) {
        const [er, ec] = elf.split(',').map(Number);
  
        const neighbors = [];
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (!(dr === 0 && dc === 0) && world.has(`${er + dr},${ec + dc}`)) {
              neighbors.push(`${er + dr},${ec + dc}`);
            }
          }
        }
        if (neighbors.length === 0) continue;
  
        const directionalNeighbors: Record<keyof typeof this.directionToOffset, (n: string) => boolean> = {
          north: n => +n.split(',')[0] < er, south: n => +n.split(',')[0] > er,
          west: n => +n.split(',')[1] < ec, east: n => +n.split(',')[1] > ec,
        }
        for (const direction of directions) {
          if (neighbors.filter(directionalNeighbors[direction as keyof typeof directionalNeighbors]).length > 0) continue;
  
          const offset = this.directionToOffset[direction as keyof typeof directionalNeighbors];
          const coordinate = [er + offset[0], ec + offset[1]];
          const otherElves = moves.get(coordinate.join(',')) || [];
          otherElves.push(elf);
          moves.set(coordinate.join(','), otherElves);
          break;
        }
      }
  
      let movesMade = !partTwo
      for (const [coord, [elf, other]] of moves.entries()) {
        if (other) continue;
        world.delete(elf);
        world.add(coord);
        movesMade = true;
      }
      moves.clear()
  
      if (!movesMade) return r + 1;
  
      directions.rotate();
    }
  
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const elf of world) {
      const [r, c] = elf.split(',').map(Number);
      minX = Math.min(minX, c);
      maxX = Math.max(maxX, c);
      minY = Math.min(minY, r);
      maxY = Math.max(maxY, r);
    }
  
    let result = 0;
    for (let r = minY; r <= maxY; r++) {
      for (let c = minX; c <= maxX; c++) {
        if (!world.has(`${r},${c}`)) result++;
      }
    }
  
    return result;
  }

}
