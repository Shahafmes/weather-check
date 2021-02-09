import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule} from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule} from '@ngrx/store';

import { EffectsModule} from '@ngrx/effects';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { environment } from '../environments/environment';
import { reducer } from './store/reducers';
import { WeatherLocationEffects } from './store/effects';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { LocationWeatherDetailsComponent } from './location-details/location-weather-details/location-weather-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    LocationDetailsComponent,
    LocationWeatherDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSelectInfiniteScrollModule,
    FontAwesomeModule,
    StoreModule.forRoot({cities: reducer}),
    HttpClientModule,
    EffectsModule.forRoot([WeatherLocationEffects]),
    StoreDevtoolsModule.instrument({ name: 'Weather Location App', maxAge: 25, logOnly: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus);
  }
}
