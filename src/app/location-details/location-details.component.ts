import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {scan, takeUntil} from 'rxjs/operators';
import * as fromReducer from '../store/reducers';
import * as WeatherActions from '../store/actions';
import {City} from '../store/reducers';
import {MeasurementUnits} from '../models/measurement-unit.model';
import {WeatherLocationService} from '../services/weather-location.service';
import {Actions, ofType} from '@ngrx/effects';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  public weatherForm: FormGroup;
  keys = Object.keys ;
  public unitsLabels = MeasurementUnits;
  cities = [];
  citiesDetails$: Observable<City[]>;
  limit = 10;
  offset = 0;
  options = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;

  destroyed$ = new Subject<boolean>();
  errorMessage$: Observable<string>;

  constructor(private formBuilder: FormBuilder,
              private action$: Actions,
              private store: Store<fromReducer.State>,
              private apiService: WeatherLocationService) {
    this.options$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );

  }

  ngOnInit(): void {
    this.getCitiesListFromJsonFile();
    this.initialLocationForm();

    this.citiesDetails$ = this.store.select(fromReducer.getCities) as Observable<City[]>;
    this.errorMessage$ = this.store.select(fromReducer.getError) as Observable<string>;

    this.action$.pipe(
      ofType(WeatherActions.getLocationWeatherDetailsSuccess),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
       this.addNewLocationInput();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getCitiesListFromJsonFile(): void {
    this.apiService.citiesList();
    const citiesMap = this.apiService.getCityListMap();

    for (const [key, value] of citiesMap) {
      this.cities.push({
        key,
        value}
      );
    }
    this.getNextBatch();
  }

  getNextBatch(): void {
    const result = this.cities.slice(this.offset, this.offset + this.limit);
    this.options.next(result);
    this.offset += this.limit;
  }

  private initialLocationForm(): void {
    this.weatherForm = this.formBuilder.group({
      locations: this.formBuilder.array([this.createLocationWeatherFormGroup()])
    });
  }

  public addLocationFormGroup(index: number): void {
    const locations = this.weatherForm.get('locations') as FormArray;
    if (!locations?.valid) {
      return;
    }
    const lastWeatherLocation = locations?.value[index];
    this.store.dispatch(WeatherActions.getLocationWeatherDetails({city: lastWeatherLocation.city, unit: lastWeatherLocation.unit}));
  }

  private addNewLocationInput(): void{
    const locations = this.weatherForm.get('locations') as FormArray;
    locations.push(this.createLocationWeatherFormGroup());
  }

  private createLocationWeatherFormGroup(): FormGroup {
    return new FormGroup({
      city: new FormControl(''),
      unit: new FormControl('')
    });
  }

}
