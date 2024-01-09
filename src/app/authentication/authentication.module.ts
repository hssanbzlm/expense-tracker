import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { VerifemailComponent } from './verifemail/verifemail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailFormComponent } from './reset-password/email-form/email-form.component';
import { CodeFormComponent } from './reset-password/code-form/code-form.component';
import { PasswordFormComponent } from './reset-password/password-form/password-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifemailComponent,
    ResetPasswordComponent,
    EmailFormComponent,
    CodeFormComponent,
    PasswordFormComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
