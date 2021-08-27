import { Cash } from 'src/app/shared/Interfaces/Cash';
import { calculateBalance, sortFunction } from 'src/app/shared/utility';
import { CashActions, CashActionTypes } from './cash.action';

export function addCash(cash: Cash, cashs: Cash[]) {
  let newCash = [...cashs];
  let index = newCash.findIndex((v) => v.date < cash.date);
  if (index >= 0) {
    newCash.splice(index, 0, cash);
    newCash = calculateBalance(index + 1, newCash);
  } else {
    newCash.push(cash);
    newCash = calculateBalance(newCash.length, newCash);
  }
  return newCash;
}

export function removeCash(cash: Cash, cashs: Cash[]) {
  let newCash = cashs.filter((v) => v._id != cash._id);
  if (newCash.length > 0) {
    newCash = calculateBalance(newCash.length, newCash);
  }
  return newCash;
}

export function updateCash(cash: Cash, cashs: Cash[]) {
  let newCash = cashs.map((v: Cash) => {
    if (v._id == cash._id) {
      return cash;
    }
    return v;
  });
  newCash.sort(sortFunction); // we sort data in case user has updated the date
  newCash = calculateBalance(newCash.length, newCash);
  return newCash;
}

export interface CashState {
  selectedCash: number | null;
  cash: Cash[];
}

//prettier-ignore
export function cashReducer(state:CashState, action: CashActions):CashState {

    switch(action.type){  
        case CashActionTypes.CashLoaded: 
        const cash:Cash[]=[...action.payload]; 
        cash.sort(sortFunction)
        const cashBalance=calculateBalance(action.payload.length,cash)
            return {selectedCash:null,cash:cashBalance}
        case CashActionTypes.CashAdded:
            return {selectedCash:null,cash:addCash(action.payload,state.cash)}
        case CashActionTypes.CashRemoved:
            return {selectedCash:null,cash:removeCash(action.payload,state.cash)}
        case CashActionTypes.CashUpdated:
            return {selectedCash:null,cash:updateCash(action.payload,state.cash)}
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
export function getSelectedCash(state: CashState): Cash {
  return state?.selectedCash
    ? Object.assign(
        {},
        state.cash.find((cash) => cash._id == state.selectedCash)
      )
    : { date: null, remark: '', in: 1, amount: 0 };
}
