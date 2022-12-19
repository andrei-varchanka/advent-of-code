import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-viii',
  templateUrl: './day-viii.component.html',
  styleUrls: ['./day-viii.component.scss']
})
export class DayVIIIComponent implements OnInit {

  result1 = 0;
  result2 = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input8.txt', { responseType: 'text' }).subscribe(data => {
      const matrix = data.split('\n').map(row => row.split('').map(item => +item));
      [this.result1, this.result2] = this.countVisibleTreesAndHighestScenicScore(matrix);
    });
  }

  countVisibleTreesAndHighestScenicScore(matrix: Array<number[]>): [number, number] {
    let count = 0;
    let highestScore = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const [isTreeVisible, score] = this.isTreeVisible(i, j, matrix);
        if (isTreeVisible) {
          count++;
        }
        if (score > highestScore) {
          highestScore = score;
        }
      }
    }
    return [count, highestScore];
  }

  isTreeVisible(i: number, j: number, matrix: Array<number[]>): [boolean, number] {
    let isTreeVisible = false;
    let score = 1;
    if (i == 0 || i == matrix.length - 1 || j == 0 || j == matrix[i].length - 1) {
      isTreeVisible = true;
      score = 0;
    } else {
      let isVisibleFromLeft = true;
      let isVisibleFromRight = true;
      let isVisibleFromTop = true;
      let isVisibleFromBottom = true;
      let rightScore = 0;
      let bottomScore = 0;
      let leftScore = 0;
      let topScore = 0;
      for (let k = j - 1; k >= 0; k--) {
        if (isVisibleFromLeft) {
          leftScore++;
        }
        if (matrix[i][k] >= matrix[i][j]) {
          isVisibleFromLeft = false;
        }
      }
      for (let k = j + 1; k < matrix[i].length; k++) {
        if (isVisibleFromRight) {
          rightScore++;
        }
        if (matrix[i][k] >= matrix[i][j]) {
          isVisibleFromRight = false;
        }
      }
 
      for (let k = i - 1; k >= 0; k--) {
        if (isVisibleFromTop) {
          topScore++;
        }
        if (matrix[k][j] >= matrix[i][j]) {
          isVisibleFromTop = false;
        }
      }

      for (let k = i + 1; k < matrix.length; k++) {
        if (isVisibleFromBottom) {
          bottomScore++;
        }
        if (matrix[k][j] >= matrix[i][j]) { 
          isVisibleFromBottom = false;
        }
      }
      isTreeVisible = isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom;
      score = leftScore * rightScore * topScore * bottomScore;
    }
    return [isTreeVisible, score];
  }

}
