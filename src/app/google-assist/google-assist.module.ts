import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherComponent } from './weather/weather.component';
import { NewsComponent } from './news/news.component';
import { MaterialModule } from '../shared/modules/material.module';
import { GoogleAssistRoutingModule } from './google-assist-routing.module';


@NgModule({
  declarations: [WeatherComponent, NewsComponent],
  imports: [
    CommonModule,
    GoogleAssistRoutingModule,
    MaterialModule
  ],
  exports:[NewsComponent, WeatherComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class GoogleAssistModule { }
