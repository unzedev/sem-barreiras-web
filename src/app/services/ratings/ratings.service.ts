import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private apiUrl = `${environment.apiUrl}/avaliacoes`;

  constructor(private http: HttpClient) { }

  public getRatings(params: any = null): Observable<any> {
    return this.http.get(this.apiUrl, {params});
  }

  public getRating(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
