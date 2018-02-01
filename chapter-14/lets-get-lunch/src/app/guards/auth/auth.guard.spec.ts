import { AuthGuard } from './auth.guard';
import { RouterStub } from '../../testing/router-stubs';

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { isLoggedIn: () => true };
      router = new RouterStub();
      authGuard = new AuthGuard(authService, router);

      expect(authGuard.canActivate()).toEqual(true);
    });

    it('should navigate to home for a logged out user', () => {
      authService = { isLoggedIn: () => false };
      router = new RouterStub();
      authGuard = new AuthGuard(authService, router);
      spyOn(router, 'navigate');

      expect(authGuard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
