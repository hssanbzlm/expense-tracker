import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-code-form',
  templateUrl: './code-form.component.html',
  styleUrl: './code-form.component.scss',
})
export class CodeFormComponent {
  codeFormGroup: UntypedFormGroup;
  submit: boolean = false;
  errorMsg: string = '';
  @Output() codeFormSuccess = new EventEmitter<boolean>();
  @Output() codeFormBack = new EventEmitter<boolean>();
  constructor(
    private resetPasswordService: ResetPasswordService,
    private fb: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.codeFormGroup = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
    });
  }
  onSubmitCodeForm() {
    if (this.codeFormGroup.valid) {
      this.submit = true;
      this.resetPasswordService
        .checkResetCode(this.codeFormGroup.get('code').value)
        .subscribe(
          (v) => {
            this.submit = false;
            this.errorMsg = '';
            this.codeFormSuccess.emit(true);
          },
          (err) => {
            this.submit = false;
            this.errorMsg = 'Invalid code';
          }
        );
    }
  }
  backToEmailForm() {
    this.codeFormBack.emit(true);
  }
  onInputFocus() {
    this.errorMsg = '';
  }
}
