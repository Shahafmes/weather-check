import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import Cities from '../JSON/city.list.min.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  constructor(private http: HttpClient) {
    this.init();
  }
  private cityListMap = new Map<string, number>();

  private init(): void{
    this.citiesList();
  }

  getWeatherByLocation(location): Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${location.city}&units=${location.unit}&appid=${environment.openweathermapAPIKey}`);
  }

  citiesList(): void{
    Cities.forEach( city => this.cityListMap.set( city.id, city.name));
  }

  getCityListMap(): Map<string, number>{
    return this.cityListMap;
  }
}
