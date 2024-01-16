import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NavController } from '@ionic/angular';

export const AuthGuard: CanActivateFn = () => {
  let authService = inject(AuthService);
  let navController = inject(NavController);

  const isLoggedIn$ = authService.isLoggedIn();

  isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn: boolean) => {
    if (!isLoggedIn) navController.navigateRoot('/login');
  });

  return isLoggedIn$;
};
