import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  error: boolean = false;
  signInSubscription: Subscription;
  formChangesSubscription: Subscription;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
    this.formChangesSubscription = this.loginForm.valueChanges.subscribe(
      (val) => {
        this.error = false;
        this.submitted = false;
      }
    );
  }

  submit() {
    this.submitted = true;
    this.error = false;
    if (!this.loginForm.invalid) {
      this.signInSubscription = this.authService
        .signin(this.loginForm.value)
        .subscribe(
          (v: Token) => {
            localStorage.setItem('token', v.token);
            this.router.navigateByUrl('/home');
          },
          (err) => {
            this.error = true;
          }
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
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
