import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCashComponent } from './total-cash.component';

describe('TotalCashComponent', () => {
  let component: TotalCashComponent;
  let fixture: ComponentFixture<TotalCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
