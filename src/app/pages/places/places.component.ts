import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlacesService } from '../../services/places/places.service';
import { PublicDataService } from '../../services/public-data/public-data.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  places: any[] = [];
  pagination: any = {
    limit: 9,
    offset: 0,
    total: 0,
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getPlaces();
  }

  getCities(): void {
    this.cities = this.publicDataService.getCities(this.filter.state);
  }

  fetchUrlParams(): void {
    this.route.queryParamMap
      .subscribe((p) => {
        if (p.get('offset')) {
          this.pagination.offset = p.get('offset');
        }
        if (p.get('title')) {
          this.filter.title = p.get('title');
        }
        if (p.get('type')) {
          this.filter.type = p.get('type');
        }
        if (p.get('state')) {
          this.filter.state = p.get('state');
          this.getCities();
        }
        if (p.get('city')) {
          this.filter.city = p.get('city');
        }
        if (p.get('perPage')) {
          this.filter.limit = p.get('perPage');
        }
      })
      .unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.total = 0;
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
    const filter = { ...this.filter };
    for (const el in filter) {
      if (!filter[el]) {
        filter[el] = null;
      }
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        offset: this.pagination.offset,
        ...filter,
      },
      queryParamsHandling: 'merge',
    });
    for (const el in filter) {
      if (!filter[el]) {
        delete filter[el];
      }
    }

    this.placesService
      .getPlaces({
        offset: this.pagination.offset,
        status: 'approved',
        limit: this.pagination.limit,
        ...filter,
      })
      .subscribe((res) => {
        this.places = res.establishments;
        this.pagination = {
          limit: res.limit,
          offset: res.offset,
          total: res.total,
        };
      });
  }

  checkIfAccessibiltyExists(place: any, accessibilityName: string) {
    const accessibilty = place.accessibilities.filter(
      (e) => e.name === accessibilityName
    );
    return accessibilty.length > 0 && accessibilty[0].has;
  }

  redirectUser(id: string, event: any): void {
    if (!this.authService.getAuthToken()) {
      this.router.navigateByUrl('/entrar');
    } else {
      this.router.navigateByUrl('/estabelecimentos/' + id + '/avaliar');
    }
  }

  getPlacesPerPage() {
    this.pagination.offset = 0;
    this.getPlaces();
  }

  numPages(): Array<number> {
    return Array(Math.ceil(this.pagination.total / this.pagination.limit));
  }
}
