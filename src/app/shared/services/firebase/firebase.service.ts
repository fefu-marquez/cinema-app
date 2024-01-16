import { Injectable } from '@angular/core';
import { FirebaseWrapper } from '../../wrappers/firebase-wrapper/firebase-wrapper';
import { environment } from 'src/environments/environment';
import { Auth, UserCredential } from 'firebase/auth';

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

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.firebase.signInWithEmailAndPassword(this.getAuth(), email, password);
  }
}
