import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})

export class PlanetsService {

  constructor( private apiHttpService: ApiHttpService ) { }

  getPlanets(): Observable<any> {
    return this.apiHttpService.get('https://swapi.dev/api/planets?page=1');
  }
}
