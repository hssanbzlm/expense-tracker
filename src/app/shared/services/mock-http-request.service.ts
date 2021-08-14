import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cash } from '../Interfaces/Cash';
import { CashBook } from '../Interfaces/CashBook';
let data: CashBook = {
  _id: 1,
  expenses: [
    { in: 1, amount: 500, remark: 'hssan remark', _id: 1, date: new Date() },
    { in: -1, amount: 500, remark: 'hssan remark', _id: 2, date: new Date() },
    { in: 1, amount: 100, remark: 'hssan remark', _id: 3, date: new Date() },
    { in: 1, amount: 50, remark: 'hssan remark', _id: 4, date: new Date() },
    { in: 1, amount: 10, remark: 'hssan remark', _id: 5, date: new Date() },
  ],
  active: true,
  email: '',
  name: 'hssan',
  lastName: 'bouzlima',
};
@Injectable({
  providedIn: 'root',
})
export class MockHttpRequestService {
  constructor() {}
  getCashLength() {
    return data.expenses.length;
  }

  getExpensesData() {
    return data;
  }
  getExpenses(): Observable<CashBook> {
    return of(data);
  }

  updateCash(cash: Cash): Observable<Cash> {
    for (let i = 0; i < data.expenses.length; i++) {
      if (data.expenses[i]._id == cash._id) {
        data.expenses[i] = cash;
        return of(cash);
      }
    }
    return of(null);
  }

  addCash(cash: Cash): Observable<Cash> {
    data.expenses.push(cash);
    return of(cash);
  }

  deleteCash(id: number): Observable<Cash> {
    const index = data.expenses.findIndex((v) => v._id == id);
    const del = data.expenses.splice(index, 1)[0];
    return of(del);
  }
}
