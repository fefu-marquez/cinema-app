import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { NoAuthGuard } from './shared/guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'movie/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./movie/movie.module').then((m) => m.MoviePageModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./create-or-update-movie/create-or-update-movie.module').then( m => m.CreateOrUpdateMoviePageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./create-or-update-movie/create-or-update-movie.module').then( m => m.CreateOrUpdateMoviePageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
