import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cash } from '../Interfaces/cash';
import { CashBook } from '../Interfaces/CashBook';
const header = new HttpHeaders().set(
  'Authorization',
  'Bearer ' + localStorage.getItem('token')
);

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<CashBook> {
    return this.http.get<CashBook>(`${environment.cashBaseUrl}/getexpenses`, {
      headers: header,
    });
  }

  updateCash(cash: cash): Observable<cash> {
    return this.http.put<cash>(
      `${environment.cashBaseUrl}/updateexpense`,
      cash,
      { headers: header }
    );
  }

  addCash(cash: cash): Observable<cash> {
    return this.http.post<cash>(`${environment.cashBaseUrl}/addexpense`, cash, {
      headers: header,
    });
  }

  deleteCash(id: number): Observable<cash> {
    return this.http.delete<cash>(
      `${environment.cashBaseUrl}/deleteexpense/${id}`,
      { headers: header }
    );
  }
}
