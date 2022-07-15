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
    establishment: null,
    title: '',
    comment: '',
    strengths: '',
    weaknesses: '',
    rating: 0,
    accessibilities: [],
  };

  accessibilities = {
    banheiro_acessivel: null,
    circulacao_interna: null,
    entrada_facilitada: null,
    estacionamento: null,
    sinalizacao: null,
    site_acessivel: null,
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
    if (this.accessibilities.banheiro_acessivel) this.rating.accessibilities.push({ name: 'Banheiro acessível', review: this.accessibilities.banheiro_acessivel });
    if (this.accessibilities.circulacao_interna) this.rating.accessibilities.push({ name: 'Circulação interna', review: this.accessibilities.circulacao_interna });
    if (this.accessibilities.entrada_facilitada) this.rating.accessibilities.push({ name: 'Entrada facilitada', review: this.accessibilities.entrada_facilitada });
    if (this.accessibilities.estacionamento) this.rating.accessibilities.push({ name: 'Estacionamento', review: this.accessibilities.estacionamento });
    if (this.accessibilities.sinalizacao) this.rating.accessibilities.push({ name: 'Sinalização', review: this.accessibilities.sinalizacao });
    if (this.accessibilities.site_acessivel) this.rating.accessibilities.push({ name: 'Site acessível', review: this.accessibilities.site_acessivel });
    if (this.accessibilities.pap) this.rating.accessibilities.push({ name: 'Posicionamento atitudinal positivo', review: this.accessibilities.pap });

    this.ratingsService.postRating(this.rating).subscribe((res) => {
      this.toastr.success('Avaliação criada');
      this.router.navigateByUrl(`/estabelecimentos/${res.establishment}`);
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
      this.rating.establishment = res.id;
    });
  }

}
