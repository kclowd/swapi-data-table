import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../services/planets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  isLoading: boolean = true;
  showError: boolean = false;

  planets: any[] = [];
  displayedColumns: string[] = ['planet-name', 'planet-climate', 'planet-residents', 'planet-terrains', 'planet-population', 'planet-surface-water'];

  constructor(private planetsService: PlanetsService) { }

  ngOnInit(): void {
    this.onGetPlanetList();
  }

  onGetPlanetList() {
    this.isLoading = true;

    this.planetsService.getPlanets().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.planets = this.formatPlanetData(res.results);
      },
      error: () => {
        this.isLoading = false;
        this.showError = true;
      }
    });
  }

  formatPlanetData(planets: any[]): any[] {
    const formattedData: any = [];

    planets.forEach((planet: any) => {
      formattedData.push({
        name: planet.name,
        climate: planet.climate == 'unknown' ? '?' : planet.climate,
        residents: planet.residents.length,
        terrains: planet.terrain == 'unknown' ? '?' : planet.terrain,
        population: planet.population == 'unknown' ? '?' : this.formatLargeNumber(planet.population),
        surfaceWater: (planet.surface_water == 'unknown' || planet.diameter == 'unknown') ? '?' : this.calculateSurfaceWater(planet.diameter, planet.surface_water)
      })
    })
    return formattedData.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }

  calculateSurfaceWater(diameter: number, percentWater: number): any {
    // Calculation for surface area of sphere: 
    // A = 4πr^2
    const radius = diameter/2;
    const waterPercent = percentWater * .01;
    const pi = Math.PI;

    const surfaceWater = (4 * pi * (radius ** 2)) * waterPercent;

    return Math.round(surfaceWater);
  }

  formatLargeNumber(x: number) {
    return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");;
}

}
