import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public postUsers(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/usuarios`, body);
  }

  public getUsers(params: any = null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios`, {params});
  }

  public putUsers(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/usuarios`, body, {headers});
  }

}
