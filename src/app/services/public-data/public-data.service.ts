import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {

  constructor(private http: HttpClient) { }

  public getCities(uf: string): Observable<any> {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }

  public getAddress(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
