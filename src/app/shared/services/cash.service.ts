import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cash } from '../Interfaces/cash';
import { CashBook } from '../Interfaces/CashBook';
import { HttpRequestsService } from './http-requests.service';
import { calculateBalance } from '../utility';
import { sortFunction } from '../utility';
@Injectable({
  providedIn: 'root',
})
export class CashService {
  private data: cash[] = [];
  private dataSubject: BehaviorSubject<cash[]> = new BehaviorSubject([]);
  constructor(private httpRequests: HttpRequestsService) {}

  getCashBook() {
    return this.httpRequests.getExpenses();
  }

  treatData(expense: CashBook) {
    this.data = expense.expenses.sort(sortFunction);
    this.data = calculateBalance(this.data);
    this.dataSubject.next(this.data);
  }

  getSubjectData() {
    return this.dataSubject;
  }
  saveCash(cash: cash) {
    let index = this.data.findIndex((v) => v._id == cash._id);
    if (index >= 0) {
      this.updateCash(index, cash); // index exist, so we have to updated it
    } else {
      this.addCash(cash); // index does not exist, so we have to add it
    }
  }

  updateCash(index: number, cash: cash) {
    const updatedObject = {
      _id: cash._id,
      date: cash.date,
      in: cash.in,
      remark: cash.remark,
      amount: cash.amount,
    };

    this.httpRequests.updateCash(updatedObject).subscribe(
      (v) => {
        console.log(v);
        this.data[index] = v;
        this.data = this.data.sort(sortFunction);
        this.data = calculateBalance(this.data);
        this.dataSubject.next(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addCash(cash: cash) {
    this.httpRequests.addCash(cash).subscribe(
      (cash) => {
        let index = this.data.findIndex((v) => v.date < cash.date);
        if (index >= 0) {
          this.data.splice(index, 0, cash);
        } else this.data.push(cash);
        this.data = calculateBalance(this.data);
        this.dataSubject.next(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCash(id: number) {
    this.httpRequests.deleteCash(id).subscribe(
      (v) => {
        this.data = this.data.filter((v) => v._id != id);
        this.data = calculateBalance(this.data);
        this.dataSubject.next(this.data);
      },
      (err) => console.log('err')
    );
  }
}
