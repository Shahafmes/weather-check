import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  constructor(private apiService: ApiService) {}
    cities = this.apiService.getCities$(); // no need to unsubscribe in destroy nice tip from interview :)
   ngOnInit() {

   }


}
