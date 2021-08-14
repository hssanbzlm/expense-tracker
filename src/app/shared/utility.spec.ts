import { Cash } from './Interfaces/Cash';
import { sortFunction, calculateBalance, totalInOut } from './utility';

describe('utility ', () => {
  it('must sort cash descending', () => {
    //14/08/2021 1628960253
    //14/12/2020 1607960052
    //9/02/2005 1107960052
    // 11/12/2008 1228980289
    const data: Cash[] = [
      { in: -1, amount: 400, remark: 'bozlima', date: new Date(1607960052) },
      { in: -1, remark: 'rmark', amount: 150, date: new Date(1228980289) },
      { in: 1, remark: 'hssan', amount: 20, date: new Date(1628960253) },
      { in: 1, remark: 'ree', amount: 19, date: new Date(1107960052) },
    ];
    expect(data.sort(sortFunction)).toEqual([
      { in: 1, remark: 'hssan', amount: 20, date: new Date(1628960253) },
      { in: -1, amount: 400, remark: 'bozlima', date: new Date(1607960052) },
      { in: -1, remark: 'rmark', amount: 150, date: new Date(1228980289) },
      { in: 1, remark: 'ree', amount: 19, date: new Date(1107960052) },
    ]);

    expect(data.sort(sortFunction)).not.toEqual([
      { in: -1, amount: 400, remark: 'bozlima', date: new Date(1607960052) },
      { in: 1, remark: 'ree', amount: 19, date: new Date(1107960052) },
      { in: -1, remark: 'rmark', amount: 150, date: new Date(1228980289) },
      { in: 1, remark: 'hssan', amount: 20, date: new Date(1628960253) },
    ]);
  });

  it('must calculate balance', () => {
    const data: Cash[] = [
      { in: 1, remark: 'hssan', amount: 20, date: new Date(1628960253) },
      { in: -1, amount: 400, remark: 'bozlima', date: new Date(1607960052) },
      { in: -1, remark: 'rmark', amount: 150, date: new Date(1228980289) },
      { in: 1, remark: 'ree', amount: 19, date: new Date(1107960052) },
    ];

    expect(calculateBalance(data.length, data)).toEqual([
      {
        in: 1,
        remark: 'hssan',
        amount: 20,
        date: new Date(1628960253),
        balance: -511,
      },
      {
        in: -1,
        amount: 400,
        remark: 'bozlima',
        date: new Date(1607960052),
        balance: -531,
      },
      {
        in: -1,
        remark: 'rmark',
        amount: 150,
        date: new Date(1228980289),
        balance: -131,
      },
      {
        in: 1,
        remark: 'ree',
        amount: 19,
        date: new Date(1107960052),
        balance: 19,
      },
    ]);
  });
  it('should calculate total in/out cash', () => {
    const data: Cash[] = [
      { in: -1, amount: 400, remark: 'bozlima', date: new Date(1607960052) },
      { in: -1, remark: 'rmark', amount: 150, date: new Date(1228980289) },
      { in: 1, remark: 'hssan', amount: 20, date: new Date(1628960253) },
      { in: 1, remark: 'ree', amount: 19, date: new Date(1107960052) },
    ];
    expect(totalInOut(data)).toEqual({ in: 39, out: 550 });
  });
});
