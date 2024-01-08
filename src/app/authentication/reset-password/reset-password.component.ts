import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';
import { matchPassword } from 'src/app/shared/validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ResetPasswordService],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  /*this component is based on ng-template
  // it regroups three different templates for each step in recovering account
  //1/=>put email(emailFormGroup) => user get reset code via email
  //2/=> put reset code (codeFormGroup) => check if reset code sent is the same as the user has put
  //3/=> update password (passwordFormGroup) => redirect to login
  //Toggling between templates is based on inEmailForm, inCodeForm and inPasswordForm attributes
  // This pattern is useful when we want the user to follow a specific order in doing tasks
  // putemail=>put code => update password*/
  inEmailForm: boolean = true;
  inCodeForm: boolean = false;
  inPasswordForm: boolean = false;
  emailFormGroup: UntypedFormGroup;
  codeFormGroup: UntypedFormGroup;
  passwordFormGroup: UntypedFormGroup;
  submit: boolean = false;
  errorMsg: string = '';
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.emailFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.codeFormGroup = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
    });
    this.passwordFormGroup = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        retypeNewPassword: ['', [Validators.required]],
      },
      { validator: matchPassword('newPassword', 'retypeNewPassword') } //
    );
  }

  onSumbitEmailForm() {
    if (this.emailFormGroup.valid) {
      this.submit = true;
      this.resetPasswordService
        .sendResetCode(this.emailFormGroup.get('email').value)
        .subscribe(
          (v) => {
            this.inEmailForm = false;
            this.inCodeForm = true;
            this.submit = false;
          },
          (err) => {
            this.submit = false;
            this.errorMsg = 'Email not found';
          }
        );
    }
  }
  onInputFocus() {
    this.errorMsg = '';
  }

  onSubmitCodeForm() {
    if (this.codeFormGroup.valid) {
      this.submit = true;
      this.resetPasswordService
        .checkResetCode(this.codeFormGroup.get('code').value)
        .subscribe(
          (v) => {
            this.inCodeForm = false;
            this.inPasswordForm = true;
            this.submit = false;
          },
          (err) => {
            this.submit = false;
            this.errorMsg = 'Invalid code';
          }
        );
    }
  }
  onSubmitPasswordForm() {
    if (this.passwordFormGroup.valid) {
      this.submit = true;
      this.resetPasswordService
        .updatePassword(this.passwordFormGroup.get('newPassword').value)
        .subscribe(
          (v) => {
            this.router.navigateByUrl('user/login');
          },
          (err) => {
            this.submit = false;
          }
        );
    }
  }

  backToCodeForm() {
    this.inPasswordForm = false;
    this.inCodeForm = true;
  }
  backToEmailForm() {
    this.inCodeForm = false;
    this.inEmailForm = true;
    this.errorMsg = '';
  }

  ngOnDestroy() {}
}
