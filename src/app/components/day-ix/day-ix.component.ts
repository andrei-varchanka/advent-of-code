import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-ix',
  templateUrl: './day-ix.component.html',
  styleUrls: ['./day-ix.component.scss']
})
export class DayIXComponent implements OnInit {

  result1 = 0;
  result2 = 0;

  data = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input9.txt', { responseType: 'text' }).subscribe(data => {
      const commands = this.data.split('\n');
      let [width, height, startX, startY] = this.countFieldSizes(commands);
      const matrix = Array(height).fill(0).map(()=> Array(width).fill(0));
      this.result1 = this.countTailPositions(commands, matrix, startX, startY);
    });
  }

  countFieldSizes(commands: string[]): [number, number, number, number] {
    let headPositionX = 0;
    let headPositionY = 0;
    let fieldParameters = {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    }
    commands.forEach(command => {
      const direction = command.split(' ')[0];
      const steps = +command.split(' ')[1];
      if (direction == 'R') {
        headPositionX += steps;
        fieldParameters.maxX = headPositionX > fieldParameters.maxX ? headPositionX : fieldParameters.maxX;
      }
      if (direction == 'L') {
        headPositionX -= steps;
        fieldParameters.minX = headPositionX < fieldParameters.minX ? headPositionX : fieldParameters.minX;
      }
      if (direction == 'U') {
        headPositionY += steps;
        fieldParameters.maxY = headPositionY > fieldParameters.maxY ? headPositionY : fieldParameters.maxY;
      }
      if (direction == 'D') {
        headPositionY -= steps;
        fieldParameters.minY = headPositionY < fieldParameters.minY ? headPositionY : fieldParameters.minY;
      }
    });
    let width = Math.abs(fieldParameters.minX) + fieldParameters.maxX + 1;
    let height = Math.abs(fieldParameters.minY) + fieldParameters.maxY + 1;
    let startX = Math.abs(fieldParameters.minX);
    let startY = fieldParameters.maxY;
    return [width, height, startX, startY];
  }

  countTailPositions(commands: string[], matrix: Array<number[]>, startX: number, startY: number): number {
    let count = 0;
    let headPositionX = startX;
    let headPositionY = startY;
    let tailPositionX = startX;
    let tailPositionY = startY;
    matrix[startY][startX] = 1;
    commands.forEach(command => {
      const direction = command.split(' ')[0];
      const steps = +command.split(' ')[1];
      for (let i = 0; i < steps; i++) {
        [headPositionX, headPositionY] = this.moveHead(headPositionX, headPositionY, direction);
        [tailPositionX, tailPositionY] = this.moveTail(tailPositionX, tailPositionY, headPositionX, headPositionY);
        matrix[tailPositionY][tailPositionX] = 1;
        console.log(matrix);
      }
    });
    count = matrix.reduce((ac, row) => ac + row.reduce((count, item) => count + item, 0), 0);
    return count;
  }

  moveHead(positionX: number, positionY: number, direction: string): [number, number] {
    if (direction == 'R') {
      positionX++;
    }
    if (direction == 'L') {
      positionX--;
    }
    if (direction == 'U') {
      positionY--;
    }
    if (direction == 'D') {
      positionY++;
    }
    return [positionX, positionY];
  }

  moveTail(tailPositionX: number, tailPositionY: number, headPositionX: number, headPositionY: number): [number, number] {
    if (tailPositionX == headPositionX && headPositionY - tailPositionY == 2) {
      tailPositionY++;
    }
    if (tailPositionX == headPositionX && headPositionY - tailPositionY == -2) {
      tailPositionY--;
    }
    if (tailPositionY == headPositionY && headPositionX - tailPositionX == 2) {
      tailPositionX++;
    }
    if (tailPositionY == headPositionY && headPositionX - tailPositionX == -2) {
      tailPositionX--;
    }
    if (Math.abs(headPositionX - tailPositionX) == 2 && Math.abs(headPositionY - tailPositionY) == 1
     || Math.abs(headPositionY - tailPositionY) == 2 && Math.abs(headPositionX - tailPositionX) == 1) {
      if (headPositionX > tailPositionX && headPositionY > tailPositionY) {
        tailPositionX++;
        tailPositionY++;
      }
      if (headPositionX > tailPositionX && headPositionY < tailPositionY) {
        tailPositionX++;
        tailPositionY--;
      }
      if (headPositionX < tailPositionX && headPositionY < tailPositionY) {
        tailPositionX--;
        tailPositionY--;
      }
      if (headPositionX < tailPositionX && headPositionY > tailPositionY) {
        tailPositionX--;
        tailPositionY++;
      }
    }
    return [tailPositionX, tailPositionY];
  }

}
