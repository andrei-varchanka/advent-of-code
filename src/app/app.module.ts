import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayIComponent } from './components/day-i/day-i.component';
import { DayIIComponent } from './components/day-ii/day-ii.component';
import { DayIIIComponent } from './components/day-iii/day-iii.component';
import { DayIVComponent } from './components/day-iv/day-iv.component';
import { DayVComponent } from './components/day-v/day-v.component';
import { DayVIComponent } from './components/day-vi/day-vi.component';
import { DayVIIComponent } from './components/day-vii/day-vii.component';
import { DayVIIIComponent } from './components/day-viii/day-viii.component';
import { DayIXComponent } from './components/day-ix/day-ix.component';

@NgModule({
  declarations: [
    AppComponent,
    DayIComponent,
    DayIIComponent,
    DayIIIComponent,
    DayIVComponent,
    DayVComponent,
    DayVIComponent,
    DayVIIComponent,
    DayVIIIComponent,
    DayIXComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
