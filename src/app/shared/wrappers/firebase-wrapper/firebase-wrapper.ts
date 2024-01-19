import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  Query,
  QueryCompositeFilterConstraint,
  QueryNonFilterConstraint,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from 'firebase/firestore';

export abstract class FirebaseWrapper {
  static initializeApp(
    options: FirebaseOptions,
    name?: string | undefined
  ): FirebaseApp {
    return initializeApp(options, name);
  }

  // Firebase auth methods
  static getAuth(): Auth {
    return getAuth();
  }

  static signInWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  static signOut(auth: Auth): Promise<void> {
    return signOut(auth);
  }

  static createUserWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Firestore methods
  static getFirestore(app: FirebaseApp): Firestore {
    return getFirestore(app);
  }

  static doc(
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ): DocumentReference {
    return doc(firestore, path, ...pathSegments);
  }

  static getDoc(
    documentReference: DocumentReference
  ): Promise<DocumentSnapshot> {
    return getDoc(documentReference);
  }

  static getDocs(query: Query): Promise<QuerySnapshot> {
    return getDocs(query);
  }

  static collection(firestore: Firestore, path: string): CollectionReference {
    return collection(firestore, path);
  }

  static query(
    baseQuery: Query,
    filter: QueryCompositeFilterConstraint,
    ...constratints: QueryNonFilterConstraint[]
  ): Query {
    return query(baseQuery, filter, ...constratints);
  }

  static setDoc(
    documentReference: DocumentReference,
    data: unknown
  ): Promise<void> {
    return setDoc(documentReference, data);
  }

  static addDoc(
    collectionReference: CollectionReference,
    data: unknown
  ): Promise<DocumentReference<unknown, DocumentData>> {
    return addDoc(collectionReference, data);
  }

  static deleteDoc(documentReference: DocumentReference): Promise<void> {
    return deleteDoc(documentReference);
  }
}
