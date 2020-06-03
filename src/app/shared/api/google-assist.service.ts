import { Injectable } from '@angular/core';
import { FireBaseService } from '../services/fire-base.service';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAssistService {

  constructor(public fbs: FireBaseService, public hs: HttpService) { }


  getCommands() {
    const vUrl = 'commands'
    return this.fbs.getCollection(vUrl)
  }

  searchNewsTopHeadlines(pCountry, pLang) {
    const vUrl = `http://newsapi.org/v2/top-headlines?q=${pCountry}
    &language=${pLang}&sortBy=publishedAt&apiKey=${environment.newsApiKey}`
    return this.hs.getService(vUrl)
  }

  searchNewsEverything(pCountry, pLang) {
    const vUrl = `http://newsapi.org/v2/everything?q=${pCountry}
    &language=${pLang}&sortBy=publishedAt&apiKey=${environment.newsApiKey}`
    return this.hs.getService(vUrl)
  }

// ----------------- weather --------------------//

  getCurrentWeatherByCity(pCity) {
    const vUrl = `https://api.openweathermap.org/data/2.5/weather?q=${pCity}
    &units=metric&appid=${environment.weatherApiKey}`
    return this.hs.getService(vUrl)

  }
  getCurrentWeatherByCoord(lat, lon) {
    const vUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}
    &units=metric&appid=${environment.weatherApiKey}`
    return this.hs.getService(vUrl)
  }
}
