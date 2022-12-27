import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xx',
  templateUrl: './day-xx.component.html',
  styleUrls: ['./day-xx.component.scss']
})
export class DayXXComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
