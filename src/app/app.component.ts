import { Component, HostListener, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuIsActive = false;
  navbarIsTransparent = false;

  constructor(private config: NgSelectConfig) {
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
  }

}
