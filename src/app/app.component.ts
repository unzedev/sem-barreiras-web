import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  menuIsActive = false;
  navbarIsTransparent = false;
  userIsLogged = false;
  userIsAdmin = false;

  subscription: Subscription;

  constructor(
    private config: NgSelectConfig,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.config.notFoundText = 'Não encontramos nenhum resultado.';
    this.config.appendTo = 'body';
  }

  toggleMenu(): any {
    this.menuIsActive = !this.menuIsActive;
  }

  ngOnInit(): void {
    this.checkIfUserIsLogged();
    this.subscription = this.authService.authItem$.subscribe((item) => {
      setTimeout(() => {
        this.checkIfUserIsLogged();
      }, 500);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkIfUserIsLogged(): void {
    this.userIsLogged = this.authService.getAuthToken() ? true : false;
    this.userIsAdmin = this.authService.getAuthPermission() === 'administrator' ? true : false;
  }

  logout(): void {
    this.authService.clearAuth();
    this.toastr.show('Deslogado');
    this.router.navigateByUrl('/');
  }

}
