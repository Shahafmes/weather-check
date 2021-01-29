import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MeasurementUnits} from '../models/measurement-unit.model';
import {ILocationWeather} from '../store/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeatherByLocation(cityId: string, units: MeasurementUnits): Observable<ILocationWeather> {
    return this.http.get<ILocationWeather>(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}
    &units=${units}&appid=${environment.openweathermapAPIKey}`);
  }

}
