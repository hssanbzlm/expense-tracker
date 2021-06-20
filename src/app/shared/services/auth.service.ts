import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';
import { Token } from '../Interfaces/token';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(auth: object) {
    return this.http.post(`${environment.authBaseUrl}/signup`, auth);
  }
  signin(auth: object): Observable<Token> {
    return this.http.post<Token>(`${environment.authBaseUrl}/login`, auth);
  }

  decodeToken() {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt_decode(localStorage.getItem('token'));
        resolve(decoded);
      } catch (err) {
        reject(err);
      }
    });
  }

  verifEmail(codeVerif: string) {
    return this.http.get(`${environment.authBaseUrl}/verifemail/${codeVerif}`);
  }
}
