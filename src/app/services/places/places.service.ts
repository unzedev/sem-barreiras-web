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

  public postPlace(body: any, imageToUpload?: File): Observable<any> {
    const formData: FormData = new FormData();
    if (imageToUpload) formData.append('arquivo', imageToUpload, imageToUpload.name);
    for (let key in body) {
      formData.append(key, body[key]);
    }
    const endereco = JSON.stringify(body.endereco);
    formData.set('endereco', endereco);
    return this.http.post(this.apiUrl, formData);
  }

  public deletePlace(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
