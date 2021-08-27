import { Cash } from './Interfaces/Cash';

export function calculateBalance(startingIndex, data: Cash[]): Cash[] {
  let newCash = [...data];
  for (let i = startingIndex - 1; i >= 0; i--) {
    if (i == newCash.length - 1) {
      var returnTarget = Object.assign(
        {},
        {
          ...newCash[i],
          balance: newCash[i].amount * newCash[i].in,
        }
      );
    } else {
      returnTarget = Object.assign(
        {},
        {
          ...newCash[i],
          balance: newCash[i + 1].balance + newCash[i].amount * newCash[i].in,
        }
      );
    }
    newCash[i] = returnTarget;
  }
  return newCash;
}

export function sortFunction(a: Cash, b: Cash) {
  if (b.date < a.date) return -1;
  if (b.date > a.date) return 1;
  return 0;
}
