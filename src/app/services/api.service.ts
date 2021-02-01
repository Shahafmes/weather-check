import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import Cities from '../JSON/city.list.json';
import {City} from '../models/cities.model';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private cityListMap = new Map<string, number>();
  private citiesWeather = new BehaviorSubject<Array<City>>([]);
  private citiesArr = [];
  private cityAdd = new Subject<City>();
  private lastCity = new Subject<City>();

  // getWeatherByLocation(cityId: string, units: MeasurementUnits): Observable<ILocationWeather> {
  fetchWeatherLocation(location){ // : Observable<ILocationWeatherResponse> {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${location.city}&units=${location.unit}&appid=${environment.openweathermapAPIKey}`)
      .pipe(
        map((res: any) => {
          const city: City = {
            cityName: res?.name,
            id: res?.id,
            weatherDesc: res?.weather[0]?.description,
            weatherIcon: res?.weather[0]?.icon,
            temperature: res?.main?.temp,
          }
          this.lastCity.next(city);
          return city;
        }),
        catchError(err => {
          console.log('caught mapping error and rethrowing', err);
          return throwError(err);
        })
      )
      .subscribe( response => {
        console.log(response);
        this.citiesArr.push(response);
        this.citiesWeather.next(this.citiesArr);
      });
  }

  citiesList(){
    Cities.forEach( city => this.cityListMap.set( city.id, city.name));
  }

  getCityListMap(){
    return this.cityListMap;
  }

  getCityIdByName(cityName){
    return this.cityListMap.get(cityName);
  }

  addCity(city: City){
    this.cityAdd.asObservable();
  }

  getLastCity$(): Observable<City> {
    return this.lastCity.asObservable();
  }

  getCities$(): Observable<Array<City>>{
    return this.citiesWeather.asObservable();
  }

}
