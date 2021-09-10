import { Action, createAction, props } from '@ngrx/store';
import { Cash } from '../../shared/Interfaces/Cash';

export const selectCash = createAction(
  '[Cash] Select data',
  props<{ cash: Cash }>()
);
export const resetCash = createAction('[Cash] Reset data');
export const loadCash = createAction('[Cash] Load data');
export const cashLoaded = createAction(
  '[Cash] Loaded data',
  props<{ cash: Cash[] }>()
);
export const addCash = createAction('[Cash] Add data', props<{ cash: Cash }>());
export const cashAdded = createAction(
  '[Cash] Added data',
  props<{ cash: Cash }>()
);
export const updateCash = createAction(
  '[Cash] Update data',
  props<{ cash: Cash }>()
);
export const cashUpdated = createAction(
  '[Cash] Updated data',
  props<{ cash: Cash }>()
);

export const removeCash = createAction(
  '[Cash] Remove data',
  props<{ cash: Cash }>()
);
export const cashRemoved = createAction(
  '[Cash] Removed data',
  props<{ cash: Cash }>()
);
