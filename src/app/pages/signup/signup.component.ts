import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(5),
          Validators.pattern(/.+@.+\..+/),
        ],
      ],
      phone: [null],
      deficiency: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: ['user'],
    });
    this.redirectUser();
  }

  signup(): void {
    this.submitted = true;
    if (this.form.valid) {
      const request = this.form.value;
      if (!request.phone) {
        delete request.phone;
      }

      this.usersService.createUser(request).subscribe(() => {
        this.usersService
          .loginUser({
            email: this.form.value.email,
            password: this.form.value.password,
          })
          .subscribe((res) => {
            this.authService.setAuthToken(res.token);
            this.authService.setAuthPermission(res.user.role);
            this.redirectUser();
          });
      });
    }
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
