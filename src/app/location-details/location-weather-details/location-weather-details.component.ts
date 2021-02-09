import {Component, Input, OnInit} from '@angular/core';
import {City} from '../../store/reducers';

@Component({
  selector: 'app-location-weather-details',
  templateUrl: './location-weather-details.component.html',
  styleUrls: ['./location-weather-details.component.css']
})
export class LocationWeatherDetailsComponent implements OnInit {

  @Input() city: City;

  constructor() { }

  ngOnInit(): void {
  }

}
