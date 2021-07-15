import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { CashService } from 'src/app/shared/services/cash.service';

@Component({
  selector: 'app-cash-edit',
  templateUrl: './cash-edit.component.html',
  styleUrls: ['./cash-edit.component.scss'],
})
export class CashEditComponent implements OnInit, OnChanges {
  currentCash: Cash;
  submit: boolean = false;
  constructor(private cashService: CashService) {}
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
    this.cashService.saveCash(this.currentCash).subscribe(
      (v) => {
        this.cashService.handleSaveCash(v);
        this.resetCash();
      },
      (err) => console.log(err)
    );
  }

  resetCash() {
    this.currentCash = {
      amount: null,
      date: null,
      remark: '',
      in: 1,
    };
  }
}
