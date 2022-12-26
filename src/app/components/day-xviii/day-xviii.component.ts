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

  minX: number = Infinity;
  maxX: number = -Infinity;
  minY: number = Infinity;
  maxY: number = -Infinity;
  minZ: number = Infinity;
  maxZ: number = -Infinity;

  visitedBlocks: number[][] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input18.txt', { responseType: 'text' }).subscribe(data => {
      const coordinates = data.split('\n').map(item => item.split(',').map(Number));
      [this.minX, this.maxX] = this.getMinMaxCoordinates(coordinates, 0);
      [this.minY, this.maxY] = this.getMinMaxCoordinates(coordinates, 1);
      [this.minZ, this.maxZ] = this.getMinMaxCoordinates(coordinates, 2);
      this.result1 = this.countSurfaceArea1(coordinates);
      this.result2 = this.countSurfaceArea2(coordinates);
    });
  }

  countSurfaceArea1(coordinates: number[][]) {
    let totalSurfaceArea = 0;
    coordinates.forEach(coordinate => {
      const neighborBlocks = this.getNeighbors(coordinate);
      const filledNeighborBlocks = neighborBlocks.filter(coord => coordinates.find(c => c.join(',') == coord.join(',')));
      totalSurfaceArea += 6 - (filledNeighborBlocks?.length || 0);
    });
    return totalSurfaceArea;
  }

  countSurfaceArea2(coordinates: number[][]) {
    let totalSurfaceArea = 0;
    const stack = [[this.minX - 1, this.minY - 1, this.minZ - 1]];
    while (stack.length) {
      const [x, y, z] = stack.pop()!;
      const block = [x, y, z];
      if (this.visitedBlocks.find(vb => vb.join(',') == block.join(','))) continue;
      this.visitedBlocks.push([x, y, z]);

      for (const [nx, ny, nz] of this.getNeighbors(block)) {
        if (nx < this.minX - 1 || nx > this.maxX + 1 || ny < this.minY - 1 || ny > this.maxY + 1 || nz < this.minZ - 1 || nz > this.maxZ + 1) continue;

        if (coordinates.find(coord => coord.join(',') == [nx, ny, nz].join(','))) {
          totalSurfaceArea++;
        } else if (!this.visitedBlocks.find(vb => vb.join(',') == [nx, ny, nz].join(','))) {
          stack.push([nx, ny, nz]);
        }
      }
    }
    return totalSurfaceArea;
  }

  getMinMaxCoordinates(coordinates: number[][], axisIndex: number) {
    let minCoordinate = Infinity;
    let maxCoordinate = -Infinity;
    coordinates.forEach(coordinate => {
      if (coordinate[axisIndex] < minCoordinate) {
        minCoordinate = coordinate[axisIndex];
      }
      if (coordinate[axisIndex] > maxCoordinate) {
        maxCoordinate = coordinate[axisIndex];
      }
    });
    return [minCoordinate, maxCoordinate];
  }

  areNeighbors(coord1: number[], coord2: number[]) {
    return (coord1[0] == coord2[0] && coord1[1] == coord2[1] && Math.abs(coord2[2] - coord1[2]) == 1)
      || (coord1[1] == coord2[1] && coord1[2] == coord2[2] && Math.abs(coord2[0] - coord1[0]) == 1)
      || (coord1[0] == coord2[0] && coord1[2] == coord2[2] && Math.abs(coord2[1] - coord1[1]) == 1)
  }

  getNeighbors(coord: number[]): number[][] {
    const x = coord[0];
    const y = coord[1];
    const z = coord[2];
    return [[x, y + 1, z], [x + 1, y, z], [x, y - 1, z], [x - 1, y, z], [x, y, z + 1], [x, y, z - 1]];
  }
}
