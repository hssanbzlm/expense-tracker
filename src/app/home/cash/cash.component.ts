import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { cash } from 'src/app/shared/Interfaces/cash';
import { CashService } from 'src/app/shared/services/cash.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
})
export class CashComponent implements OnInit {
  constructor(private cashService: CashService) {}

  ngOnInit(): void {}

  @Input() cash: cash;
  @Input() search: string;

  @Output() selectedCash = new EventEmitter<cash>();

  selectCash(e) {
    e.stopPropagation();
    this.selectedCash.emit(this.cash);
  }
  deleteCash(e) {
    e.stopPropagation();
    this.cashService.deleteCash(this.cash._id);
  }
}
