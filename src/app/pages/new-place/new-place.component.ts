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
    title: '',
    cnpj: '',
    type: '',
    phone: '',
    link: '',
    address: {
      zipCode: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
    },
    accessibilities: [],
  };

  accessibilities = {
    banheiro_acessivel: false,
    circulacao_interna: false,
    entrada_facilitada: false,
    estacionamento: false,
    sinalizacao: false,
    pap: false,
  };

  cities: Observable<any[]>;

  imageToUpload: File = null;

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

  handleImageInput(files: FileList): void {
    this.imageToUpload = files.item(0);
  }

  registerPlace(): void {
    if (this.accessibilities.banheiro_acessivel) this.place.accessibilities.push({ name: 'banheiro_acessivel', has: true });
    if (this.accessibilities.circulacao_interna) this.place.accessibilities.push({ name: 'circulacao_interna', has: true });
    if (this.accessibilities.entrada_facilitada) this.place.accessibilities.push({ name: 'entrada_facilitada', has: true });
    if (this.accessibilities.estacionamento) this.place.accessibilities.push({ name: 'estacionamento', has: true });
    if (this.accessibilities.sinalizacao) this.place.accessibilities.push({ name: 'sinalizacao', has: true });
    if (this.accessibilities.pap) this.place.accessibilities.push({ name: 'pap', has: true });
    
    this.placesService.createPlace(this.place).subscribe((res) => {
      this.toastr.success('Estabelecimento adicionado');
      this.placesService.updatePlacePicture(res.id, this.imageToUpload).subscribe(() => {
        this.toastr.success('Imagem adicionada');
        this.router.navigateByUrl(`/estabelecimentos/${res.id}`);
      });
    });
  }
  
  getCities(): void {
    this.cities = this.publicDataService.getCities(this.place.address.state);
  }

  redirectUser(): void {
    if (!this.authService.getAuthToken()) {
      this.router.navigateByUrl('/entrar');
    }
  }

}
