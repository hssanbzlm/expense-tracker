import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEditComponent } from './cash-edit.component';

xdescribe('CashEditComponent', () => {
  let component: CashEditComponent;
  let fixture: ComponentFixture<CashEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
