import { TestBed } from '@angular/core/testing';

import { PreventauthGuard } from './preventauth.guard';

xdescribe('PreventauthGuard', () => {
  let guard: PreventauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
