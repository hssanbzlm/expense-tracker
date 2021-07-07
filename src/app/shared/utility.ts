import { cash } from './Interfaces/cash';
import { TotalInOut } from './Interfaces/TotalInOut';

export function calculateBalance(startingIndex, data: cash[]): cash[] {
  let newCash = [...data];
  for (let i = startingIndex - 1; i >= 0; i--) {
    if (i == newCash.length - 1) {
      newCash[i].balance = newCash[i].amount * newCash[i].in;
    } else {
      newCash[i].balance =
        newCash[i + 1].balance + newCash[i].amount * newCash[i].in;
    }
  }
  return newCash;
}

export function sortFunction(a: cash, b: cash) {
  if (b.date < a.date) return -1;
  if (b.date > a.date) return 1;
  return 0;
}

export function totalInOut(data: cash[]): TotalInOut {
  const totalInOut = { in: 0, out: 0 };
  for (let i = 0; i < data.length; i++) {
    if (data[i].in == 1) {
      totalInOut.in += data[i].amount;
    } else totalInOut.out += data[i].amount;
  }
  return totalInOut;
}
