import { Component, OnInit } from '@angular/core';
import { GoogleAssistService } from '../shared/api/google-assist.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Weather, News } from '../shared/models/models';

@Component({
  selector: 'app-google-assist',
  templateUrl: './google-assist.component.html',
  styleUrls: ['./google-assist.component.scss']
})
export class GoogleAssistComponent implements OnInit {
  auth
  readonly WEATHER = "WEATHER"
  readonly SEARCH = "SEARCH"
  readonly PENDING = "PENDING"
  command: any = {}
  selected = new FormControl(0);
  pending = true
  public weatherList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public newsList: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);

  constructor(public gs: GoogleAssistService) { }

  ngOnInit() {
    this.initComands()
  }

  initComands() {
    this.gs.getCommands().subscribe(data => {
      this.command = data[0]
      console.log(this.command)
      switch (this.command.type) {
        case this.WEATHER:
          this.getWeather()
          break;
        case this.SEARCH:
          this.getInfo()
          break;
        case this.PENDING:
          this.pending = true
          break;
      }
    })
  }
  getWeather() {
    this.selected.setValue(1);
    this.pending = false
    this.gs.getCurrentWeatherByCity(this.command.city).subscribe(res => {
      this.weatherList.next(res)
    })
  }

  getInfo() {
    this.selected.setValue(0);
    this.pending = false
    this.gs.searchNewsEverything(this.command.city, this.command.lang).subscribe(res => {
      if (res.articles)
        this.newsList.next(res.articles.filter(art => art.source.name.toUpperCase().split('DEALABS').length == 1))

    })
  }

  change(e) {
    if (e == 0) {
      this.getInfo()
    } else (
      this.getWeather()
    )
  }

}
