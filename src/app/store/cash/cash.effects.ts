import { Injectable } from '@angular/core';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  AddCash,
  CashActionTypes,
  RemoveCash,
  UpdateCash,
} from './cash.action';
import { catchError, map, mergeMap, concatMap, tap } from 'rxjs/operators';
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

  @Effect()
  loadCash$ = this.actions$.pipe(
    ofType(CashActionTypes.LoadCash),
    mergeMap(() => {
      return this.httpService.getExpenses().pipe(
        map((cashBook: CashBook) => {
          localStorage.setItem('expenses-uname', cashBook.name);
          localStorage.setItem('expenses-ulname', cashBook.lastName);
          return {
            type: CashActionTypes.CashLoaded,
            payload: cashBook.expenses,
          };
        }),
        catchError((err) => EMPTY)
      );
    })
  );

  @Effect()
  addCash$ = this.actions$.pipe(
    ofType(CashActionTypes.AddCash),
    mergeMap((action: AddCash) => {
      return this.httpService.addCash(action.payload).pipe(
        map((cash) => ({ type: CashActionTypes.CashAdded, payload: cash })),
        catchError((error) => of({ type: CashActionTypes.ResetCash }))
      );
    })
  );

  @Effect()
  removeCash$ = this.actions$.pipe(
    ofType(CashActionTypes.RemoveCash),
    mergeMap((action: RemoveCash) => {
      return this.httpService.deleteCash(action.payload._id).pipe(
        map(() => ({
          type: CashActionTypes.CashRemoved,
          payload: action.payload,
        })),
        catchError((err) => EMPTY)
      );
    })
  );

  @Effect()
  updateCash$ = this.actions$.pipe(
    ofType(CashActionTypes.UpdateCash),
    mergeMap((action: UpdateCash) => {
      return this.httpService.updateCash(action.payload).pipe(
        map((cash) => ({ type: CashActionTypes.CashUpdated, payload: cash })),
        catchError((error) => of({ type: CashActionTypes.ResetCash }))
      );
    })
  );
}
