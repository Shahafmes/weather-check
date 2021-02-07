import { createAction, props } from '@ngrx/store';
import {City} from './reducers';
import * as MeasurementUnitsEnum from '../models/measurement-unit.model'

export enum LocationsWeatherTypesNames {
  GET_LOCATIONS = '[Dashboard Page] Get Locations',
  GET_LOCATION = '[Dashboard] Get Weather Location Details From Store',
  SET_LOCATION = '[Dashboard - API] Set Location to Store',
  SET_LOCATION_SUCCESS = '[Dashboard - API] Set Location to Store Success - V',
  SET_LOCATION_FAILED_ = '[Dashboard - API] Set Location to Store Failed - X',

  SET_LOADING_ON = '[Dashboard] API Running',
  SET_LOADING_OFF = '[Dashboard] API Complete',
}


export const getlocations = createAction(LocationsWeatherTypesNames.GET_LOCATIONS);

export const getLocationWeatherDetails = createAction(LocationsWeatherTypesNames.GET_LOCATION, props<{ city: string, unit: MeasurementUnitsEnum.MeasurementUnits }>());

export const getLocationWeatherDetailsSuccess = createAction(LocationsWeatherTypesNames.SET_LOCATION_SUCCESS, props<{ city: City }>());

export const getLocationWeatherDetailsFailed = createAction(LocationsWeatherTypesNames.SET_LOCATION_FAILED_, props<{ error: string }>());

export const setIsLoadingToOn = createAction(LocationsWeatherTypesNames.SET_LOADING_ON);

export const setIsLoadingToOff = createAction(LocationsWeatherTypesNames.SET_LOADING_OFF);

