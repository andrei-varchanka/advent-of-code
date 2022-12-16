import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayIComponent } from './components/day-i/day-i.component';
import { DayIIComponent } from './components/day-ii/day-ii.component';
import { DayIIIComponent } from './components/day-iii/day-iii.component';

const routes: Routes = [
  {path: 'day-1', component: DayIComponent},
  {path: 'day-2', component: DayIIComponent},
  {path: 'day-3', component: DayIIIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
