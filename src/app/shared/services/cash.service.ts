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
}
