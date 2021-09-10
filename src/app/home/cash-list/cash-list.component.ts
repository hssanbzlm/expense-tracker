import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { AppState, selectCash } from 'src/app/store';
import { loadCash } from 'src/app/store/cash/cash.action';

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.scss'],
})
export class CashListComponent implements OnInit, OnDestroy {
  cashs$: Observable<Cash[]>;
  @Input() search: string;

  constructor(
    private pdfGenerator: PdfGeneratorService,
    private authService: AuthService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    this.getCash();
    this.cashs$ = this.store.pipe(select(selectCash));
  }

  getCash() {
    this.store.dispatch(loadCash());
  }

  tracker(index, cash: Cash) {
    return cash._id;
  }

  generatePdf() {
    this.pdfGenerator.print(this.doc.getElementsByClassName('cash-container'));
  }
  ngOnDestroy(): void {}
}
