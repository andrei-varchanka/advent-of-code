import { Injectable } from '@angular/core';
import { Solver } from '../models/solver.model';
import { Observable, catchError, from, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor(private readonly http: HttpClient) { }

  getSolver(year: number, day: number): Observable<Solver | null> {
    return from(import(`../solutions/${year}/day${day}.ts`))
      .pipe(catchError(() => of(null)))
      .pipe(map((module) => (module === null ? null : new module.default())));
  }

  getInput(year: number, day: number): Observable<string | null> {
    return this.http.get(`/assets/input-data/${year}/input${day}.txt`, { responseType: "text" })
      .pipe(catchError(() => of(null)))
      .pipe(
        map((input) => {
          if (input === null) {
            return null;
          }
          return input;
        }),
      );
  }
}
