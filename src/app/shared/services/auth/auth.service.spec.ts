import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase/firebase.service';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { User } from 'firebase/auth';

describe('AuthService', () => {
  let service: AuthService;
  let firebaseSpy: jasmine.SpyObj<FirebaseService>;
  let fakeUser: Subject<User | null>;

  beforeEach(() => {
    fakeUser = new Subject();
    firebaseSpy = jasmine.createSpyObj('FirebaseService', {
      login: Promise.resolve(),
      logout: Promise.resolve(),
      onAuthStateChanged: fakeUser,
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: FirebaseService, useValue: firebaseSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    firebaseSpy = TestBed.inject(
      FirebaseService
    ) as jasmine.SpyObj<FirebaseService>;
  });

  it('should be created', () => {
    fakeUser.next({} as any);
    expect(service.user$).toBeDefined();
    expect(service).toBeTruthy();
  });

  it('should call login on login', async () => {
    fakeUser.next({} as any);
    await service.login({ username: 'fede@test.com', password: 'password' });
    expect(firebaseSpy.login).toHaveBeenCalledTimes(1);
  });

  it('should call logout on logout', async () => {
    fakeUser.next({} as any);
    await service.logout();
    expect(firebaseSpy.logout).toHaveBeenCalledTimes(1);
  });

  it('should return true if user logged in in isLoggedIn', (done) => {
    firebaseSpy.onAuthStateChanged.and.returnValue(of({} as any));
    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
    fakeUser.next({} as any);
  });

  it('should return false if user not logged in in isLoggedIn', (done) => {
    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
    fakeUser.next(null);
  });
});
