import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { FirebaseWrapper } from '../../wrappers/firebase-wrapper/firebase-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let firebaseSpy: jasmine.SpyObj<FirebaseWrapper>;

  beforeEach(() => {
    firebaseSpy = jasmine.createSpyObj('FirebaseWrapper', {
      initializeApp: null,
      getAuth: null,
      signInWithEmailAndPassword: Promise.resolve(),
    });
    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseWrapper, useValue: firebaseSpy }],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize firebase on creation', () => {
    expect(firebaseSpy.initializeApp).toHaveBeenCalledTimes(1);
  });

  it('should call getAuth on getAuth', () => {
    service.getAuth();
    expect(firebaseSpy.getAuth).toHaveBeenCalledTimes(1);
  });
  
  it('should call signInWithEmailAndPassword on signInWithEmailAndPassword', async () => {
    await service.signInWithEmailAndPassword('fede@test.com', 'password');
    expect(firebaseSpy.getAuth).toHaveBeenCalledTimes(1);
    expect(firebaseSpy.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<p>Test component</p>`,
})
class TestComponent {
  constructor(private firebase: FirebaseService) {}
}

describe('FirebaseServiceInjected', () => {
  let fixture: ComponentFixture<TestComponent>;
  let firebaseSpy: jasmine.SpyObj<FirebaseWrapper>;

  beforeEach(() => {
    firebaseSpy = jasmine.createSpyObj('FirebaseWrapper', {
      initializeApp: null,
    });
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: FirebaseWrapper, useValue: firebaseSpy },
        FirebaseService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should initialize firebase when service injected', () => {
    expect(firebaseSpy.initializeApp).toHaveBeenCalledTimes(1);
  });
});
