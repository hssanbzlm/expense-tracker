import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Inject,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CashService } from 'src/app/shared/services/cash.service';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { LoadCash } from 'src/app/store/cash/cash.action';
import { CashState } from 'src/app/store/cash/cash.reducer';

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.scss'],
})
export class CashListComponent implements OnInit, OnDestroy {
  cashs$: Observable<Cash[]>;
  sub: Subscription;
  @Output() selected = new EventEmitter<Cash>();
  @Input() search: string;
  @Output() deletedId = new EventEmitter<number>(); // we get this from cash component when item deleted to be sent to cash-edit to check if the seleted cash
  // and deleted cash are the same. if they are equal , cash-edit will be reinitialized
  constructor(
    private cashService: CashService,
    private pdfGenerator: PdfGeneratorService,
    private authService: AuthService,
    private store: Store<CashState>,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.cashs$ = this.store.select('cash');
  }

  ngOnInit(): void {
    this.getCash();
  }

  getCash() {
    this.store.dispatch(new LoadCash());
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectedCash(cash: Cash) {
    this.selected.emit(cash);
  }

  getDeletedId(id: number) {
    this.deletedId.emit(id);
  }
  tracker(index, cash: Cash) {
    return cash._id;
  }

  generatePdf() {
    this.pdfGenerator.print(this.doc.getElementsByClassName('cash-container'));
  }
}
