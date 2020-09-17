import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places/places.service';
import { RatingsService } from 'src/app/services/ratings/ratings.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place: any = null;
  ratings: any = [];

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private ratingsService: RatingsService,
    ) { }

  ngOnInit(): void {
    this.getPlace();
    this.getRatings();
  }

  getPlace(): void {
    this.placesService.getPlace(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.place = res;
    });
  }

  getRatings(): void {
    const params = {
      estabelecimento_id: this.route.snapshot.paramMap.get('id'),
    };
    this.ratingsService.getRatings(params).subscribe((res) => {
      this.ratings = res.dados.filter((item) => item.status === 'aprovada');
    });
  }

}
