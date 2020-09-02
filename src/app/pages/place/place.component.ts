import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPlace();
  }

  getPlace(): void {
    const places = [
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
        ratings: [
          {
            title: 'Perfeito',
            text: 'Adorei, precisei de uma cadeira de rodas e eles me atenderam super bem e resolveram meu problema.',
            rating: 5,
            user: 'Joana',
          },
          {
            title: 'Muito bom!',
            text: 'Sou surdo e pude aproveitar o shopping acompanhado de um tradutor.',
            rating: 4,
            user: 'João',
          },
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
        ratings: [
          {
            title: 'Perfeito',
            text: 'Adorei, precisei de uma cadeira de rodas e eles me atenderam super bem e resolveram meu problema.',
            rating: 5,
            user: 'Joana',
          },
          {
            title: 'Muito bom!',
            text: 'Sou surdo e pude aproveitar o shopping acompanhado de um tradutor.',
            rating: 4,
            user: 'João',
          },
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
        ratings: [
          {
            title: 'Perfeito',
            text: 'Adorei, precisei de uma cadeira de rodas e eles me atenderam super bem e resolveram meu problema.',
            rating: 5,
            user: 'Joana',
          },
          {
            title: 'Muito bom!',
            text: 'Sou surdo e pude aproveitar o shopping acompanhado de um tradutor.',
            rating: 4,
            user: 'João',
          },
        ],
      },
    ];
    this.place = places[parseInt(this.route.snapshot.paramMap.get('id'), 0) - 1];
  }

}
