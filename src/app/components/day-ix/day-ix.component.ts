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

  height = 0;
  width = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input9.txt', { responseType: 'text' }).subscribe(data => {
      const commands = data.split('\n');
      let [width, height, startX, startY] = this.countFieldSizes(commands);
      this.width = width;
      this.height = height;
      this.result1 = this.countTailsPositions(commands, startX, startY, 1);
      this.result2 = this.countTailsPositions(commands, startX, startY, 9);
    });
  }

  getCleanMatrix() {
    return Array(this.height).fill(0).map(() => Array(this.width).fill(0))
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

  countTailsPositions(commands: string[], startX: number, startY: number, tailsCount: number): number {
    let count = 0;
    let headPositionX = startX;
    let headPositionY = startY;
    let tailPositionsX = new Array(tailsCount).fill(startX);
    let tailPositionsY = new Array(tailsCount).fill(startY);
    let matrix = this.getCleanMatrix();
    commands.forEach(command => {
      // matrix = this.getCleanMatrix();
      const direction = command.split(' ')[0];
      const steps = +command.split(' ')[1];
      for (let i = 0; i < steps; i++) {
        // matrix[headPositionY][headPositionX] = 0;
        [headPositionX, headPositionY] = this.moveHead(headPositionX, headPositionY, direction);
        // matrix[headPositionY][headPositionX] = -1;
        // matrix[tailPositionsY[0]][tailPositionsX[0]] = 0;
        [tailPositionsX[0], tailPositionsY[0]] = this.moveTail(tailPositionsX[0], tailPositionsY[0], headPositionX, headPositionY);
        if (tailsCount == 1) {
          matrix[tailPositionsY[0]][tailPositionsX[0]] = 1;
        }
        // matrix[tailPositionsY[0]][tailPositionsX[0]] = 1;
        for (let j = 1; j < tailsCount; j++) {
          // matrix[tailPositionsY[j]][tailPositionsX[j]] = 0;
          [tailPositionsX[j], tailPositionsY[j]] = this.moveTail(tailPositionsX[j], tailPositionsY[j], tailPositionsX[j - 1], tailPositionsY[j - 1]);
          //matrix[tailPositionsY[j]][tailPositionsX[j]] = j + 1;
          if (j == tailsCount - 1) {
            matrix[tailPositionsY[j]][tailPositionsX[j]] = 1;
          }
        }
      }
      // console.log(matrix);
    });
    count = (matrix as any as Array<number[]>).reduce((ac, row) => ac + row.reduce((count, item) => count + item, 0), 0);
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
      || Math.abs(headPositionY - tailPositionY) == 2 && Math.abs(headPositionX - tailPositionX) == 1
      || Math.abs(headPositionX - tailPositionX) == 2 && Math.abs(headPositionY - tailPositionY) == 2) {
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
