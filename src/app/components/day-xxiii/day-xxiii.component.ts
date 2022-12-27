import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xxiii',
  templateUrl: './day-xxiii.component.html',
  styleUrls: ['./day-xxiii.component.scss']
})
export class DayXXIIIComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
