import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  private sub: Subscription;
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}
  signupForm: FormGroup = this.formBuild.group({
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
  });

  submit() {
    this.submitted = true;
    if (!this.signupForm.invalid) {
      this.sub = this.authService
        .signup(this.signupForm.value)
        .subscribe((v) => console.log(v));
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
