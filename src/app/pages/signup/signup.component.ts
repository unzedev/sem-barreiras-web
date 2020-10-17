import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  register: any = {
    nome: '',
    email: '',
    celular: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.redirectUser();
  }

  signup(): void {
    this.authService.postRegister(this.register).subscribe((res) => {
      this.authService.setAuthToken(res.token);
      this.authService.setAuthPermission(res.permissao);
      this.redirectUser();
    });
  }

  redirectUser(): void {
    if (this.authService.getAuthToken()) {
      if (this.authService.getAuthPermission() === 'administrador') {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/estabelecimentos');
      }
    }
  }

}
