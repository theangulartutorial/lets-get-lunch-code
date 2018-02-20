import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) { }

  intercept(req, next): Observable<HttpEvent<any>> {
    const token = this.localStorage.retrieve('Authorization');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(req);
  }

}
