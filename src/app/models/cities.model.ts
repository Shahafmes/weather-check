export interface CitiesJson {
  Cities: City[];
}

export interface City {
  id: number;
  cityName: string;
  weatherDesc: string;
  weatherIcon: string;
  temperature: number;
}
