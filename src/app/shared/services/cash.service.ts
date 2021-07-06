import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cash } from '../Interfaces/cash';
import { CashBook } from '../Interfaces/CashBook';
import { HttpRequestsService } from './http-requests.service';
import { calculateBalance, totalInOut } from '../utility';
import { sortFunction } from '../utility';
import { TotalInOut } from '../Interfaces/TotalInOut';
@Injectable({
  providedIn: 'root',
})
export class CashService {
  private indexSave: number = null;
  private data: cash[] = [];
  private dataSubject: BehaviorSubject<cash[]> = new BehaviorSubject(this.data);
  private totalInOut: TotalInOut = { in: 0, out: 0 };
  private totalInOutSubject: BehaviorSubject<TotalInOut> = new BehaviorSubject(
    this.totalInOut
  );
  constructor(private httpRequests: HttpRequestsService) {}

  getCashBook() {
    return this.httpRequests.getExpenses();
  }

  treatData(expense: CashBook) {
    if (expense.expenses.length > 0) {
      this.data = expense.expenses.sort(sortFunction);
      this.data = calculateBalance(this.data.length, this.data);
      this.totalInOut = totalInOut(this.data);
    }
    this.dataSubject.next(this.data);
    this.totalInOutSubject.next(this.totalInOut);
  }
  gettotalInOutData() {
    return this.totalInOutSubject;
  }

  getSubjectData() {
    return this.dataSubject;
  }
  saveCash(cash: cash) {
    this.indexSave = this.data.findIndex((v) => v._id == cash._id);
    if (this.indexSave >= 0) {
      return this.httpRequests.updateCash(cash); // index exist, so we have to update it
    } else {
      return this.httpRequests.addCash(cash); // index does not exist, so we have to add it
    }
  }

  handleSaveCashResult(cash: cash) {
    if (this.indexSave >= 0) {
      this.updateCash(cash);
    } else this.addCash(cash);
  }

  updateCash(cash: cash) {
    this.data[this.indexSave] = cash;
    this.data = this.data.sort(sortFunction); // we sort data in case user has updated the date
    this.data = calculateBalance(this.indexSave + 1, this.data);
    this.data = calculateBalance(
      // we start calculate balance from new cash index
      this.data.findIndex((c) => c._id == cash._id) + 1,
      this.data
    );

    this.totalInOut = totalInOut(this.data);
    this.totalInOutSubject.next(this.totalInOut);
  }
  addCash(cash: cash) {
    let index = this.data.findIndex((v) => v.date < cash.date);
    if (index >= 0) {
      this.data.splice(index, 0, cash);
      this.data = calculateBalance(index + 1, this.data);
    } else {
      this.data.push(cash);
      this.data = calculateBalance(this.data.length, this.data);
    }
    this.totalInOut = totalInOut(this.data);
    this.totalInOutSubject.next(this.totalInOut);
  }

  deleteCash(id: number) {
    return this.httpRequests.deleteCash(id);
  }

  handleDeleteCash(idDeleted: number) {
    this.data = this.data.filter((v) => v._id != idDeleted);
    if (this.data.length > 0) {
      this.data = calculateBalance(this.data.length, this.data);
    }
    this.dataSubject.next(this.data);
    this.totalInOut = totalInOut(this.data);
    this.totalInOutSubject.next(this.totalInOut);
  }
}
