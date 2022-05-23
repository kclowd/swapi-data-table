import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})

export class PlanetsService {

  constructor( private apiHttpService: ApiHttpService ) { }

  getPlanets() {
    return this.apiHttpService.get('https://swapi.dev/api/planets/');
  }
}
