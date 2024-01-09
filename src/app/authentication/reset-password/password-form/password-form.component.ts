import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';
import { matchPassword } from 'src/app/shared/validator';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
  passwordFormGroup: UntypedFormGroup;
  submit: boolean = false;
  errorMsg: string = '';
  @Output() passwordFormBack = new EventEmitter<boolean>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}
  ngOnInit(): void {
    this.passwordFormGroup = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        retypeNewPassword: ['', [Validators.required]],
      },
      { validator: matchPassword('newPassword', 'retypeNewPassword') } //
    );
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
            this.errorMsg = 'Error while changing your password';
          }
        );
    }
  }

  backToCodeForm() {
    this.passwordFormBack.emit(true);
  }
}
