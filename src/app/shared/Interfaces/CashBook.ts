import { Cash } from './Cash';

export interface CashBook {
  expenses: Cash[];
  active: boolean;
  _id: number;
  email: string;
  name: string;
  lastName: string;
}
