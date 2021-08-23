import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http_Interceptor } from './shared/interceptors/http-interceptor.interceptor';
import jsPDF from 'jspdf';
import { PdfGeneratorService } from './shared/services/pdf-generator.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Http_Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
