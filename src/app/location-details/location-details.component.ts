import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MeasurementUnits} from '../models/measurement-unit.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  public weatherForm: FormGroup;
  keys = Object.keys ;
  public unitsLabels = MeasurementUnits;
  public cities = ['Tel Aviv', 'Beer Sheva'];
  // public validationMsgs = {
  //   'emailAddress': [{ type: 'email', message: 'Enter a valid email' }]
  // }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      locations: this.formBuilder.array([this.createLocationWeatherFormGroup()])
    });
  }

  public addLocationFormGroup(): void {
      const locations = this.weatherForm.get('locations') as FormArray
      locations.push(this.createLocationWeatherFormGroup());
  }

  private createLocationWeatherFormGroup(): FormGroup {
    return new FormGroup({
      'city': new FormControl(''),
      'unit': new FormControl('')
    });
  }
}
