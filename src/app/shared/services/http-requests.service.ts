import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cash } from '../Interfaces/Cash';
import { CashBook } from '../Interfaces/CashBook';
import { Token } from '../Interfaces/Token';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<CashBook> {
    return this.http.get<CashBook>(`${environment.cashBaseUrl}/getexpenses`);
  }

  updateCash(cash: Cash): Observable<Cash> {
    return this.http.put<Cash>(
      `${environment.cashBaseUrl}/updateexpense`,
      cash
    );
  }

  addCash(cash: Cash): Observable<Cash> {
    return this.http.post<Cash>(`${environment.cashBaseUrl}/addexpense`, cash);
  }

  deleteCash(id: number): Observable<CashBook> {
    return this.http.delete<CashBook>(
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
