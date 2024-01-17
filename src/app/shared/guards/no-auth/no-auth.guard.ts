import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NavController } from '@ionic/angular';

export const NoAuthGuard: CanActivateFn = () => {
  let authService = inject(AuthService);
  let navController = inject(NavController);

  const isLoggedIn$ = authService.isLoggedIn();

  isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn: boolean) => {
    if (isLoggedIn) navController.navigateRoot('/home');
  });

  return isLoggedIn$.pipe(map(value => !value));
};
