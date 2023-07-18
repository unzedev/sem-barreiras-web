import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places/places.service';
import { RatingsService } from 'src/app/services/ratings/ratings.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {
  loading: boolean = true;
  place: any = null;
  ratings: any = [];
  ratingsPagination: any = {
    offset: 0,
    total: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.getPlace();
    this.getRatings();
  }

  getPlace(): void {
    this.placesService
      .getPlace(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          this.place = res;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }

  getRatings(): void {
    const params = {
      establishment: this.route.snapshot.paramMap.get('id'),
      offset: this.ratingsPagination.offset,
      status: 'approved',
    };
    this.ratingsService.getRatings(params).subscribe((res) => {
      this.ratings = [...this.ratings, ...res.reviews];
      this.ratingsPagination = {
        limit: res.limit,
        offset: res.offset,
        total: res.total,
      };
    });
  }

  loadMoreRatings(): void {
    this.ratingsPagination.offset += 20;
    this.getRatings();
  }

  checkIfAccessibiltyExists(accessibilityName: string) {
    const accessibilty = this.place.accessibilities.filter(
      (e) => e.name === accessibilityName
    );
    return accessibilty.length > 0 && accessibilty[0].has;
  }
}
