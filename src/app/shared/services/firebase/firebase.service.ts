import { Injectable } from '@angular/core';
import { FirebaseWrapper } from '../../wrappers/firebase-wrapper/firebase-wrapper';
import { environment } from 'src/environments/environment';
import { Auth, User, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Everything that connects to firebase should use this service

  constructor(private firebase: FirebaseWrapper) {
    // When service is injected somewhere initializes firebase
    this.firebase.initializeApp(environment.firebase);
  }

  getAuth(): Auth {
    return this.firebase.getAuth();
  }

  onAuthStateChanged(): Observable<User | null> {
    return new Observable(obs => this.getAuth().onAuthStateChanged(obs));
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.firebase.signInWithEmailAndPassword(this.getAuth(), email, password);
  }
}