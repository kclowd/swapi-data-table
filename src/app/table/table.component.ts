import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../services/planets.service';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  isLoading: boolean = true;
  showError: boolean = false;

  planets: any[] = [];

  constructor(private planetsService: PlanetsService) { }

  ngOnInit(): void {
    this.onGetPlanetList();
  }

  onGetPlanetList() {
    this.isLoading = true;

    this.planetsService.getPlanets().subscribe((res: any) => {
      this.isLoading = false;
      if (res !== null) {
        this.planets = res;
        console.log(this.planets);
      } else {
        this.showError = true;
      }
    })
  }

}
