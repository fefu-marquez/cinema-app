import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { NoAuthGuard } from './no-auth.guard';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';

describe('NoAuthGuard', () => {
  let fakeRoute: ActivatedRouteSnapshot = { url: '/folder/Inbox' } as any;
  let fakeState: RouterStateSnapshot = {} as any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', {
      isLoggedIn: of(false),
    });
    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateRoot: Promise.resolve(),
    });
    TestBed.configureTestingModule({
      providers: [
        { provide: NavController, useValue: navControllerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
  }));

  it('should return false if logged in', (done) => {
    authServiceSpy.isLoggedIn.and.returnValue(of(true));

    const result = TestBed.runInInjectionContext(() =>
      NoAuthGuard(fakeRoute, fakeState)
    ) as Observable<boolean>;

    result.subscribe((canActivate) => {
      expect(canActivate).toBeFalse();
      done();
    });
  });

  it('should redirect to home page if logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    TestBed.runInInjectionContext(() => NoAuthGuard(fakeRoute, fakeState));
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledOnceWith('/home');
  });

  it('should return true if not logged in', (done) => {
    const result = TestBed.runInInjectionContext(() =>
      NoAuthGuard(fakeRoute, fakeState)
    ) as Observable<boolean>;

    result.subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
      done();
    });
  });
});
