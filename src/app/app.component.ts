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

  @HostListener('window:scroll', ['$event'])
  setNavbarTransparency(event): any {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if (top === 0) {
      this.navbarIsTransparent = true;
    } else {
      this.navbarIsTransparent = false;
    }
  }

  ngOnInit(): void {
    this.setNavbarTransparency(0);
    this.checkIfUserIsLogged();
  }

  checkIfUserIsLogged(): void {
    if (this.authService.getAuthToken()) {
      this.userIsLogged = true;
    }
  }

  logout(): void {
    this.authService.clearAuth();
    this.userIsLogged = false;
    this.toastr.show('Deslogado');
    this.router.navigateByUrl('/');
  }

}
