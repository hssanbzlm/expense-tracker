import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Token } from '../Interfaces/token';
import jwt_decode from 'jwt-decode';
import { HttpRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpRequestService: HttpRequestsService) {}

  signup(auth: object) {
    return this.httpRequestService.signup(auth);
  }
  signin(auth: object): Observable<Token> {
    return this.httpRequestService.signin(auth);
  }
  verifEmail(codeVerif: string) {
    return this.httpRequestService.verifEmail(codeVerif);
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
}
