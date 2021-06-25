import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http_Interceptor implements HttpInterceptor {
  constructor() {
    console.log('from interceptor');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return next.handle(modifRequest);
  }
}
