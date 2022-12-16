import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayIComponent } from './components/day-i/day-i.component';
import { DayIiComponent } from './components/day-ii/day-ii.component';

const routes: Routes = [
  {path: 'day-1', component: DayIComponent},
  {path: 'day-2', component: DayIiComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
