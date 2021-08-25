import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { cashReducer, CashState } from './cash/cash.reducer';

export interface AppState {
  cash: CashState;
}

export const reducer: ActionReducerMap<AppState> = {
  cash: cashReducer,
};

export const selectCashState = createFeatureSelector<CashState>('cash');

export const selectCash = createSelector(
  selectCashState,
  (s: CashState) => s?.cash
);

export const selectSelectedCash = createSelector(
  selectCashState,
  (s: CashState) =>
    s.cash
      ? Object.assign(
          {},
          s.cash.find((cash) => cash._id == s.selectedCash)
        )
      : null
);
