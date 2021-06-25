import { cash } from './cash';

export interface CashBook {
  expenses: cash[];
  active: boolean;
  _id: string;
  email: string;
  name: string;
  lastName: String;
}
