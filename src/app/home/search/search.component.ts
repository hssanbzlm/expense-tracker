import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search: string = '';
  constructor() {}
  @Output() searchEmitter = new EventEmitter();

  ngOnInit(): void {}

  sendSearch() {
    this.searchEmitter.emit(this.search);
  }
}
