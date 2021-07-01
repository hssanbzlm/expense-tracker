import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  inEmailForm: boolean = true;
  inCodeForm: boolean = false;
  inPasswordForm: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {}
  emailFormGroup: FormGroup;
  codeFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  ngOnInit(): void {
    this.emailFormGroup = this.fb.group({
      email: ['', Validators.required],
    });
    this.codeFormGroup = this.fb.group({
      code: ['', Validators.required],
    });
    this.passwordFormGroup = this.fb.group({
      newPassword: ['', Validators.required],
      retypeNewPassword: ['', Validators.required],
    });
  }

  onSumbitEmailForm() {
    if (this.emailFormGroup.valid) {
      this.inEmailForm = false;
      this.inCodeForm = true;
    }
  }
  onSubmitCodeForm() {
    if (this.codeFormGroup.valid) {
      this.inCodeForm = false;
      this.inPasswordForm = true;
    }
  }
  onSubmitPasswordForm() {
    if (this.passwordFormGroup.valid) {
      this.router.navigateByUrl('user/login');
    }
  }

  backToCodeForm() {
    this.inPasswordForm = false;
    this.inCodeForm = true;
  }
  backToEmailForm() {
    this.inCodeForm = false;
    this.inEmailForm = true;
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
