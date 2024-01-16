import { Injectable } from '@angular/core';
import { User, UserCredential } from 'firebase/auth';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

class LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User | null>;

  constructor(private firebase: FirebaseService) { 
    this.user$ = this.firebase.onAuthStateChanged();
  }

  login(data: LoginData): Promise<UserCredential> {
    return this.firebase.signInWithEmailAndPassword(data.username, data.password);
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
