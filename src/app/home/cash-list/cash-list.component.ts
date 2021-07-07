import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { cash } from 'src/app/shared/Interfaces/cash';
import { CashService } from 'src/app/shared/services/cash.service';

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
  @Output() deletedId = new EventEmitter<number>(); // we get this from cash component when item deleted to be sent to cash-edit to check if the seleted cash
  // and deleted cash are the same. if they are equal , cash-edit will be reinitialized
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

  getDeletedId(id: number) {
    this.deletedId.emit(id);
  }
  tracker(index, cash: cash) {
    return cash._id;
  }
}
