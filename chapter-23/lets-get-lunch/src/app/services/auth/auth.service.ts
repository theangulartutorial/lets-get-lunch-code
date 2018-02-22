import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { LocalStorageService } from 'ngx-webstorage';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

import { User } from './user';

@Injectable()
export class AuthService {
  API = environment.api;
  @Output() loggedIn: EventEmitter<boolean>;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.loggedIn = new EventEmitter();
  }

  signup(credentials: User): Observable<object> {
    return this.http.post(this.API + '/users', credentials)
      .mergeMap(res => this.login(credentials));
  }

  login(credentials: User): Observable<object> {
    return this.http.post(this.API + '/sessions', credentials)
      .map((res: any) => {
        this.localStorage.store('Authorization', res.token);
        this.loggedIn.emit(true);
        return res;
      });
  }

  logout() {
    this.localStorage.clear('Authorization');
    this.loggedIn.emit(false);
  }

  isLoggedIn() {
    return tokenNotExpired('ng2-webstorage|authorization');
  }

  currentUser() {
    return this.jwtHelper.decodeToken(this.localStorage.retrieve('Authorization'));
  }

}
