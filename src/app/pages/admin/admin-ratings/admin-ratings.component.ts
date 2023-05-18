import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RatingsService } from '../../../services/ratings/ratings.service';

@Component({
  selector: 'app-admin-ratings',
  templateUrl: './admin-ratings.component.html',
  styleUrls: ['./admin-ratings.component.scss']
})
export class AdminRatingsComponent implements OnInit {

  ratings: any[] = [];
  pagination: any = {
    limit: 20,
    offset: 0,
    total: 0,
  };
  filter: any = {
    status: '',
  };

  constructor(
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getRatings();
  }

  fetchUrlParams(): void {
    this.route.queryParamMap.subscribe(p => {
      if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('status')) { this.filter.status = p.get('status'); }
    }).unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.offset = 0;
    this.filter = {
      status: '',
    };
    this.getRatings();
  }

  getRatings(): void {
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

    this.ratingsService.getRatings({
      offset: this.pagination.offset,
      ...filter,
    }).subscribe((res) => {
      this.ratings = res.reviews;
      this.pagination = {
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    });
  }

  approveRating(id: string, index: number): void {
    const body = {
      status: 'approved',
    };
    this.ratingsService.approveRating(id).subscribe((res) => {
      this.ratings[index].status = 'approved';
      this.toastr.success('Avaliação aprovada');
    });
  }

  deleteRating(id: string, index: number): void {
    this.closeModal();    
    this.ratingsService.deleteRating(id).subscribe((res) => {
      this.ratings.splice(index, 1);
      this.toastr.success('Avaliação excluída');        
    });    
  }

  openModal() {
    // Add is-active class on the modal
    document.getElementById("modal1").classList.add("is-active");
  }

  // Function to close the modal
  closeModal() {
    document.getElementById("modal1").classList.remove("is-active");
  }

}
