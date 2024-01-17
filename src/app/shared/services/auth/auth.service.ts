import { Injectable } from '@angular/core';
import { User, UserWithProfile } from '../../interfaces/user.model';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<UserWithProfile | null>;

  constructor(private firebase: FirebaseService) {
    this.user$ = this.firebase.onAuthStateChanged().pipe(
      switchMap(user => {
        if (!!user) {
          return from(this.firebase.doc<UserWithProfile>(`users/${user.uid}`));
        } else {
          return of(null);
        }
      }));
  }

  async login(data: User): Promise<void> {
    await this.firebase.login(data.email, data.password);
  }

  logout(): Promise<void> {
    return this.firebase.logout();
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  async createUser(data: UserWithProfile): Promise<void> {
    await this.firebase.createUser(data.email, data.password, data.firstName, data.lastName);
  }
}
