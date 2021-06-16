import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(auth: object) {
    return this.http.post(`${environment.authBaseUrl}/signup`, auth);
  }
  signin(auth: object) {
    return this.http.post(`${environment.authBaseUrl}/login`, auth);
  }
}
