import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';
import { PublicDataService } from '../../../services/public-data/public-data.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];
  pagination: any = {
    limite: 20,
    offset: 0,
    total: 0,
  };
  filter: any = {
    titulo: '',
    tipo: '',
    estado: '',
  };

  cities: Observable<any[]>;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getUsers();
  }

  getCities(): void {
    this.cities = this.publicDataService.getCities(this.filter.estado);
  }

  fetchUrlParams(): void {
    this.route.queryParamMap.subscribe(p => {
      if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('titulo')) { this.filter.titulo = p.get('titulo'); }
      if (p.get('tipo')) { this.filter.tipo = p.get('tipo'); }
      if (p.get('estado')) {
        this.filter.estado = p.get('estado');
        this.getCities();
      }
      if (p.get('cidade')) { this.filter.cidade = p.get('cidade'); }
    }).unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.offset = 0;
    this.filter = {
      titulo: '',
      tipo: '',
      estado: '',
      cidade: '',
    };
    this.getUsers();
  }

  getUsers(): void {
    const filter = {...this.filter};
    for (const el in filter) {
      if (filter[el].length === 0){
        delete filter[el];
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

    this.usersService.getUsers({
      offset: this.pagination.offset,
      ...filter,
    }).subscribe((res) => {
      this.users = res.dados;
      this.pagination = res.paginacao;
    });
  }

}
