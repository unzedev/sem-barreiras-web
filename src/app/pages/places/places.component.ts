import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.places = [
      {
        id: 1,
        title: 'Shopping de Berlim',
        type: 'Shopping',
        cover: 'https://images.unsplash.com/photo-1583594454990-015f8118f982?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1252&q=80',
        rating: 5,
        address: {
          cep: '90250220',
          state: 'RS',
          city: 'Porto Alegre',
          neighborhood: 'Humaitá',
          street: 'Rua Walter Ferreira',
          number: '75',
          complement: 'Apto 404',
        },
        accessibilities: [
          'estacionamento',
          'entrada facilitada',
          'circulação interna',
          'banheiro acessível',
          'sinalização',
          'posicionamento atitudinal positivo',
        ],
      },
      {
        id: 2,
        title: 'Dina`s',
        type: 'Barbearia',
        cover: 'https://images.unsplash.com/photo-1597938888241-9d4ad046d569?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        rating: 2,
        address: {
          cep: '90250220',
          state: 'RS',
          city: 'Porto Alegre',
          neighborhood: 'Humaitá',
          street: 'Rua Walter Ferreira',
          number: '75',
          complement: 'Apto 404',
        },
        accessibilities: [
          'circulação interna',
          'banheiro acessível',
          'sinalização',
        ],
      },
      {
        id: 3,
        title: 'Mercado Central',
        type: 'Mercado',
        cover: 'https://images.unsplash.com/photo-1582359424705-cb2f273329d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        rating: 3,
        address: {
          cep: '90250220',
          state: 'RS',
          city: 'Porto Alegre',
          neighborhood: 'Humaitá',
          street: 'Rua Walter Ferreira',
          number: '75',
          complement: 'Apto 404',
        },
        accessibilities: [
          'estacionamento',
          'entrada facilitada',
          'circulação interna',
          'sinalização',
        ],
      },
    ];
  }

}
