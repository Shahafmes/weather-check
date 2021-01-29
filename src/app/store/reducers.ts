import {ILocationsWeatherState, ILocationWeather} from './interface';
import {createReducer, createSelector, on} from '@ngrx/store';
import {setLocation} from './actions';


export const initialState: ILocationsWeatherState = {
  locationsWeather: []
};

export const setWeatherLocationReducer = createReducer(
  initialState,
  on(setLocation, (state, { location }) => ({ ...state, location: { ...location } }))
);


export const locationSelector = (state: ILocationsWeatherState) => state.locationsWeather;

// export const setLocation = createSelector<ILocationsWeatherState>(
//   locationSelector,
//   (state: UsersState) => state.users



// TODO: set empy location as initial value
