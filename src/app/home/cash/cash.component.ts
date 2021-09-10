import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AppState } from 'src/app/store';
import { removeCash, selectCash } from 'src/app/store/cash/cash.action';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
  providers: [ModalService],
})
export class CashComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: ModalService,
    private store: Store<AppState>
  ) {}
  @ViewChild('modal', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;
  ngOnInit(): void {}

  @Input() cash: Cash;
  @Input() search: string;

  selectCash(e) {
    e.stopPropagation();
    this.store.dispatch(selectCash({ cash: this.cash }));
  }
  deleteCash(e) {
    e.stopPropagation();
    this.modalService
      .open(
        this.modalContainer,
        'You are about to delete a cash',
        'Are you sure ?'
      )
      .subscribe((v) => {
        this.store.dispatch(removeCash({ cash: this.cash }));
      });
  }

  ngOnDestroy(): void {
    //Open modal subscription is ended by the sender
  }
}
