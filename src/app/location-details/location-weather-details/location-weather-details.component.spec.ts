import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWeatherDetailsComponent } from './location-weather-details.component';

describe('LocationWeatherDetailsComponent', () => {
  let component: LocationWeatherDetailsComponent;
  let fixture: ComponentFixture<LocationWeatherDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWeatherDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
