import {Injectable} from '@angular/core';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../services/api.service';
import {getLocation, setLocation} from './actions';


@Injectable()
export class WeatherLocationEffects {

  getlocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLocation.type),
      mergeMap(({ id, units }) =>
        this.apiService.getWeatherByLocation(id, units).pipe(
          map(location => setLocation({ location }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}
}


