import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromReducer from '../store/reducers';
import {Observable} from 'rxjs';
import {City} from '../store/reducers';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  cities$: Observable<City[]>;

  constructor(private store: Store<fromReducer.State>) {}

  ngOnInit() {
    this.cities$ = this.store.select(fromReducer.getCities) as Observable<City[]>;
  }

}
