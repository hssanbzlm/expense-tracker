import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { cash } from 'src/app/shared/Interfaces/cash';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
})
export class CashComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() cash: cash;
  @Input() search: string;

  @Output() selectedCash = new EventEmitter<cash>();

  selectCash() {
    this.selectedCash.emit(this.cash);
  }
}
