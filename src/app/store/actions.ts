import { createAction, props } from '@ngrx/store';
import {ILocationWeather, LocationsWeatherTypesNames} from './interface';

/** Action to fetch all locations */
export const getlocations = createAction(LocationsWeatherTypesNames.GET_LOCATIONS);

/** Action to set location in store */
export const setLocation = createAction(LocationsWeatherTypesNames.SET_LOCATION, props<{ location: ILocationWeather }>());

/** Action to get location in store */
export const getLocation = createAction(LocationsWeatherTypesNames.GET_LOCATION, props<{ cityName: string }>());
