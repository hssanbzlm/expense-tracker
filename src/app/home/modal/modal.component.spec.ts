import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalService } from 'src/app/shared/services/modal.service';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let modalService: ModalService;
  let fixture: ComponentFixture<ModalComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send close event', () => {
    const btn = de.query(By.css('#close-btn'));
    const spyOnCloseEvent = spyOn(component, 'closeMe');
    btn.triggerEventHandler('click', {});
    expect(spyOnCloseEvent).toHaveBeenCalled();
  });

  it('should send confirm event', () => {
    const btn = de.query(By.css('#confirm-btn'));
    const spyOnConfirmEvent = spyOn(component, 'confirmMe');
    const spyOnConfirmService = spyOn(modalService, 'confirm');
    btn.triggerEventHandler('click', {});
    expect(spyOnConfirmEvent).toHaveBeenCalled();
  });
});
