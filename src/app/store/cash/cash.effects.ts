import { Injectable } from '@angular/core';
import { HttpRequestsService } from 'src/app/shared/services/http-requests.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CashActionTypes } from './cash.action';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CashEffects {
  constructor(
    private httpService: HttpRequestsService,
    private actions$: Actions
  ) {}

  addCash$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CashActionTypes.AddCash),
      map((action) => this.httpService.addCash(action.payload))
    );
  });
}
