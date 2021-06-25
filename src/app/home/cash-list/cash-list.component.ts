import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { cash } from 'src/app/shared/Interfaces/cash';
import { CashBook } from 'src/app/shared/Interfaces/CashBook';
import { CashService } from 'src/app/shared/services/cash.service';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.scss'],
})
export class CashListComponent implements OnInit, OnDestroy {
  dataSource: BehaviorSubject<cash[]>;
  sub: Subscription;
  @Output() selected = new EventEmitter<cash>();
  @Input() search: string;
  constructor(private cashService: CashService) {}

  ngOnInit(): void {
    this.sub = this.cashService.getCashBook().subscribe(
      (v) => {
        this.cashService.treatData(v);
      },
      (err) => console.log(err)
    );
    this.dataSource = this.cashService.getSubjectData();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectedCash(cash: cash) {
    this.selected.emit(cash);
  }
}
