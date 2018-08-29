import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OpenWeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpenWeatherProvider {

  private data:any;

  constructor(public http: Http) {
    console.log('Hello OpenWeatherProvider Provider');
  }

  getWeatherForLocation(lat,lng){ //gets the weather for given lat and lon based on openweather api
    
    return this.data=this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=[[yourtoken]]&units=metric&type=accuracy')
    .map(res => res.json());
    
  }

}
