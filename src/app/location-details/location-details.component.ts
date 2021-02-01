import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MeasurementUnits} from '../models/measurement-unit.model';
import {ApiService} from '../services/api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { scan} from 'rxjs/operators';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  public weatherForm: FormGroup;
  keys = Object.keys ;
  public unitsLabels = MeasurementUnits;
  public cities = [];
  citiesDetails = this.apiService.getCities$();
  loaded = false;

  limit = 10;
  offset = 0;
  options = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.options$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );
  }

  ngOnInit(): void {
    this.apiService.citiesList();
    const citiesMap = this.apiService.getCityListMap();

    for (var [key, value] of citiesMap) {
      this.cities.push({
        key: key,
        value: value}
        )
    }
    this.getNextBatch();
    this.weatherForm = this.formBuilder.group({
      locations: this.formBuilder.array([this.createLocationWeatherFormGroup()])
    });
  }

  getNextBatch() {
    const result = this.cities.slice(this.offset, this.offset + this.limit);
    this.options.next(result);
    this.offset += this.limit;
  }

  public addLocationFormGroup(): void {
      const locations = this.weatherForm.get('locations') as FormArray;
      const lastWeatherLocation = locations.value.slice(-1);
      this.apiService.fetchWeatherLocation(lastWeatherLocation[0]);
      locations.push(this.createLocationWeatherFormGroup());
      this.loaded = true;
  }

  private createLocationWeatherFormGroup(): FormGroup {
    return new FormGroup({
      city: new FormControl(''),
      unit: new FormControl('')
    });
  }
}
