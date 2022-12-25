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
import { DayXComponent } from './day-x/day-x.component';
import { DayXIComponent } from './day-xi/day-xi.component';
import { DayXIIComponent } from './day-xii/day-xii.component';
import { DayXIIIComponent } from './day-xiii/day-xiii.component';
import { DayXIVComponent } from './day-xiv/day-xiv.component';
import { DayXVComponent } from './day-xv/day-xv.component';

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
    DayIXComponent,
    DayXComponent,
    DayXIComponent,
    DayXIIComponent,
    DayXIIIComponent,
    DayXIVComponent,
    DayXVComponent
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
