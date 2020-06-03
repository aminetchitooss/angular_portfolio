import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/app/shared/models/models';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() itemList: Observable<any>;
  data = {} as Weather
  constructor(public ds: DataService, public sanitizer: DomSanitizer) { }
  noPrefix = false
  mapLink
  url = this.noPrefix ? "http://openweathermap.org/img/w/" : "https://www.weatherbit.io/static/img/icons/"
  ngOnInit() {
    this.itemList.subscribe(param => {
      if (this.ds.isNotNull(param)) {
        this.initData(param)
      }
    })
  }

  initData(param) {
    this.data = param
    const date = new Date(param.dt * 1000)
    this.data.dt = date.toDateString() + '\n' + date.toLocaleTimeString()
    this.data.sys.sunrise = new Date(param.sys.sunrise* 1000).toLocaleTimeString()
    this.data.sys.sunset = new Date(param.sys.sunset * 1000).toLocaleTimeString()
    this.data.weather.id = param.weather[0].id
    this.data.main.temp = Math.round(param.main.temp)
    this.data.weather.main = param.weather[0].main
    this.data.weather.description = param.weather[0].description
    this.data.weather.icon = this.url + this.getPrefix(this.data.weather.id, this.noPrefix) +
      param.weather[0].icon + ".png"
    this.createMapFrame()
  }

  createMapFrame() {
    this.mapLink = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAr3-W5QaQSP93-XOj7c1eWVcWCM_UErlU&q=${this.data.coord.lat}%2C${this.data.coord.lon}&zoom=12`
    let iframe: any = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = "100%";
    iframe.height = "320px";
    iframe.id = "randomid";
    iframe.setAttribute("src", this.mapLink);
    document.getElementById("map").innerHTML = ''
    document.getElementById("map").appendChild(iframe);
  }

  getPrefix(pId, noPrefix?) {
    if (noPrefix)
      return ''
    if (200 <= pId && pId <= 233) {
      return 't'
    } else if (300 <= pId && pId <= 302) {
      return 'd'
    } else if (500 <= pId && pId <= 502) {
      return 't'
    } else if (511 === pId) {
      return 'f'
    } else if (520 <= pId && pId <= 522) {
      return 'r'
    } else if (600 <= pId && pId <= 623) {
      return 's'
    } else if (700 <= pId && pId <= 751) {
      return 'a'
    } else if (800 <= pId && pId <= 804) {
      return 'c'
    } else if (900 === pId) {
      return 'u'
    }
  }
}
