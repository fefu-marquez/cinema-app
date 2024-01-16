import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase/firebase.service';

describe('AuthService', () => {
  let service: AuthService;
  let firebaseSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(() => {
    firebaseSpy = jasmine.createSpyObj('FirebaseService', {
      signInWithEmailAndPassword: Promise.resolve(),
    });
    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseService, useValue: firebaseSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service.user$).toBeDefined();
    expect(service).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword on login', async () => {
    await service.login({ username: 'fede@test.com', password: 'password' });
    expect(firebaseSpy.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
