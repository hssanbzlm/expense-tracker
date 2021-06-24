import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cash } from 'src/app/shared/Interfaces/cash';
import { CashService } from 'src/app/shared/services/cash.service';

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.scss'],
})
export class CashListComponent implements OnInit {
  dataSource: BehaviorSubject<cash[]>;
  @Output() selected = new EventEmitter<cash>();
  @Input() search: string;
  constructor(private cashService: CashService) {}

  ngOnInit(): void {
    this.dataSource = this.cashService.getCash();
  }

  selectedCash(cash: cash) {
    this.selected.emit(cash);
  }
}
