import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {WeatherLocationService} from '../services/weather-location.service';
import * as LocationActions from '../store/actions';
import {City} from './reducers';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class WeatherLocationEffects {
    getLocationWeatherDetails$ = createEffect(() =>
       this.actions$.pipe(
          ofType(LocationActions.getLocationWeatherDetails.type),
          concatMap(({ city, unit }) =>
            this.weatherLocationService.getWeatherByLocation({city, unit}).pipe(
                map((res: any) => {
                  const city: City = {
                    cityName: res?.name,
                    id: res?.id,
                    weatherDesc: res?.weather[0]?.description,
                    weatherIcon: res?.weather[0]?.icon,
                    temperature: res?.main?.temp,
                  };
                  return LocationActions.getLocationWeatherDetailsSuccess({ city });
                }),
                catchError(error => of(LocationActions.getLocationWeatherDetailsFailed({ error })))
            )
          )
        )
    );

  constructor(private actions$: Actions, private weatherLocationService: WeatherLocationService) {}

}


