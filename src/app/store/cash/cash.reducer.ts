import { createReducer, on } from '@ngrx/store';
import { Cash } from 'src/app/shared/Interfaces/Cash';
import { TotalInOut } from 'src/app/shared/Interfaces/TotalInOut';
import { calculateBalance, sortFunction } from 'src/app/shared/utility';
import * as cashActionTypes from './cash.action';
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

export const cashReducer=createReducer({selectedCash:null,cash:[]},
 on(cashActionTypes.cashAdded,(state,{cash})=>({selectedCash:null,cash:addCash(cash,state.cash)})),
 on(cashActionTypes.cashLoaded,(state,{cash})=>{ 
       const cashs:Cash[]=[...cash]; 
       cashs.sort(sortFunction)
       const cashBalance=calculateBalance(cash.length,cash) 
       return ({selectedCash:null,cash:cashBalance})

}),
on(cashActionTypes.cashUpdated,(state,{cash})=>({selectedCash:null,cash:updateCash(cash,state.cash)})),
on(cashActionTypes.cashRemoved,(state,{cash})=>({selectedCash:null,cash:removeCash(cash,state.cash)})),
on(cashActionTypes.selectCash,(state,{cash})=>(Object.assign({},state,{selectedCash:cash._id}))),
on(cashActionTypes.resetCash,(state)=>(Object.assign({},state,{selectedCash:null})))

)
//
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

export function totalInOutCash(state: CashState): TotalInOut {
  const totalInOut = { in: 0, out: 0 };
  for (let i = 0; i < state?.cash.length; i++) {
    if (state?.cash[i].in == 1) {
      totalInOut.in += state?.cash[i].amount;
    } else totalInOut.out += state?.cash[i].amount;
  }
  return totalInOut;
}
