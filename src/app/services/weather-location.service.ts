import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import Cities from '../JSON/city.list.min.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  constructor(private http: HttpClient) { }
  private cityListMap = new Map<string, number>();

  getWeatherByLocation(location){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${location.city}&units=${location.unit}&appid=${environment.openweathermapAPIKey}`);
  }

  citiesList(){
    Cities.forEach( city => this.cityListMap.set( city.id, city.name));
  }

  getCityListMap(){
    return this.cityListMap;
  }
}
