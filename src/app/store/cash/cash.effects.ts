import { Injectable } from '@angular/core';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashActionsTypes from './cash.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { CashBook } from 'src/app/shared/Interfaces/CashBook';

@Injectable({
  providedIn: 'root',
})
export class CashEffects {
  constructor(
    private httpService: HttpRequestsService,
    private actions$: Actions
  ) {}

  loadCash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashActionsTypes.loadCash),
      mergeMap(() => {
        return this.httpService.getExpenses().pipe(
          map((cashBook: CashBook) => {
            localStorage.setItem('expenses-uname', cashBook.name);
            localStorage.setItem('expenses-ulname', cashBook.lastName);
            console.log(cashBook.expenses);
            return {
              type: '[Cash] Loaded data',
              cash: cashBook.expenses,
            };
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );

  addCash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashActionsTypes.addCash),
      mergeMap((action) => {
        return this.httpService.addCash(action.cash).pipe(
          map((cash) => ({ type: '[Cash] Added data', cash: cash })),
          catchError((error) => of({ type: '[Cash] Reset data' }))
        );
      })
    )
  );

  removeCash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashActionsTypes.removeCash),
      mergeMap((action) => {
        return this.httpService.deleteCash(action.cash._id).pipe(
          map(() => ({
            type: '[Cash] Removed data',
            cash: action.cash,
          })),
          catchError((err) => EMPTY)
        );
      })
    )
  );

  updateCash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashActionsTypes.updateCash),
      mergeMap((action) => {
        return this.httpService.updateCash(action.cash).pipe(
          map((cash) => ({ type: '[Cash] Updated data', cash: cash })),
          catchError((error) => of({ type: '[Cash] Reset data' }))
        );
      })
    )
  );
}
