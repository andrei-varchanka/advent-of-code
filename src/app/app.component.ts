import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  days = Array.from({length: 25}, (_, i) => i + 1)

  constructor() {
  }

}
