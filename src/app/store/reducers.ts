import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import * as LocationActions from '../store/actions';


export interface State {
  cities: WeatherLocationState;
}

export interface WeatherLocationState {
  isLoading: boolean;
  error: string;
  cities: City[];
}

export interface City {
  id: number;
  cityName: string;
  weatherDesc?: string;
  weatherIcon?: string;
  temperature?: number;
}

const initialState: WeatherLocationState = {
  isLoading: false,
  error: '',
  cities: []
}


// Selector functions
const getWeatherLocationState = createFeatureSelector<WeatherLocationState>('cities');

export const getIsLoading = createSelector(
  getWeatherLocationState,
  state => state.isLoading
);

export const getError = createSelector(
  getWeatherLocationState,
  state => state.error
);

export const getCities = createSelector(
  getWeatherLocationState,
  state => state.cities
);


const weatherLocationReducer = createReducer<WeatherLocationState>(
  initialState,
  on(LocationActions.setIsLoadingToOff, (state): WeatherLocationState => {
    return {
      ...state,
      isLoading: false
    };
  }),
  on(LocationActions.setIsLoadingToOn, (state): WeatherLocationState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LocationActions.getlocations, (state): WeatherLocationState => {
    return {
      ...state,
      cities: state?.cities,
      error: ''
    };
  }),
  on(LocationActions.getLocationWeatherDetailsFailed, (state, action): WeatherLocationState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(LocationActions.getLocationWeatherDetailsSuccess, (state, action): WeatherLocationState => {
    return {
      ...state,
      cities: [...state.cities, action.city],
      error: ''
    };
  }),
);

export function reducer(state: WeatherLocationState, action: Action) {
  return weatherLocationReducer(state, action);
}
