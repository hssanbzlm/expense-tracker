import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/Interfaces/token';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.authService.signin(this.loginForm.value).subscribe(
        (v: Token) => {
          localStorage.setItem('token', v.token);
          this.authService.decodeToken();
          this.router.navigateByUrl('/home');
        },
        (err) => console.log(err)
      );
    }
  }
}
