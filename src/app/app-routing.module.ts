import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayIComponent } from './components/day-i/day-i.component';

const routes: Routes = [
  {path: 'day-1', component: DayIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
