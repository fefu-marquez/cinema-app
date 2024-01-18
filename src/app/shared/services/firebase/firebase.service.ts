import { Injectable } from '@angular/core';
import { FirebaseWrapper } from '../../wrappers/firebase-wrapper/firebase-wrapper';
import { environment } from 'src/environments/environment';
import { Auth, User as FirebaseUser, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  Query,
  QueryCompositeFilterConstraint,
  QueryNonFilterConstraint,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Everything that connects to firebase should use this service
  public readonly app: FirebaseApp;
  public readonly auth: Auth;
  public readonly database: Firestore;

  constructor() {
    // When service is injected somewhere initialize firebase
    this.app = FirebaseWrapper.initializeApp(environment.firebase);

    // ...and initialize the services we're using
    this.auth = FirebaseWrapper.getAuth();
    this.database = FirebaseWrapper.getFirestore(this.app);
  }

  onAuthStateChanged(): Observable<FirebaseUser | null> {
    return new Observable((obs) => this.auth.onAuthStateChanged(obs));
  }

  login(email: string, password: string): Promise<UserCredential> {
    return FirebaseWrapper.signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  logout(): Promise<void> {
    return FirebaseWrapper.signOut(this.auth);
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<UserCredential> {
    const user = await FirebaseWrapper.createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await this.updateOrCreate('users', { firstName, lastName }, user.user.uid);
    return user;
  }

  async doc<T>(collectionName: string, id: string): Promise<T> {
    const docRef = FirebaseWrapper.doc(
      this.database,
      `${collectionName}/${id}`
    );
    const doc = await FirebaseWrapper.getDoc(docRef);
    const model: any = {
      id: doc.id,
      ...doc.data(),
    };

    return model;
  }

  async collection<T>(collection: string): Promise<T[]> {
    const query = FirebaseWrapper.collection(this.database, collection);

    return await this.resolveQuery<T>(query);
  }

  async query<T>(
    baseQuery: Query,
    filter: QueryCompositeFilterConstraint,
    ...constratints: QueryNonFilterConstraint[]
  ): Promise<T[]> {
    const query = FirebaseWrapper.query(baseQuery, filter, ...constratints);

    return await this.resolveQuery<T>(query);
  }

  private async resolveQuery<T>(query: Query): Promise<T[]> {
    const docs = await FirebaseWrapper.getDocs(query);

    const docList: any[] = [];
    docs.forEach((doc) => {
      const model: any = {
        id: doc.id,
        ...doc.data(),
      };

      docList.push(model);
    });

    return docList;
  }

  updateOrCreate<T>(
    collection: string,
    data: T,
    customId?: string
  ): Promise<void> {
    let docRef;

    if (customId) {
      docRef = FirebaseWrapper.doc(this.database, collection, customId);
    } else {
      docRef = FirebaseWrapper.doc(this.database, collection);
    }

    return FirebaseWrapper.setDoc(docRef, data);
  }

  delete(collection: string, id: string): Promise<void> {
    const docRef = FirebaseWrapper.doc(this.database, collection, id);
    return FirebaseWrapper.deleteDoc(docRef);
  }
}
