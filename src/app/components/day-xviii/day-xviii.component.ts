import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xviii',
  templateUrl: './day-xviii.component.html',
  styleUrls: ['./day-xviii.component.scss']
})
export class DayXVIIIComponent implements OnInit {

  result1: number = 0;

  result2: number = 0;

  data = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input18.txt', { responseType: 'text' }).subscribe(data => {
      this.result1 = this.countSurfaceArea(data);
    });
  }

  countSurfaceArea(data: string) {
    let totalSurfaceArea = 0;
    const coordinates = data.split('\n').map(item => item.split(',').map(Number));
    coordinates.forEach(coordinate => {
      const neighbors = coordinates.filter(coord => this.areNeighbors(coord, coordinate));
      totalSurfaceArea += 6 - (neighbors?.length || 0);
    });
    return totalSurfaceArea;
  }

  areNeighbors(coord1: number[], coord2: number[]) {
    return (coord1[0] == coord2[0] && coord1[1] == coord2[1] && Math.abs(coord2[2] - coord1[2]) == 1)
      || (coord1[1] == coord2[1] && coord1[2] == coord2[2] && Math.abs(coord2[0] - coord1[0]) == 1)
      || (coord1[0] == coord2[0] && coord1[2] == coord2[2] && Math.abs(coord2[1] - coord1[1]) == 1) 
  }

  isClosedSpace() {
    
  }
}
