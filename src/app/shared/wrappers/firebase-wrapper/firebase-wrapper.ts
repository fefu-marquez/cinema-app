import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseWrapper {
  initializeApp(options: FirebaseOptions, name?: string | undefined): FirebaseApp {
    return initializeApp(options, name);
  }

  getAuth(): Auth {
    return getAuth();
  }

  signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  } 

  signOut(auth: Auth): Promise<void> {
    return signOut(auth);
  }

  createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}
