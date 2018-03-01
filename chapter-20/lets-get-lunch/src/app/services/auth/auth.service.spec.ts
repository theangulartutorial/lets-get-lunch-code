import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LocalStorageService } from 'ngx-webstorage';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let http: HttpTestingController;
  let localStorage: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService]
    });

    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
    localStorage = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a token with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$oF7YW1FyOSW3Gw7G4ThbO.ibduCgF3U0gVI/GE9fKQcGtVEBs0B.2',
        '_id': '5a550ea739fbc4ca3ee0ce58',
        'dietPreferences': []
      };
      const loginResponse = { 'token': 's3cr3tt0ken' };
      let response;

      authService.signup(user).subscribe(res => {
        response = res;
      });
      spyOn(authService, 'login').and.callFake(() => Observable.of(loginResponse));

      http
        .expectOne('http://localhost:8080/api/users')
        .flush(signupResponse);
      expect(response).toEqual(loginResponse);
      expect(authService.login).toHaveBeenCalled();
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = { username: 'myUser', password: 'pswd' };
      const signupResponse = 'Your password must be at least 5 characters long.';
      let errorResponse;

      authService.signup(user).subscribe(res => {}, err => {
        errorResponse = err;
      });

      http.expectOne('http://localhost:8080/api/users').flush({message: signupResponse}, {status: 400, statusText: 'Bad Request'});
      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });

  describe('login', () => {
    it('should return a token with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password' };
      const loginResponse = { 'token': 's3cr3tt0ken' };
      let response;

      authService.login(user).subscribe(res => {
        response = res;
      });
      spyOn(authService.loggedIn, 'emit');

      http.expectOne('http://localhost:8080/api/sessions').flush(loginResponse);
      expect(response).toEqual(loginResponse);
      expect(localStorage.retrieve('Authorization')).toEqual('s3cr3tt0ken');
      expect(authService.loggedIn.emit).toHaveBeenCalled();
      http.verify();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      localStorage.store('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
        'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
      expect(authService.isLoggedIn()).toEqual(true);
    });

    it('should return false if the user is not logged in', () => {
      localStorage.clear('Authorization');
      expect(authService.isLoggedIn()).toEqual(false);
    });
  });

  describe('logout', () => {
    it('should clear the token from local storage', () => {
      spyOn(authService.loggedIn, 'emit');

      localStorage.store('Authorization', 's3cr3tt0ken');
      expect(localStorage.retrieve('Authorization')).toEqual('s3cr3tt0ken');

      authService.logout();

      expect(localStorage.retrieve('Authorization')).toBeFalsy();
      expect(authService.loggedIn.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('currentUser', () => {
    it('should return a user object with a valid token', () => {
      spyOn(localStorage, 'retrieve').and.callFake(() => 's3cr3tt0ken' );
      spyOn(authService.jwtHelper, 'decodeToken').and.callFake(() => {
        return {
          exp: 1517847480,
          iat: 1517840280,
          username: 'username',
          _id: '5a6f41c94000495518d2673f'
        };
      });
      const res = authService.currentUser();

      expect(localStorage.retrieve).toHaveBeenCalled();
      expect(res.username).toBeDefined();
      expect(res._id).toBeDefined();
    });
  });
});
