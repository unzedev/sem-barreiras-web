import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  register: any = {
    name: '',
    email: '',
    phone: '',
    deficiency: '',
    password: '',
    role: 'user',
  };
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }
  
  ngOnInit(): void {
    this.redirectUser();
  }

  signup(): void {
    this.usersService.createUser(this.register).subscribe(() => {
      this.usersService.loginUser({
          email: this.register.email,
          password: this.register.password,
        }).subscribe((res) => {
        this.authService.setAuthToken(res.token);
        this.authService.setAuthPermission(res.user.role);
        this.redirectUser();
      });
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
