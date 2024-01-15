import { Injectable } from '@angular/core';
import { Auth, EmailAuthProvider, getAuth, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';

class LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private user$: Observable<User | null>;

  constructor() { 
    this.auth = getAuth();
    this.user$ = new Observable(obs => this.auth.onAuthStateChanged(obs));
  }

  login(data: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, data.username, data.password);
  }
}
