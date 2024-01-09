import { Component } from '@angular/core';

import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ResetPasswordService],
})
export class ResetPasswordComponent {
  inEmailForm: boolean = true;
  inCodeForm: boolean = false;
  inPasswordForm: boolean = false;

  handleEmailForm() {
    this.inEmailForm = false;
    this.inCodeForm = true;
  }
  handleCodeForm() {
    this.inCodeForm = false;
    this.inPasswordForm = true;
  }
  handlePasswordFormBack() {
    this.inPasswordForm = false;
    this.inCodeForm = true;
  }
  handleCodeFormBack() {
    this.inCodeForm = false;
    this.inEmailForm = true;
  }
}
