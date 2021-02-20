import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PlacesService } from '../../../services/places/places.service';
import { PublicDataService } from '../../../services/public-data/public-data.service';

@Component({
  selector: 'app-admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.scss']
})
export class AdminPlacesComponent implements OnInit {

  places: any[] = [];
  pagination: any = {
    limit: 20,
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
    private toastr: ToastrService,
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
      // if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('title')) { this.filter.title = p.get('title'); }
      if (p.get('type')) { this.filter.type = p.get('type'); }
      if (p.get('estado')) {
        this.filter.estado = p.get('estado');
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
      ...filter,
    }).subscribe((res) => {
      this.places = res;
      // this.pagination = res.paginacao;
    });
  }

  approvePlace(id: string, index: number): void {
    const body = {
      status: 'approved',
    };
    this.placesService.approvePlace(id).subscribe((res) => {
      this.places[index].status = 'approved';
      this.toastr.success('Estabelecimento aprovado');
    });
  }

  deletePlace(id: string, index: number): void {
    if (window.confirm('Tem certeza que deseja excluir este estabelecimento?').valueOf()) {
      this.placesService.deletePlace(id).subscribe((res) => {
        this.places.splice(index, 1);
        this.toastr.success('Estabelecimento excluído');
      });
    }
  }

  checkIfAccessibiltyExists(place: any, accessibilityName: string) {
    const accessibilty = place.accessibilities.filter(e => e.Name === accessibilityName);
    return accessibilty.length > 0 && accessibilty[0].has;
  }

}
