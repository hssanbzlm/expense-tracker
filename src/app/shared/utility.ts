import { cash } from './Interfaces/cash';

export function calculateBalance(startingIndex, data: cash[]): cash[] {
  for (let i = startingIndex - 1; i >= 0; i--) {
    if (i == data.length - 1) {
      data[i].balance = data[i].amount * data[i].in;
    } else {
      data[i].balance = data[i + 1].balance + data[i].amount * data[i].in;
    }
    console.log('calculate index from ' + startingIndex);
  }
  return data;
}

export function sortFunction(a: cash, b: cash) {
  if (b.date < a.date) return -1;
  if (b.date > a.date) return 1;
  return 0;
}
