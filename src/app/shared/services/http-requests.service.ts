import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cash } from '../Interfaces/cash';
import { CashBook } from '../Interfaces/CashBook';
import { Token } from '../Interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<CashBook> {
    return this.http.get<CashBook>(`${environment.cashBaseUrl}/getexpenses`);
  }

  updateCash(cash: cash): Observable<cash> {
    return this.http.put<cash>(
      `${environment.cashBaseUrl}/updateexpense`,
      cash
    );
  }

  addCash(cash: cash): Observable<cash> {
    return this.http.post<cash>(`${environment.cashBaseUrl}/addexpense`, cash);
  }

  deleteCash(id: number): Observable<cash> {
    return this.http.delete<cash>(
      `${environment.cashBaseUrl}/deleteexpense/${id}`
    );
  }

  snedResetCode(email: string) {
    return this.http.post(`${environment.settingBaseUrl}/sendresetcode`, {
      email: email,
    });
  }

  checkResetCode(code: string, email: string) {
    return this.http.post(
      `${environment.settingBaseUrl}/checkresetcode/${code}`,
      { email: email }
    );
  }

  updatePassword(password: string, email: string) {
    return this.http.post(`${environment.userBaseUrl}/updatepassword`, {
      email: email,
      password: password,
    });
  }

  signup(auth: object) {
    return this.http.post(`${environment.userBaseUrl}/signup`, auth);
  }
  signin(auth: object): Observable<Token> {
    return this.http.post<Token>(`${environment.userBaseUrl}/login`, auth);
  }
  verifEmail(codeVerif: string) {
    return this.http.get(`${environment.userBaseUrl}/verifemail/${codeVerif}`);
  }
}
