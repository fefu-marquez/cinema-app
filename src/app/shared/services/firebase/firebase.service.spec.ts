import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { FirebaseWrapper } from '../../wrappers/firebase-wrapper/firebase-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Observer } from 'rxjs';
import { User } from 'firebase/auth';
import { FirebaseWrapperTestHelper } from '../../wrappers/firebase-wrapper/firebase-wrapper.spec';
interface Test {
  test: string;
}
describe('FirebaseService', () => {
  let service: FirebaseService;
  let firebaseWrapperMock: any;

  beforeEach(() => {
    firebaseWrapperMock = FirebaseWrapperTestHelper.createFirebaseMock();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize firebase on creation', () => {
    expect(firebaseWrapperMock.initializeApp).toHaveBeenCalledTimes(1);
  });

  it('should call signInWithEmailAndPassword on login', async () => {
    await service.login('fede@test.com', 'password');
    expect(firebaseWrapperMock.getAuth).toHaveBeenCalledTimes(1);
    expect(
      firebaseWrapperMock.signInWithEmailAndPassword
    ).toHaveBeenCalledTimes(1);
  });

  it('should call singOut on logout', async () => {
    await service.logout();
    expect(firebaseWrapperMock.getAuth).toHaveBeenCalledTimes(1);
    expect(firebaseWrapperMock.signOut).toHaveBeenCalledTimes(1);
  });

  it('should call createUserWithEmailAndPassword on createUser', async () => {
    await service.createUser('fede@test.com', 'password', 'Test', 'Test');
    expect(firebaseWrapperMock.getAuth).toHaveBeenCalledTimes(1);
    expect(
      firebaseWrapperMock.createUserWithEmailAndPassword
    ).toHaveBeenCalledTimes(1);
    expect(firebaseWrapperMock.setDoc).toHaveBeenCalledTimes(1);
  });

  it('should create Observable from onAuthStateChanged on onAuthStateChanged', (done) => {
    service.onAuthStateChanged().subscribe((value) => {
      expect(firebaseWrapperMock.getAuth).toHaveBeenCalledTimes(1);
      expect(value).toEqual({} as any);
      done();
    });
  });

  it('should get document converted to type in doc', async () => {
    const response: Test = await service.doc<Test>('test');
    expect(firebaseWrapperMock.doc).toHaveBeenCalledTimes(1);
    expect(firebaseWrapperMock.getDoc).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ test: 'test' });
  });

  it('should get all documents on collection', async () => {
    const respones: Test[] = await service.collection('test');
    expect(firebaseWrapperMock.collection).toHaveBeenCalledTimes(1);
    expect(firebaseWrapperMock.getDocs).toHaveBeenCalledTimes(1);
    expect(respones).toContain({ test: 'test' });
  });

  it('should create on updateOrCreate', async () => {
    await service.updateOrCreate('test', {});
    expect(firebaseWrapperMock.setDoc).toHaveBeenCalledTimes(1);
  });

  it('should create with customId on updateOrCreate', async () => {
    await service.updateOrCreate('test', {}, 'someId');
    expect(firebaseWrapperMock.setDoc).toHaveBeenCalledTimes(1);
  });

  it('should call query or query', async () => {
    const respones: Test[] = await service.query({} as any, {} as any);
    expect(respones).toContain({ test: 'test' });
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
  let firebaseWrapperMock: any;

  beforeEach(() => {
    firebaseWrapperMock = {
      initializeApp: spyOn(FirebaseWrapper, 'initializeApp').and.returnValue(
        null as any
      ),
      getAuth: spyOn(FirebaseWrapper, 'getAuth').and.returnValue({
        onAuthStateChanged: (obs: Observer<User | null>) => obs.next({} as any),
      } as any),
      getFirestore: spyOn(FirebaseWrapper, 'getFirestore').and.returnValue(
        null as any
      ),
    };
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [FirebaseService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should initialize firebase when service injected', () => {
    expect(firebaseWrapperMock.initializeApp).toHaveBeenCalledTimes(1);
  });
});
