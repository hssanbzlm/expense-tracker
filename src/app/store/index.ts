import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  cashReducer,
  CashState,
  getCashEntities,
  getSelectedCash,
  totalInOutCash,
} from './cash/cash.reducer';

export interface AppState {
  cash: CashState;
}

export const reducer: ActionReducerMap<AppState> = {
  cash: cashReducer,
};

export const selectCashState = createFeatureSelector<CashState>('cash');

export const selectCash = createSelector(selectCashState, getCashEntities);

export const selectSelectedCash = createSelector(
  selectCashState,
  getSelectedCash
);

export const getTotalInOutCash = createSelector(
  selectCashState,
  totalInOutCash
);
