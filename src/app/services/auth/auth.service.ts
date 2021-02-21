import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authItemSource = new BehaviorSubject<boolean>(false);
  public authItem$ = this.authItemSource.asObservable();

  constructor() { }

  public getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  public setAuthToken(token: string): void {
    this.authItemSource.next(true);
    return localStorage.setItem('authToken', token);
  }

  public getAuthPermission(): string {
    return localStorage.getItem('authPermission');
  }

  public setAuthPermission(permission: string): void {
    return localStorage.setItem('authPermission', permission);
  }

  public clearAuth(): void {
    this.authItemSource.next(false);
    return localStorage.clear();
  }

}
