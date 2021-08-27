import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { AppState, selectSelectedCash } from 'src/app/store';
import { AddCash, ResetCash, UpdateCash } from 'src/app/store/cash/cash.action';

@Component({
  selector: 'app-cash-edit',
  templateUrl: './cash-edit.component.html',
  styleUrls: ['./cash-edit.component.scss'],
})
export class CashEditComponent implements OnInit {
  currentCash: Cash;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectSelectedCash)).subscribe((v) => {
      this.currentCash = Object.assign({}, v);
    });
  }
  saveCash() {
    if (this.currentCash._id) {
      this.store.dispatch(new UpdateCash(this.currentCash));
    } else this.store.dispatch(new AddCash(this.currentCash));
  }

  resetCash() {
    this.store.dispatch(new ResetCash());
  }
}
