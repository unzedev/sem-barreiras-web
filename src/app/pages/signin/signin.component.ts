import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  login: any = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.redirectUser();
  }

  signin(): void {
    this.usersService.loginUser(this.login).subscribe((res) => {
      this.authService.setAuthToken(res.token);
      this.authService.setAuthPermission(res.user.role);
      this.redirectUser();
    });
  }

  redirectUser(): void {
    if (this.authService.getAuthToken()) {
      if (this.authService.getAuthPermission() === 'administrator') {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/estabelecimentos');
      }
    }
  }

}
