import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public postLogin(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, body);
  }

  public postRegister(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/usuarios`, body);
  }

  public getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  public setAuthToken(token: string): void {
    return localStorage.setItem('authToken', token);
  }

  public getAuthPermission(): string {
    return localStorage.getItem('authPermission');
  }

  public setAuthPermission(permission: string): void {
    return localStorage.setItem('authPermission', permission);
  }

  public clearAuth(): void {
    return localStorage.clear();
  }

  public postForgot(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/recuperar`, body);
  }

  public getForgot(params: any = null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/recuperar`, {params});
  }

  public putNewPassword(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/mudar_senha`, body, {headers});
  }

}
