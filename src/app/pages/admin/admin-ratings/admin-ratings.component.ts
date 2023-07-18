import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RatingsService } from '../../../services/ratings/ratings.service';

@Component({
  selector: 'app-admin-ratings',
  templateUrl: './admin-ratings.component.html',
  styleUrls: ['./admin-ratings.component.scss'],
})
export class AdminRatingsComponent implements OnInit {
  ratings: any[] = [];
  pagination: any = {
    limit: 8,
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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getRatings();
  }

  fetchUrlParams(): void {
    this.route.queryParamMap
      .subscribe((p) => {
        if (p.get('offset')) {
          this.pagination.offset = p.get('offset');
        }
        if (p.get('status')) {
          this.filter.status = p.get('status');
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
      status: '',
    };
    this.getRatings();
  }

  getRatings(): void {
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

    this.ratingsService
      .getRatings({
        offset: this.pagination.offset,
        limit: this.pagination.limit,
        ...filter,
      })
      .subscribe((res) => {
        this.ratings = res.reviews;
        this.pagination = {
          limit: res.limit,
          offset: res.offset,
          total: res.total,
        };
      });
  }

  approveRating(id: string, index: number): void {
    this.ratingsService.approveRating(id).subscribe((res) => {
      this.ratings[index].status = 'approved';
      this.toastr.success('Avaliação aprovada');
    });
  }

  deleteRating(id: string, index: number): void {
    this.closeModal(id);
    this.ratingsService.deleteRating(id).subscribe((res) => {
      this.ratings.splice(index, 1);
      this.toastr.success('Avaliação excluída');
    });
  }

  getRatingsPerPage() {
    this.pagination.offset = 0;
    this.getRatings();
  }

  numPages(): Array<number> {
    return Array(Math.ceil(this.pagination.total / this.pagination.limit));
  }

  openDeleteModal(id: string) {
    document.getElementById('modal-' + id).classList.add('is-active');
  }

  closeModal(id: string) {
    document.getElementById('modal-' + id).classList.remove('is-active');
  }
}
