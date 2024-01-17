import { Injectable } from '@angular/core';
import { User, UserCredential } from 'firebase/auth';
import { Observable, map } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

interface UserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User | null>;

  constructor(private firebase: FirebaseService) { 
    this.user$ = this.firebase.onAuthStateChanged();
  }

  login(data: UserData): Promise<UserCredential> {
    return this.firebase.login(data.email, data.password);
  }

  logout(): Promise<void> {
    return this.firebase.logout();
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  createUser(data: UserData): Promise<UserCredential> {
    return this.firebase.createUser(data.email, data.password);
  }
}
