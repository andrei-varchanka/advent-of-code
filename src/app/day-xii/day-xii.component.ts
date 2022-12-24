import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-xii',
  templateUrl: './day-xii.component.html',
  styleUrls: ['./day-xii.component.scss']
})
export class DayXIIComponent implements OnInit {

  // https://www.redblobgames.com/pathfinding/a-star/introduction.html
  // http://theory.stanford.edu/~amitp/GameProgramming/

  data = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

  matrix: Array<number[] | string[]> = [];

  directionsMatrix: Array<string[]> = [];

  S = { x: 0, y: 0 };
  E = { x: 0, y: 0 };
  starts: Array<{ x: number, y: number }> = [];

  result1: number = 0;

  result2: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('assets/input-data/input12.txt', { responseType: 'text' }).subscribe(data => {
      this.initMatrix(data);
      const path = this.getShortestPath(this.S.x, this.S.y, this.E.x, this.E.y);
      this.result1 = path.length;
      let min_path_length = Number.MAX_VALUE;
      for (let start of this.starts) {
        const path = this.getShortestPath(start.x, start.y, this.E.x, this.E.y);
        if (path.length) {
          min_path_length = Math.min(min_path_length, path.length);
        }
      }

      this.result2 = min_path_length;
      console.log(this.matrix);
      console.log(this.directionsMatrix);
    });
  }

  initMatrix(str: string) {
    this.matrix = str.split('\n').map(item => item.split(''));
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] === 'S') {
          this.S = { x, y };
          this.matrix[y][x] = 'a';
        } else if (this.matrix[y][x] === 'E') {
          this.E = { x, y };
          this.matrix[y][x] = 'z';
        }
        if (this.matrix[y][x] === 'a') {
          // Part two
          this.starts.push({ x, y });
        }
        this.matrix[y][x] = (this.matrix[y][x] as string).charCodeAt(0);
      }
    }
    this.directionsMatrix = new Array(this.matrix.length).fill(0).map(() => Array(this.matrix[0].length).fill(0));
    this.directionsMatrix[this.S.y][this.S.x] = 'S';
    this.directionsMatrix[this.E.y][this.E.x] = 'E';
  }

  // Breadth First Search
  getShortestPath(from_x: number, from_y: number, to_x: number, to_y: number) {
    const came_from = this.buildFrontier(from_x, from_y);

    const from_id = this.toId(from_x, from_y);
    const to_id = this.toId(to_x, to_y);
    let current: string | undefined = to_id;

    let path = [];
    while (current !== undefined && current !== from_id) {
      path.push(current);
      current = came_from.get(current);
    }
    if (current === undefined) {
      return [];
    }
    path.reverse();
    return path;
  }

  toId(x: number, y: number) {
    return `${x},${y}`;
  };

  getNeighbors(x: number, y: number) {
    return [
      { x: x, y: y - 1, direction: '↓' },
      { x: x - 1, y: y, direction: '→' },
      { x: x + 1, y: y, direction: '←' },
      { x: x, y: y + 1, direction: '↑' },
    ].filter((coord) => typeof this.matrix[coord.y]?.[coord.x] !== 'undefined');
  }

  buildFrontier(from_x: number, from_y: number): Map<string, string> {
    const frontier = [];
    frontier.push({ x: from_x, y: from_y });

    const came_from = new Map();
    came_from.set(this.toId(from_x, from_y), null);
    while (frontier.length > 0) {
      const current = frontier.shift() as { x: number, y: number };
      const current_val = this.matrix[current.y][current.x] as number;

      let neighbors = this.getNeighbors(current.x, current.y);
      for (let next of neighbors) {
        const next_cell = this.matrix[next.y][next.x] as number;
        const next_id = this.toId(next.x, next.y);

        if (next_cell - current_val > 1 || came_from.has(next_id)) {
          continue;
        }

        // Coord is walkable
        const current_id = this.toId(current.x, current.y);
        frontier.push(next);
        this.directionsMatrix[next.y][next.x] = next.direction;
        came_from.set(next_id, current_id);
      }
    }

    return came_from;
  }

}
