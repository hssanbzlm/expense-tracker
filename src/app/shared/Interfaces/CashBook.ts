import { Cash } from './Cash';

export interface CashBook {
  expenses: Cash[];
  active: boolean;
  _id: string;
  email: string;
  name: string;
  lastName: string;
}
