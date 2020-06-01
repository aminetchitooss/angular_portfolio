import { Component } from '@angular/core';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public ds: DataService) {
    this.ds.initApp()
  }
}
