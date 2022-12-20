import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayIComponent } from './components/day-i/day-i.component';
import { DayIIComponent } from './components/day-ii/day-ii.component';
import { DayIIIComponent } from './components/day-iii/day-iii.component';
import { DayIVComponent } from './components/day-iv/day-iv.component';
import { DayIXComponent } from './components/day-ix/day-ix.component';
import { DayVComponent } from './components/day-v/day-v.component';
import { DayVIComponent } from './components/day-vi/day-vi.component';
import { DayVIIComponent } from './components/day-vii/day-vii.component';
import { DayVIIIComponent } from './components/day-viii/day-viii.component';
import { DayXComponent } from './day-x/day-x.component';

const routes: Routes = [
  {path: 'day-1', component: DayIComponent},
  {path: 'day-2', component: DayIIComponent},
  {path: 'day-3', component: DayIIIComponent},
  {path: 'day-4', component: DayIVComponent},
  {path: 'day-5', component: DayVComponent},
  {path: 'day-6', component: DayVIComponent},
  {path: 'day-7', component: DayVIIComponent},
  {path: 'day-8', component: DayVIIIComponent},
  {path: 'day-9', component: DayIXComponent},
  {path: 'day-10', component: DayXComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
