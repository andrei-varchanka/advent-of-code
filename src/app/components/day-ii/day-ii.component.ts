import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-ii',
  templateUrl: './day-ii.component.html',
  styleUrls: ['./day-ii.component.scss']
})
export class DayIiComponent implements OnInit {

  partnerSignArr = ['A', 'B', 'C'];
  mySignArr = ['X', 'Y', 'Z'];

  winMatrix1 = [
    [4, 8, 3],
    [1, 5, 9],
    [7, 2, 6]
  ];

  winMatrix2 = [
    [3, 4, 8],
    [1, 5, 9],
    [2, 6, 7]
  ];

  score1 = 0;
  score2 = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input2.txt', { responseType: 'text' }).subscribe(data => {
      this.score1 = this.getScore(this.winMatrix1, data);
      this.score2 = this.getScore(this.winMatrix2, data);
    });
  }

  getScore(winMatrix: any[], instructions: string): number {
    let score = 0;
    const rounds: string[] = instructions.split('\n');
    rounds.forEach(round => {
      if (round.trim()) {
        const partnerSign = round[0];
        const mySign = round[2];
        score += winMatrix[this.partnerSignArr.indexOf(partnerSign)][this.mySignArr.indexOf(mySign)];
      }
    });
    return score;
  }

}
