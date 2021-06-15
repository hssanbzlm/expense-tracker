import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService
  ) {}
  submitted: boolean = false;
  ngOnInit(): void {}
  signupForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    this.submitted = true;
    if (!this.signupForm.invalid) {
      this.authService
        .signup(this.signupForm.value)
        .subscribe((v) => console.log(v));
    }
  }
  ngOnDestroy(): void {}
}
