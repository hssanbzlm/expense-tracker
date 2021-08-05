import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Token } from 'src/app/shared/Interfaces/Token';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  private sub: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.sub = this.authService.signin(this.loginForm.value).subscribe(
        (v: Token) => {
          localStorage.setItem('token', v.token);
          this.router.navigateByUrl('/home');
        },
        (err) => console.log(err)
      );
    }
  }
  redirectToResetPassword() {
    this.router.navigateByUrl('user/resetpassword');
  }
  redirectToSignup() {
    this.router.navigateByUrl('user/signup');
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
