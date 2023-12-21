import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Solver } from 'src/app/models/solver.model';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  year: number = 2022;
  day: number = 1;
  solver: Solver | null = null;
  input: string | null = null;
  answer1: any;
  answer2: any;
  time: number = 0;

  constructor(private route: ActivatedRoute, public router: Router, private solverService: SolverService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.year = +this.route.snapshot.params['year'];
      this.day = +this.route.snapshot.params['day'];
      this.answer1 = null;
      this.answer2 = null;
      this.time = 0;
      const startTime = performance.now();
      forkJoin([this.solverService.getSolver(this.year, this.day), this.solverService.getInput(this.year, this.day)]).subscribe(([solver, input]) => {
        this.solver = solver;
        this.input = input;
        this.getAnswers();
        this.time = +(performance.now() - startTime).toFixed(0);
      });
    });
  }

  public getAnswers() {
    if (this.solver && this.input) {
      this.answer1 = this.solver.part1(this.input);
      this.answer2 = this.solver.part2(this.input);
    }
  }
}
