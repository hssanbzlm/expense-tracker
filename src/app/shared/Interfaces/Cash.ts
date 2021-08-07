export interface Cash {
  _id?: number;
  date: Date;
  amount: number;
  remark: string;
  in: number;
  balance?: number;
}
