import { BehaviorSubject } from 'rxjs';
import { Cash } from '../Interfaces/Cash';
import { CashBook } from '../Interfaces/CashBook';
import { TotalInOut } from '../Interfaces/TotalInOut';
import { sortFunction, calculateBalance, totalInOut } from '../utility';

export class CashData {
  private _dataSubject: BehaviorSubject<Cash[]>;
  private _totalInOutSubject: BehaviorSubject<TotalInOut>;
  private _indexSave: number; //indexSave will hold index of added/updated cash to choose whether add cash (indexSave=null) or update cash (indexSave>=0)

  constructor() {
    this._dataSubject = new BehaviorSubject([]);
    this._totalInOutSubject = new BehaviorSubject({ in: 0, out: 0 });
    this._indexSave = null;
  }

  get DataSubject() {
    return this._dataSubject;
  }
  set DataSubject(dataSubject) {
    this._dataSubject = dataSubject;
  }

  get TotalInOutSubject() {
    return this._totalInOutSubject;
  }
  set TotalInOutSubject(totalInOut) {
    this._totalInOutSubject = totalInOut;
  }

  get indexSave() {
    return this._indexSave;
  }

  set indexSave(indexSave) {
    this._indexSave = indexSave;
  }

  treatLocalData(expense: CashBook) {
    let cash = [];
    if (expense.expenses.length > 0) {
      cash = [...expense.expenses];
      cash.sort(sortFunction);
      cash = calculateBalance(cash.length, cash);
    }
    return cash;
  }

  updateLocalCash(cash: Cash) {
    let newCash = [];
    newCash = this._dataSubject.getValue().map((v, index) => {
      if (index == this._indexSave) {
        v = cash;
      }
      return v;
    });
    newCash.sort(sortFunction); // we sort data in case user has updated the date
    newCash = calculateBalance(newCash.length, newCash);
    return newCash;
  }

  addLocalCash(cash: Cash) {
    let newCash = [];
    newCash = [...this._dataSubject.getValue()];
    let index = newCash.findIndex((v) => v.date < cash.date);
    if (index >= 0) {
      newCash.splice(index, 0, cash);
      newCash = calculateBalance(index + 1, newCash);
    } else {
      newCash.push(cash);
      newCash = calculateBalance(newCash.length, newCash);
    }
    return newCash;
  }

  deleteLocalCash(idDeleted: number) {
    let newCash = [];
    newCash = this._dataSubject.getValue().filter((v) => v._id != idDeleted);
    if (newCash.length > 0) {
      newCash = calculateBalance(newCash.length, newCash);
    }
    return newCash;
  }
}
