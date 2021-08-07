import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { of, Subscription, EMPTY } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { CashService } from 'src/app/shared/services/cash.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
  providers: [ModalService],
})
export class CashComponent implements OnInit, OnDestroy {
  constructor(
    private cashService: CashService,
    private modalService: ModalService
  ) {}
  @ViewChild('modal', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;
  ngOnInit(): void {}

  @Input() cash: Cash;
  @Input() search: string;
  @Output() selectedCash = new EventEmitter<Cash>();
  @Output() deletedId = new EventEmitter<number>(); // this id will be sent to cash-edit component to check if the deleted
  //cash is same as the selected. if they are equal cash-edit will be reinitialized
  selectCash(e) {
    e.stopPropagation();
    this.selectedCash.emit(Object.assign({}, this.cash));
  }
  deleteCash(e) {
    e.stopPropagation();
    this.modalService
      .open(
        this.modalContainer,
        'You are about to delete a cash',
        'Are you sure ?'
      )
      .pipe(
        mergeMap((v) => {
          // if we receive 'confirm'
          return this.cashService.deleteCash(this.cash._id);
        })
      )
      .subscribe((v) => {
        this.sendDeletedId();
        this.cashService.handleDeleteCash(this.cash._id);
      });
  }

  sendDeletedId() {
    this.deletedId.emit(this.cash._id);
  }
  ngOnDestroy(): void {
    //subscription is ended by the sender
  }
}
