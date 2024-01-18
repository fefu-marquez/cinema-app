import { Observer } from 'rxjs';
import { FirebaseWrapper } from './firebase-wrapper';
import { User } from 'firebase/auth';

const fakeAuth = {
  onAuthStateChanged: (obs: Observer<User | null>) => obs.next({} as any),
};

const fakeDoc = {
  id: 'id',
  data: () => {
    return { test: 'test' };
  },
};

export const FIREBASE_WRAPPER_RETURN_VALUES = {
  initializeApp: null,
  getAuth: fakeAuth,
  signInWithEmailAndPassword: null,
  signOut: Promise.resolve(),
  createUserWithEmailAndPassword: Promise.resolve({ user: { uid: 'uid' } }),
  getFirestore: null,
  doc: null,
  getDoc: Promise.resolve(fakeDoc),
  getDocs: Promise.resolve([fakeDoc]),
  collection: Promise.resolve([fakeDoc]),
  query: Promise.resolve([fakeDoc]),
  setDoc: Promise.resolve(),
  deleteDoc: Promise.resolve(),
};

export abstract class FirebaseWrapperTestHelper {
  static createFirebaseMock(): any {
    const allFirebaseWrapperMethods =
      Object.getOwnPropertyNames(FirebaseWrapper);

    if (
      allFirebaseWrapperMethods.length >
      Object.getOwnPropertyNames(FIREBASE_WRAPPER_RETURN_VALUES).length + 3
    )
      throw new Error('There are missing FirebaseWrapper methods!');

    let firebaseMock: any = {};

    Object.getOwnPropertyNames(FirebaseWrapper).forEach((methodName, index) => {
      if (index >= 3) {
        firebaseMock[methodName] = spyOn(
          FirebaseWrapper,
          methodName as any
        ).and.returnValue(
          Object.getOwnPropertyDescriptors(FIREBASE_WRAPPER_RETURN_VALUES)[
            methodName
          ].value
        );
      }
    });

    return firebaseMock;
  }
}
