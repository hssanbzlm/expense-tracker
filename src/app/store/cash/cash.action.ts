import { Action } from '@ngrx/store';
import { Cash } from '../../shared/Interfaces/Cash';

export const enum CashActionTypes {
  SelectCash = '[Cash] Select data',
  ResetCash = '[Cash] Reset data',

  LoadCash = '[Cash] Load data',
  CashLoaded = '[Cash] Loaded data',

  AddCash = '[Cash] Add data',
  CashAdded = '[Cash] Added data',

  RemoveCash = '[Cash] Remove data',
  CashRemoved = '[Cash] Removed data',

  UpdateCash = '[Cash] Update data',
  CashUpdated = '[Cash] Updated data',
}

export class SelectCash implements Action {
  constructor(public payload: Cash) {}
  type = CashActionTypes.SelectCash;
}

export class ResetCash implements Action {
  constructor(public payload) {}
  type = CashActionTypes.ResetCash;
}

//effect
export class LoadCash implements Action {
  constructor() {}
  readonly type = CashActionTypes.LoadCash;
}

export class CashLoaded implements Action {
  constructor(public payload) {}
  readonly type = CashActionTypes.CashLoaded;
}
//effect
export class AddCash implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.AddCash;
}
//reducer
export class CashAdded implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.CashAdded;
}

//effect
export class UpdateCash implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.UpdateCash;
}

//reducer
export class CashUpdated implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.CashUpdated;
}

//effect
export class RemoveCash implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.RemoveCash;
}

//reducer
export class CashRemoved implements Action {
  constructor(public payload: Cash) {}
  readonly type = CashActionTypes.CashRemoved;
}

export type CashActions =
  | CashRemoved
  | RemoveCash
  | UpdateCash
  | CashUpdated
  | LoadCash
  | CashLoaded
  | AddCash
  | CashAdded
  | SelectCash
  | ResetCash;
