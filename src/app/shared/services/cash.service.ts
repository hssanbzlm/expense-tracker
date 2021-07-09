import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cash } from '../Interfaces/Cash';
import { CashBook } from '../Interfaces/CashBook';
import { HttpRequestsService } from './http-requests.service';
import { calculateBalance, totalInOut } from '../utility';
import { sortFunction } from '../utility';
import { TotalInOut } from '../Interfaces/TotalInOut';
@Injectable({
  providedIn: 'root',
})
export class CashService {
  private indexSave: number = null; //indexSave will hold index of added/updated cash to choose whether add cash (indexSave=null) or update cash (indexSave>=0)
  private dataSubject: BehaviorSubject<Cash[]> = new BehaviorSubject([]);
  private totalInOutSubject: BehaviorSubject<TotalInOut> = new BehaviorSubject({
    in: 0,
    out: 0,
  });
  constructor(private httpRequests: HttpRequestsService) {}

  getCashBook() {
    return this.httpRequests.getExpenses();
  }

  treatData(expense: CashBook) {
    let cash = [];
    if (expense.expenses.length > 0) {
      cash = [...expense.expenses];
      cash.sort(sortFunction);
      cash = calculateBalance(cash.length, cash);
    }
    this.sendUpdatesToSubscribers(cash, totalInOut(cash));
  }
  gettotalInOutData() {
    return this.totalInOutSubject;
  }

  getSubjectData() {
    return this.dataSubject;
  }
  saveCash(cash: Cash) {
    this.indexSave = this.dataSubject
      .getValue()
      .findIndex((v) => v._id == cash._id);
    if (this.indexSave >= 0) {
      return this.httpRequests.updateCash(cash); // index exist, so we have to update cash
    } else {
      return this.httpRequests.addCash(cash); // index does not exist, so we have to add new cash
    }
  }

  handleSaveCashResult(cash: Cash) {
    if (this.indexSave >= 0) {
      this.updateCash(cash);
    } else this.addCash(cash);
  }

  updateCash(cash: Cash) {
    let newCash = [];
    newCash = this.dataSubject.getValue().map((v, index) => {
      if (index == this.indexSave) {
        v = cash;
      }
      return v;
    });
    newCash.sort(sortFunction); // we sort data in case user has updated the date
    newCash = calculateBalance(newCash.length, newCash);
    this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
  }
  addCash(cash: Cash) {
    let newCash = [];
    newCash = [...this.dataSubject.getValue()];
    let index = newCash.findIndex((v) => v.date < cash.date);
    if (index >= 0) {
      newCash.splice(index, 0, cash);
      newCash = calculateBalance(index + 1, newCash);
    } else {
      newCash.push(cash);
      newCash = calculateBalance(newCash.length, newCash);
    }
    this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
  }

  deleteCash(id: number) {
    return this.httpRequests.deleteCash(id);
  }

  handleDeleteCash(idDeleted: number) {
    let newCash = [];

    newCash = this.dataSubject.getValue().filter((v) => v._id != idDeleted);
    if (newCash.length > 0) {
      newCash = calculateBalance(newCash.length, newCash);
    }
    this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
  }

  sendUpdatesToSubscribers(cash: Cash[], totalInOut: TotalInOut) {
    this.dataSubject.next(cash);
    this.totalInOutSubject.next(totalInOut);
  }
}
