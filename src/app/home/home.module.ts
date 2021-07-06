import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CashListComponent } from './cash-list/cash-list.component';
import { TotalCashComponent } from './total-cash/total-cash.component';
import { CashEditComponent } from './cash-edit/cash-edit.component';
import { CashComponent } from './cash/cash.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    CashListComponent,
    TotalCashComponent,
    CashEditComponent,
    CashComponent,
    NavbarComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MatNativeDateModule, MatDatepickerModule],
})
export class HomeModule {}
