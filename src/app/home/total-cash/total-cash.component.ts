import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TotalInOut } from 'src/app/shared/Interfaces/TotalInOut';
import { CashService } from 'src/app/shared/services/cash.service';

@Component({
  selector: 'app-total-cash',
  templateUrl: './total-cash.component.html',
  styleUrls: ['./total-cash.component.scss'],
})
export class TotalCashComponent implements OnInit {
  constructor(private cashService: CashService) {}
  totalInOut: BehaviorSubject<TotalInOut>;
  ngOnInit(): void {
    this.totalInOut = this.cashService.TotalInOutSubject;
  }
}
