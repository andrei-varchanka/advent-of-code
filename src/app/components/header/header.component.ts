import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  years = [2022, 2023];
  days = Array.from({ length: 25 }, (_, i) => i + 1)
  selectedYear: number = 0;
  selectedDay: number = 0;

  constructor(private router: Router) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const urlParams = event.url.split('/').filter(p => p);
        this.selectedYear = +urlParams[0] || 2022;
        this.selectedDay = +urlParams[2] || 1;
      }
    });
  }

  ngOnInit(): void {
    
  }

  selectDate(year: number | null, day: number | null) {
    this.selectedYear = year ? year : this.selectedYear;
    this.selectedDay = day ? day : this.selectedDay;
    this.router.navigate([this.selectedYear + '/day/' + this.selectedDay]);
  }


  // constructor(private router: Router, private route: ActivatedRoute) {
  //   this.route.params.subscribe(params => {
  //     this.selectedYear = +params['year'] || 2022;
  //     this.selectedDay = +params['day'] | 1;
  //   });
  // }

}
