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
import { Subscription } from 'rxjs';
import { cash } from 'src/app/shared/Interfaces/cash';
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
  sub: Subscription;
  @ViewChild('modal', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;
  ngOnInit(): void {}

  @Input() cash: cash;
  @Input() search: string;
  @Output() selectedCash = new EventEmitter<cash>();

  selectCash(e) {
    e.stopPropagation();
    this.selectedCash.emit(this.cash);
  }
  deleteCash(e) {
    e.stopPropagation();
    this.sub = this.modalService.open(this.modalContainer).subscribe((v) => {
      if (v === 'confirm') {
        this.cashService.deleteCash(this.cash._id);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
