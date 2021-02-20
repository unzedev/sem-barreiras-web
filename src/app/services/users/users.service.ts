import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  public createUser(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  public getUsers(params: any = null): Observable<any> {
    return this.http.get(this.apiUrl, {params});
  }

  public loginUser(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  public forgotPassword(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/forgot`, body);
  }

  public resetPassword(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/reset`, body);
  }

}
