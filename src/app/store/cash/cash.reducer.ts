import { Cash } from 'src/app/shared/Interfaces/Cash';
import { CashActions, CashActionTypes } from './cash.action';

export function addCash(cash: Cash, cashs: Cash[]) {
  return [...cashs, cash];
}

export function removeCash(cash: Cash, cashs: Cash[]) {
  return cashs.filter((c) => c._id != cash._id);
}

export function updateCash(cash: Cash, cashs: Cash[]) {
  return cashs.map((c) => {
    return c._id == cash._id ? Object.assign({}, cash) : c;
  });
}

export interface CashState {
  selectedCash: number | null;
  cash: Cash[];
}

//prettier-ignore
export function cashReducer(state:CashState, action: CashActions):CashState {

    switch(action.type){  
        case CashActionTypes.CashLoaded:
            return {selectedCash:null,cash:action.payload}
        case CashActionTypes.CashAdded:
            return {selectedCash:state.selectedCash,cash:addCash(action.payload,state.cash)}
        case CashActionTypes.CashRemoved:
            return {selectedCash:state.selectedCash,cash:removeCash(action.payload,state.cash)}
        case CashActionTypes.CashUpdated:
            return {selectedCash:state.selectedCash,cash:updateCash(action.payload,state.cash)}
        case CashActionTypes.SelectCash:
            return Object.assign({},state,{selectedCash:action.payload._id});
        case CashActionTypes.ResetCash:
            return Object.assign({},state,{selectedCash:null})
        default:
            return state
    }
}

export function getCashEntities(state: CashState) {
  return state?.cash;
}
export function getSelectedCash(state: CashState) {
  return state.selectedCash
    ? Object.assign(
        {},
        state.cash.find((cash) => cash._id == state.selectedCash)
      )
    : null;
}
