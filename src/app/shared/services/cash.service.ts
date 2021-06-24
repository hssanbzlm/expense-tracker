import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cash } from '../Interfaces/cash';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  private dataSource: cash[] = [
    {
      id: 1,
      date: new Date('02-10-2021'),
      remark: 'ffdfgfdg',
      amount: 400,
      in: 1,
    },
    {
      id: 2,
      date: new Date('2-5-2019'),
      remark: 'remark',
      amount: 80,
      in: -1,
    },
    {
      id: 3,
      date: new Date('02-08-2018'),
      remark: 'lorem third remark',
      amount: 43,
      in: 1,
    },
    {
      id: 4,
      date: new Date('02-04-2018'),
      remark:
        'lorem third remark kjdhfkjh dfjdfhjdkgf dfhdfkjh dfdhf dfhf kdfhkfdhs',
      amount: 150,
      in: -1,
    },
  ];

  dataSubject = new BehaviorSubject<cash[]>(
    this.dataSource.sort(this.sortFunction)
  );
  constructor() {}

  getCash() {
    return this.dataSubject;
  }
  saveCash(cash: cash) {
    let index = this.dataSource.findIndex((v) => v.id == cash.id);
    if (index >= 0) {
      this.updateCash(index, cash); // index exist, so we have to updated it
    } else {
      this.addCash(cash); // index does not exist, so we have to add it
    }
  }

  updateCash(index: number, cash: cash) {
    this.dataSource[index] = cash;
    this.dataSource = this.dataSource.sort(this.sortFunction);
    this.dataSubject.next(this.dataSource);
  }
  addCash(cash: cash) {
    cash.id = Math.random();
    let index = this.dataSource.findIndex((v) => v.date < cash.date);
    if (index >= 0) {
      this.dataSource.splice(index, 0, cash);
    } else this.dataSource.push(cash);
    this.dataSubject.next(this.dataSource);
  }

  sortFunction(a: cash, b: cash) {
    if (b.date < a.date) return -1;
    if (b.date > a.date) return 1;
    return 0;
  }
}
