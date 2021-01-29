export  interface ILocationsWeatherState {
  locationsWeather: LocationsWeather;
}

export interface ILocationWeather {
  cityName: string;
  temperature: number;
  weatherDesc: string;
  weatherIcon: string;
}

export type LocationsWeather = Array<Partial<ILocationWeather>>;


export enum LocationsWeatherTypesNames {
  GET_LOCATION = '[Dashboard Page] Get Location', // handled by effect
  SET_LOCATION = '[Dashboard Page] Set Location to Store',
  GET_LOCATIONS = '[Dashboard Page] Get Locations' // handled by effect
}



/*
{
  "coord": {
    "lon": 34.7913,
    "lat": 31.2518
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",  <------------------------
      "description": "broken clouds",
        "icon": "04n"    <------------------------
    }
  ],
  "base": "stations",
  "main": {
      "temp": 13.33,       <------------------------
    "feels_like": 9.84,
    "temp_min": 13.33,
    "temp_max": 13.33,
    "pressure": 1016,
    "humidity": 44,
    "sea_level": 1016,
    "grnd_level": 982
  },
  "visibility": 10000,
  "wind": {
    "speed": 2.44,
    "deg": 96
  },
  "clouds": {
    "all": 65
  },
  "dt": 1611693526,
  "sys": {
    "country": "IL",
    "sunrise": 1611635786,
    "sunset": 1611673804
  },
  "timezone": 7200,
  "id": 295530,
  "name": "Beersheba",  <------------------------
  "cod": 200
}
*/
