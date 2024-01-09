import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss',
})
export class EmailFormComponent implements OnInit {
  emailFormGroup: UntypedFormGroup;
  submit: boolean = false;
  errorMsg: string = '';
  @Output() emailFormSuccess = new EventEmitter<boolean>();
  constructor(
    private fb: UntypedFormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.emailFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onInputFocus() {
    this.errorMsg = '';
  }
  onSumbitEmailForm() {
    if (this.emailFormGroup.valid) {
      this.submit = true;
      this.resetPasswordService
        .sendResetCode(this.emailFormGroup.get('email').value)
        .subscribe(
          (v) => {
            this.submit = false;
            this.errorMsg = '';
            this.emailFormSuccess.emit(true);
          },
          (err) => {
            this.errorMsg = 'Email not found';
            this.submit = false;
          }
        );
    }
  }
}
