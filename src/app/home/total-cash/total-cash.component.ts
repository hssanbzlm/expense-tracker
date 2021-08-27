import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TotalInOut } from 'src/app/shared/Interfaces/TotalInOut';
import { AppState, getTotalInOutCash } from 'src/app/store';

@Component({
  selector: 'app-total-cash',
  templateUrl: './total-cash.component.html',
  styleUrls: ['./total-cash.component.scss'],
})
export class TotalCashComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  totalInOut: Observable<TotalInOut>;
  ngOnInit(): void {
    this.totalInOut = this.store.pipe(select(getTotalInOutCash));
  }
}
