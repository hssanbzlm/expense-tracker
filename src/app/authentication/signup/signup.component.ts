import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { matchPassword } from 'src/app/shared/validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  submitted = false;
  validationEmailSent = false;
  error = false;
  formChangesSubscription: Subscription;
  private sub: Subscription;
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formChangesSubscription = this.signupForm.valueChanges.subscribe(
      (v) => {
        this.validationEmailSent = false;
        this.error = false;
      }
    );
  }
  signupForm: FormGroup = this.formBuild.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-z A-Z]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-z A-Z]*'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validator: matchPassword('password', 'confirmPassword') } //
  );

  submit() {
    this.submitted = true;
    this.error = false;
    this.validationEmailSent = false;
    if (!this.signupForm.invalid) {
      this.sub = this.authService.signup(this.signupForm.value).subscribe(
        (v) => {
          this.validationEmailSent = true;
        },
        (err) => {
          this.error = true;
        }
      );
    }
  }

  redirectToLogin() {
    this.router.navigateByUrl('user/login');
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
