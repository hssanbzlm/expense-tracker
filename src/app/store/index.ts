import { ActionReducerMap } from '@ngrx/store';
import { cashReducer, CashState } from './cash/cash.reducer';

export interface AppState {
  cash: CashState;
}

export const reducer: ActionReducerMap<AppState, any> = {
  cash: cashReducer,
};
