import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { AppState, selectCash } from 'src/app/store';
import { loadCash } from 'src/app/store/cash/cash.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cash$: Observable<Cash[]>;
  constructor(private store: Store<AppState>) {}
  search: string = '';
  ngOnInit(): void {
    this.getCash();
    this.cash$ = this.store.pipe(select(selectCash));
  }
  getCash() {
    this.store.dispatch(loadCash());
  }
  getSearch(search) {
    this.search = search;
  }
}
