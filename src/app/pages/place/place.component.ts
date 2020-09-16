import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place: any = null;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  ngOnInit(): void {
    this.getMockedPlace();
  }

  getPlace(): void {
    this.placesService.getPlace(this.route.snapshot.paramMap.get('id')).subscribe((res) => {
      this.place = res.data.data;
    });
  }

  getMockedPlace(): void {
    this.place = {
      id: '5f5f5eb71fb23c00046b752e',
      avaliacao_media: 4.65,
      banheiro_acessivel: false,
      circulacao_interna: true,
      descricao: 'Lorem ipsum dolor sit amet',
      endereco: {
        cep: '90254-085',
        cidade: 'Porto Alegre',
        complemento: 'Apto. 404, Bloco A',
        estado: 'RS',
        logradouro: 'Av. AJ Renner',
        numero: '300'
      },
      entrada_facilitada: true,
      estacionamento: true,
      foto: 'https://images.unsplash.com/photo-1583594454990-015f8118f982?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1252&q=80',
      sinalizacao: true,
      tipo: 'restaurante',
      titulo: 'Estabelecimento X'
    };
  }

}
