import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '2022/day/1'},
  {path: ':year/day/:day', component: DayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
