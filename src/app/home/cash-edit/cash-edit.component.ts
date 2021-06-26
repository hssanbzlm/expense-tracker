import { Component, Input, OnInit } from '@angular/core';
import { cash } from 'src/app/shared/Interfaces/cash';
import { CashService } from 'src/app/shared/services/cash.service';

@Component({
  selector: 'app-cash-edit',
  templateUrl: './cash-edit.component.html',
  styleUrls: ['./cash-edit.component.scss'],
})
export class CashEditComponent implements OnInit {
  currentCash: cash;
  submit: boolean = false;
  constructor(private cashService: CashService) {}
  @Input() set cash(value: cash) {
    this.currentCash = Object.assign({}, value);
  }

  ngOnInit(): void {}
  saveCash() {
    this.cashService.saveCash(this.currentCash).subscribe(
      (v) => {
        this.cashService.handleSaveCashResult(v);
      },
      (err) => console.log(err)
    );

    this.resetCash();
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
