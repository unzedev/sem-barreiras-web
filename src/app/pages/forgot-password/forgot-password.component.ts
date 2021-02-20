import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = '';
  emailWasSent = false;

  step = 1;
  auth: any = {};
  newPassword = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkUrl();
  }

  sendEmail(): void {
    this.usersService.forgotPassword({email: this.email}).subscribe((res) => {
      this.emailWasSent = true;
    });
  }

  checkUrl(): void {
    if (this.route.snapshot.queryParamMap.get('token')) {
      this.step = 2;
    }
  }

  changePassword(): void {
    const body = {
      token: this.route.snapshot.queryParamMap.get('token'),
      password: this.newPassword,
    }
    this.usersService.resetPassword(body).subscribe((res) => {
      this.toastr.success('Senha atualizada!');
      this.router.navigateByUrl('/entrar');
    });
  }

}
