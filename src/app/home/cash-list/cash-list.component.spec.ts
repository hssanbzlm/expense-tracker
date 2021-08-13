import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CashListComponent } from './cash-list.component';
import { CashComponent } from '../cash/cash.component';

describe('CashListComponent', () => {
  let component: CashListComponent;
  let fixture: ComponentFixture<CashListComponent>;
  let de: DebugElement;
  let pdfGeneratorService: PdfGeneratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CashListComponent, CashComponent],
      providers: [PdfGeneratorService],
    }).compileComponents();
  });

  beforeEach(() => {
    pdfGeneratorService = TestBed.inject(PdfGeneratorService);
    fixture = TestBed.createComponent(CashListComponent);
    component = fixture.componentInstance;
    component.search = '';
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call print method of pdfGenerator service ', () => {
    const btn = de.query(By.css('.btn-pdf'));
    let spyOnService = spyOn(pdfGeneratorService, 'print');
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(spyOnService).toHaveBeenCalled();
  });
});
