import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-one',
  templateUrl: './forgot-password-one.component.html',
  styleUrls: ['./forgot-password-one.component.scss']
})
export class ForgotPasswordOneComponent implements OnInit {

  email = '';
  emailWasSent = false;

  step = 1;
  auth: any = {};
  newPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkUrl();
  }

  sendEmail(): void {
    this.authService.postForgot({email: this.email}).subscribe((res) => {
      this.emailWasSent = true;
    });
  }

  checkUrl(): void {
    if (this.route.snapshot.queryParamMap.get('email')) {
      this.step = 2;
      const body = {
        email: this.route.snapshot.queryParamMap.get('email'),
        digest: this.route.snapshot.queryParamMap.get('digest'),
      };
      this.authService.getForgot(body).subscribe((res) => {
        this.auth = res;
      });
    }
  }

  changePassword(): void {
    const authHeaders = {
      authorization: `Basic ${this.auth.token}`,
    };
    this.authService.putNewPassword({nova_senha: this.newPassword}, authHeaders).subscribe((res) => {
      this.toastr.success('Senha atualizada!');
      this.authService.setAuthToken(this.auth.token);
      this.authService.setAuthPermission(this.auth.permissao);
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
