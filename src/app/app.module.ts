import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayIComponent } from './components/day-i/day-i.component';
import { DayIiComponent } from './components/day-ii/day-ii.component';

@NgModule({
  declarations: [
    AppComponent,
    DayIComponent,
    DayIiComponent
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
