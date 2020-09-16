import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlacesService } from '../../services/places/places.service';
import { PublicDataService } from '../../services/public-data/public-data.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: any[] = [];
  pagination: any = {
    limite: 20,
    offset: 0,
    total: 100,
  };
  filter: any = {
    titulo: '',
    tipo: '',
    estado: '',
  };

  cities: Observable<any[]>;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private publicDataService: PublicDataService,
  ) { }

  ngOnInit(): void {
    this.fetchUrlParams();
    this.getMockedPlaces();
  }

  getCities(): void {
    this.cities = this.publicDataService.getCities(this.filter.estado);
  }

  fetchUrlParams(): void {
    this.route.queryParamMap.subscribe(p => {
      if (p.get('offset')) { this.pagination.offset = p.get('offset'); }
      if (p.get('titulo')) { this.filter.titulo = p.get('titulo'); }
      if (p.get('tipo')) { this.filter.tipo = p.get('tipo'); }
      if (p.get('estado')) {
        this.filter.estado = p.get('estado');
        this.getCities();
      }
      if (p.get('cidade')) { this.filter.cidade = p.get('cidade'); }
    }).unsubscribe();
  }

  cleanFiltersAndSearch(): void {
    this.pagination.offset = 0;
    this.filter = {
      titulo: '',
      tipo: '',
      estado: '',
      cidade: '',
    };
    this.getPlaces();
  }

  getPlaces(): void {
    const filter = this.filter;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        offset: this.pagination.offset,
        ...filter,
      },
      queryParamsHandling: 'merge',
    });

    this.placesService.getPlaces({
      offset: this.pagination.offset,
      ...filter,
    }).subscribe((res) => {
      this.places = res.data.data;
      this.pagination = res.data.paginacao;
    });
  }

  getMockedPlaces(): void {
    this.places = [
      {
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
      },
    ];
  }

}
