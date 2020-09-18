import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiUrl = `${environment.apiUrl}/estabelecimentos`;

  constructor(private http: HttpClient) { }

  public getPlaces(params: any = null): Observable<any> {
    return this.http.get(this.apiUrl, {params});
  }

  public getPlace(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public putPlace(id: any, body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  public postPlace(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  public deletePlace(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
