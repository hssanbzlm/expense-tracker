import { DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CashService } from 'src/app/shared/services/cash.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

import { CashComponent } from './cash.component';

describe('CashComponent', () => {
  let component: CashComponent;
  let modalComponent: ModalComponent;
  let fixture: ComponentFixture<CashComponent>;
  let modalService: ModalService;
  let cashService: CashService;
  let de: DebugElement;
  let deModal: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashComponent, ModalComponent],
      providers: [ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashComponent);
    modalService = TestBed.inject(ModalService);
    cashService = TestBed.inject(CashService);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.search = '';
    component.cash = {
      in: 1,
      remark: 'my remark',
      date: new Date(),
      amount: 500,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    //first .delete class element
    const p = de.query(By.css('.delete'));
    const spyOnDeleteCash = spyOn(component, 'deleteCash');
    p.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(spyOnDeleteCash).toHaveBeenCalled();
  });

  it('should confirm event service ', () => {
    let fixture: ComponentFixture<ModalComponent>;
    fixture = TestBed.createComponent(ModalComponent);
    deModal = fixture.debugElement;
    modalComponent = fixture.componentInstance;
    modalComponent.title = '';
    modalComponent.body = '';
    modalComponent.closeme.subscribe(() => modalService.closeMe());
    modalComponent.confirmme.subscribe(() => modalService.confirm());
    const confirmBtn = deModal.query(By.css('#confirm-btn'));
    const spyOnServiceConfirm = spyOn(modalService, 'confirm');
    confirmBtn.triggerEventHandler('click', {});
    expect(spyOnServiceConfirm).toHaveBeenCalled();
  });
});
