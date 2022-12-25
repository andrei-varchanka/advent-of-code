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
import { DayXComponent } from './components/day-x/day-x.component';
import { DayXIComponent } from './components/day-xi/day-xi.component';
import { DayXIIComponent } from './components/day-xii/day-xii.component';
import { DayXIIIComponent } from './components/day-xiii/day-xiii.component';
import { DayXIVComponent } from './components/day-xiv/day-xiv.component';
import { DayXIXComponent } from './components/day-xix/day-xix.component';
import { DayXVComponent } from './components/day-xv/day-xv.component';
import { DayXVIComponent } from './components/day-xvi/day-xvi.component';
import { DayXVIIComponent } from './components/day-xvii/day-xvii.component';
import { DayXVIIIComponent } from './components/day-xviii/day-xviii.component';
import { DayXXComponent } from './components/day-xx/day-xx.component';
import { DayXXIComponent } from './components/day-xxi/day-xxi.component';
import { DayXXIIComponent } from './components/day-xxii/day-xxii.component';
import { DayXXIIIComponent } from './components/day-xxiii/day-xxiii.component';

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
  {path: 'day-10', component: DayXComponent},
  {path: 'day-11', component: DayXIComponent},
  {path: 'day-12', component: DayXIIComponent},
  {path: 'day-13', component: DayXIIIComponent},
  {path: 'day-14', component: DayXIVComponent},
  {path: 'day-15', component: DayXVComponent},
  {path: 'day-16', component: DayXVIComponent},
  {path: 'day-17', component: DayXVIIComponent},
  {path: 'day-18', component: DayXVIIIComponent},
  {path: 'day-19', component: DayXIXComponent},
  {path: 'day-20', component: DayXXComponent},
  {path: 'day-21', component: DayXXIComponent},
  {path: 'day-22', component: DayXXIIComponent},
  {path: 'day-23', component: DayXXIIIComponent},
  {path: 'day-24', component: DayXIVComponent},
  {path: 'day-25', component: DayXVComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
