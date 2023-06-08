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
    limit: 9,
    offset: 0,
    total: 0,
  };
  filter: any = {
    name: '',
    email: '',
    role: '',
  };

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

  fetchUrlParams(): void {
    this.route.queryParamMap.subscribe(p => {
      if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('name')) { this.filter.name = p.get('name'); }
      if (p.get('email')) { this.filter.email = p.get('email'); }
      if (p.get('role')) { this.filter.role = p.get('role'); } 
      if (p.get('perPage')) { this.filter.limit = p.get('perPage'); }
    }).unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.total = 0;
    this.pagination.offset = 0;
    this.filter = {
      name: '',
      email: '',
      role: '',      
    };
    this.getUsers();
  }

  getUsers(): void {
    const filter = {...this.filter};
    for (const el in filter) {
      if (!filter[el]){
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
      if (!filter[el]){
        delete filter[el];
      }
    }

    this.usersService.getUsers({
      offset: this.pagination.offset,
      limit: this.pagination.limit,
      ...filter,
    }).subscribe((res) => {
      this.users = res.users;
      this.pagination = {
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    });
  }

  getUsersPerPage(){
    //reset offset
    this.pagination.offset = 0;
    this.getUsers();
  }

  numPages(): Array<number> {
    return Array(Math.ceil(this.pagination.total/this.pagination.limit));
  }


}
