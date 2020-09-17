import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlacesService } from 'src/app/services/places/places.service';
import { PublicDataService } from 'src/app/services/public-data/public-data.service';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss']
})
export class NewPlaceComponent implements OnInit {

  place: any = {
    titulo: '',
    descricao: '',
    tipo: '',
    telefone: '',
    link: '',
    foto: '',
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
    },
    banheiro_acessivel: false,
    circulacao_interna: false,
    entrada_facilitada: false,
    estacionamento: false,
    sinalizacao: false,
  };

  cities: Observable<any[]>;

  constructor(
    private placesService: PlacesService,
    private publicDataService: PublicDataService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.redirectUser();
  }

  registerPlace(): void {
    this.placesService.postPlace(this.place).subscribe((res) => {
      this.toastr.success('Estabelecimento adicionado');
      this.router.navigateByUrl(`/${res.id}`);
    });
  }

  getCities(): void {
    this.cities = this.publicDataService.getCities(this.place.endereco.estado);
  }

  redirectUser(): void {
    if (!this.authService.getAuthToken()) {
      this.router.navigateByUrl('/entrar');
    }
  }

}
