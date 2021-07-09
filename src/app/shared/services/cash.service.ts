import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cash } from '../Interfaces/Cash';
import { CashBook } from '../Interfaces/CashBook';
import { HttpRequestsService } from './http-requests.service';
import { calculateBalance, totalInOut } from '../utility';
import { sortFunction } from '../utility';
import { TotalInOut } from '../Interfaces/TotalInOut';
import { CashData } from '../classes/cash-data';
@Injectable({
  providedIn: 'root',
})
export class CashService extends CashData {
  constructor(private httpRequests: HttpRequestsService) {
    super();
  }

  getCashBook() {
    return this.httpRequests.getExpenses();
  }

  saveCash(cash: Cash) {
    //does index exist or not, we must know either update or add
    this.indexSave = this.DataSubject.getValue().findIndex(
      (v) => v._id == cash._id
    );
    if (this.indexSave >= 0) {
      return this.httpRequests.updateCash(cash); // index exist, so we have to update cash
    } else {
      return this.httpRequests.addCash(cash); // index does not exist, so we have to add new cash
    }
  }

  deleteCash(id: number) {
    return this.httpRequests.deleteCash(id);
  }
  //this will be executed after we get list of expenses from server
  treatData(expense: CashBook) {
    let cash: Cash[];
    cash = this.treatLocalData(expense);
    this.sendUpdatesToSubscribers(cash, totalInOut(cash));
  }
  //this will be executed after we  update/add cash in the server to update/add cash locally
  handleSaveCash(cash: Cash) {
    let newCash: Cash[] = [];
    if (this.indexSave >= 0) {
      newCash = this.updateLocalCash(cash);
      this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
    } else {
      newCash = this.addLocalCash(cash);
      this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
    }
  }
  //this will be executed after cash deleted in the server
  handleDeleteCash(idDelete: number) {
    let newCash: Cash[];
    newCash = this.deleteLocalCash(idDelete);
    this.sendUpdatesToSubscribers(newCash, totalInOut(newCash));
  }

  sendUpdatesToSubscribers(cash: Cash[], totalInOut: TotalInOut) {
    this.DataSubject.next(cash);
    this.TotalInOutSubject.next(totalInOut);
  }
}
