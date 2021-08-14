import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token');

    let authReq: HttpRequest<any>;
    if (token){
      authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer' + token,
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
