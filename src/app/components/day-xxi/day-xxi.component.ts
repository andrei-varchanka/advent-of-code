import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xxi',
  templateUrl: './day-xxi.component.html',
  styleUrls: ['./day-xxi.component.scss']
})
export class DayXXIComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
