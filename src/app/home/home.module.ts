import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Http_Interceptor } from '../shared/interceptors/http-interceptor.interceptor';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http_Interceptor,
      multi: true,
    },
  ],
})
export class HomeModule {}
