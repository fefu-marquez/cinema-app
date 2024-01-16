import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';

describe('AuthGuard', () => {
  let fakeRoute: ActivatedRouteSnapshot = { url: '/folder/Inbox' } as any;
  let fakeState: RouterStateSnapshot = {} as any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', {
      isLoggedIn: of(true),
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

  it('should return false if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(of(false));

    const result = TestBed.runInInjectionContext(() =>
      AuthGuard(fakeRoute, fakeState)
    ) as Observable<boolean>;

    result.subscribe((canActivate) => expect(canActivate).toBeFalse());
  });

  it('should redirect to login page if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(of(false));
    TestBed.runInInjectionContext(() => AuthGuard(fakeRoute, fakeState));
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledOnceWith('/login');
  });

  it('should return true if logged in', () => {
    const result = TestBed.runInInjectionContext(() =>
      AuthGuard(fakeRoute, fakeState)
    ) as Observable<boolean>;

    result.subscribe((canActivate) => expect(canActivate).toBeTrue());
  });
});
