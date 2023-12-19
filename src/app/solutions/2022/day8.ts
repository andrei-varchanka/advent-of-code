import { Solver } from "src/app/models/solver.model";

export default class Day08 extends Solver {
  result1 = 0;
  result2 = 0;

  public override part1(rawInput: string) {
    const matrix = rawInput.split('\n').map(row => row.replace('\r', '').split('').map(item => +item));
    this.countVisibleTreesAndHighestScenicScore(matrix);
    return this.result1;
  }

  public override part2(rawInput: string) {
    const matrix = rawInput.split('\n').map(row => row.replace('\r', '').split('').map(item => +item));
    this.countVisibleTreesAndHighestScenicScore(matrix);
    return this.result2;
  }

  countVisibleTreesAndHighestScenicScore(matrix: Array<number[]>) {
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
    this.result1 = count;
    this.result2 = highestScore;
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
