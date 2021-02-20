import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from '../../services/places/places.service';
import { PublicDataService } from '../../services/public-data/public-data.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: any[] = [];
  pagination: any = {
    limit: 20,
    offset: 0,
    total: 100,
  };
  filter: any = {
    title: '',
    type: '',
    state: '',
    city: '',
  };

  cities: Observable<any[]>;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService,
  ) { }

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getPlaces();
  }

  getCities(): void {
    this.cities = this.publicDataService.getCities(this.filter.state);
  }

  fetchUrlParams(): void {
    this.route.queryParamMap.subscribe(p => {
      if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('title')) { this.filter.title = p.get('title'); }
      if (p.get('type')) { this.filter.type = p.get('type'); }
      if (p.get('state')) {
        this.filter.state = p.get('state');
        this.getCities();
      }
      if (p.get('city')) { this.filter.city = p.get('city'); }
    }).unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.offset = 0;
    this.filter = {
      title: '',
      type: '',
      state: '',
      city: '',
    };
    this.getPlaces();
  }

  getPlaces(): void {
    const filter = {...this.filter};
    for (const el in filter) {
      if (filter[el].length === 0){
        delete filter[el];
      }
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        // offset: this.pagination.offset,
        ...filter,
      },
      queryParamsHandling: 'merge',
    });

    this.placesService.getPlaces({
      // offset: this.pagination.offset,
      status: 'approved',
      ...filter,
    }).subscribe((res) => {
      this.places = res;
      // this.pagination = res.paginacao;
    });
  }

  checkIfAccessibiltyExists(place: any, accessibilityName: string) {
    const accessibilty = place.accessibilities.filter(e => e.Name === accessibilityName);
    return accessibilty.length > 0 && accessibilty[0].has;
  }

}
