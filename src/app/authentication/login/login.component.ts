import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {}
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      console.log('success');
    }
  }
}
