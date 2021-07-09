import { Component, OnInit } from '@angular/core';
import { Cash } from 'src/app/shared/Interfaces/Cash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  cash: Cash;
  search: string = '';
  deletedId: number;
  ngOnInit(): void {}

  getSelectedCash(cash: Cash) {
    this.cash = cash;
  }

  getSearch(search) {
    this.search = search;
  }
  getDeletedId(id: number) {
    this.deletedId = id;
  }
}
