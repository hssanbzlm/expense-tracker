import { Component, OnInit } from '@angular/core';
import { cash } from 'src/app/shared/Interfaces/cash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  cash: cash;
  search: string = '';
  deletedId: number;
  ngOnInit(): void {}

  getSelectedCash(cash: cash) {
    this.cash = cash;
  }

  getSearch(search) {
    this.search = search;
  }
  getDeletedId(id: number) {
    this.deletedId = id;
  }
}
