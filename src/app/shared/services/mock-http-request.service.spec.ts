import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { MockHttpRequestService } from './mock-http-request.service';

describe('MockHttpRequestService', () => {
  let service: MockHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    expect(service.getExpenses()).toBeTruthy();
    expect(service.getExpenses()).toBeInstanceOf(Observable);
  });

  it('should update data', () => {
    service
      .updateCash({
        in: -1,
        amount: 500,
        remark: 'hssan remark',
        _id: 4,
        date: new Date(),
      })
      .subscribe((v) => {
        expect(v.in).toEqual(-1);
      });
  });

  it('shouldnt update data', () => {
    service
      .updateCash({
        in: -1,
        amount: 500,
        remark: 'hssan remark',
        _id: 50,
        date: new Date(),
      })
      .subscribe((v) => {
        expect(v).toBeFalsy();
      });
  });

  it('should add new cash', () => {
    const cashLength = service.getCashLength();
    service
      .addCash({
        _id: 12,
        amount: 20,
        in: 1,
        date: new Date(),
        remark: 'remarkss',
      })
      .subscribe((v) => {
        expect(service.getCashLength()).toEqual(cashLength + 1);
      });
  });

  it('should delete cash', () => {
    service.deleteCash(1).subscribe((v) => {
      expect(v._id).toEqual(1);
    });
  });
});
