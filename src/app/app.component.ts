import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuIsActive = false;
  navbarIsTransparent = false;
  userIsLogged = false;
  userIsAdmin = false;

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
  }

  checkIfUserIsLogged(): void {
    if (this.authService.getAuthToken()) {
      this.userIsLogged = true;
    }
    if (this.authService.getAuthPermission() === 'administrador') {
      this.userIsAdmin = true;
    }
  }

  logout(): void {
    this.authService.clearAuth();
    this.userIsLogged = false;
    this.toastr.show('Deslogado');
    this.router.navigateByUrl('/');
  }

}
