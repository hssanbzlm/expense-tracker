import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../Interfaces/Token';
import jwt_decode from 'jwt-decode';
import { HttpRequestsService } from './http-requests.service';
import { DecodedToken } from '../Interfaces/DecodedToken';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends User {
  constructor(private httpRequestService: HttpRequestsService) {
    super();
  }

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
        const decoded: DecodedToken = jwt_decode(localStorage.getItem('token'));
        if (decoded.exp * 1000 > Date.now())
          //check if token is expired
          resolve(decoded);
        else reject('expired token');
      } catch (err) {
        reject(err);
      }
    });
  }
}
