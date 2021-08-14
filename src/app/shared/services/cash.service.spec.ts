import { TestBed } from '@angular/core/testing';

import { CashService } from './cash.service';
import { MockHttpRequestService } from './mock-http-request.service';

describe('CashService', () => {
  let service: CashService;
  let mockHttpRequestService: MockHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashService);
    mockHttpRequestService = TestBed.inject(MockHttpRequestService);
    service.DataSubject.next(mockHttpRequestService.getExpensesData().expenses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update cash', () => {
    const spyOnUpdateCash = spyOn(mockHttpRequestService, 'updateCash');
    service.saveCash({
      in: 1,
      amount: 500,
      remark: 'hssan remarrrk',
      _id: 5,
      date: new Date(),
    }); //this cash already exists, so it must call update cash
    expect(spyOnUpdateCash).toHaveBeenCalled();
  });

  it('should add cash', () => {
    const spyOnAddCash = spyOn(mockHttpRequestService, 'addCash');
    service.saveCash({
      in: 1,
      amount: 500,
      remark: 'hssan remarrrk',
      _id: 15,
      date: new Date(),
    }); //this cash does not exist, so it must call add cash
    expect(spyOnAddCash).toHaveBeenCalled();
  });
});
