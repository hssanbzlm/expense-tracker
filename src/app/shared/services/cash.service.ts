import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cash } from '../Interfaces/cash';
import { CashBook } from '../Interfaces/CashBook';
import { HttpRequestsService } from './http-requests.service';
import { calculateBalance } from '../utility';
import { sortFunction } from '../utility';
@Injectable({
  providedIn: 'root',
})
export class CashService {
  private indexSave: number = null;
  private data: cash[] = [];
  private dataSubject: BehaviorSubject<cash[]> = new BehaviorSubject([]);
  constructor(private httpRequests: HttpRequestsService) {}

  getCashBook() {
    return this.httpRequests.getExpenses();
  }

  treatData(expense: CashBook) {
    if (expense.expenses.length > 0) {
      this.data = expense.expenses.sort(sortFunction);
      this.data = calculateBalance(this.data.length, this.data);
    }
    this.dataSubject.next(this.data);
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
    this.data = this.data.sort(sortFunction);
    this.data = calculateBalance(this.indexSave + 1, this.data);
    this.dataSubject.next(this.data);
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
  }

  deleteCash(id: number) {
    this.httpRequests.deleteCash(id).subscribe(
      (v) => {
        this.data = this.data.filter((v) => v._id != id);
        if (this.data.length > 0) {
          this.data = calculateBalance(this.data.length, this.data);
        }
        this.dataSubject.next(this.data);
      },
      (err) => console.log('err')
    );
  }
}
