import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { CashService } from 'src/app/shared/services/cash.service';
import { AppState } from 'src/app/store';
import { AddCash } from 'src/app/store/cash/cash.action';

@Component({
  selector: 'app-cash-edit',
  templateUrl: './cash-edit.component.html',
  styleUrls: ['./cash-edit.component.scss'],
})
export class CashEditComponent implements OnInit, OnChanges {
  currentCash: Cash;
  submit: boolean = false;
  constructor(
    private cashService: CashService,
    private store: Store<AppState>
  ) {}
  @Input() set cash(value: Cash) {
    this.currentCash = Object.assign({}, value);
  }
  @Input() deletedId: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.deletedId === this.currentCash._id) {
      this.resetCash();
    }
  }

  ngOnInit(): void {}
  saveCash() {
    this.submit = true;
    this.store.dispatch(new AddCash(this.currentCash));
  }

  resetCash() {
    this.submit = false;
    this.currentCash = {
      amount: null,
      date: null,
      remark: '',
      in: 1,
    };
  }
}
