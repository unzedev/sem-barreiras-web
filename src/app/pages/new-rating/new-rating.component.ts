import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlacesService } from 'src/app/services/places/places.service';
import { PublicDataService } from 'src/app/services/public-data/public-data.service';
import { RatingsService } from 'src/app/services/ratings/ratings.service';

@Component({
  selector: 'app-new-rating',
  templateUrl: './new-rating.component.html',
  styleUrls: ['./new-rating.component.scss']
})
export class NewRatingComponent implements OnInit {

  rating: any = {
    titulo: '',
    comentario: '',
    pontos_positivos: '',
    pontos_negativos: '',
    nota: 0,
    estabelecimento_id: null,
    banheiro_acessivel: null,
    circulacao_interna: null,
    entrada_facilitada: null,
    estacionamento: null,
    sinalizacao: null,
    pap: null,
  };

  place: any = null;

  cities: Observable<any[]>;

  constructor(
    private placesService: PlacesService,
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.redirectUser();
    this.getPlace();
  }

  registerRating(): void {
    this.ratingsService.postRating(this.rating).subscribe((res) => {
      this.toastr.success('Avaliação criada');
      this.router.navigateByUrl(`/estabelecimentos/${res.estabelecimento_id}`);
    });
  }

  redirectUser(): void {
    if (!this.authService.getAuthToken()) {
      this.router.navigateByUrl('/entrar');
    }
  }

  getPlace(): void {
    this.placesService.getPlace(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.place = res;
      this.rating.estabelecimento_id = res.id;
    });
  }

}
