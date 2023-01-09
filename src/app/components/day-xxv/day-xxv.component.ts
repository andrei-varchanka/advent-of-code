import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xxv',
  templateUrl: './day-xxv.component.html',
  styleUrls: ['./day-xxv.component.scss']
})
export class DayXXVComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
