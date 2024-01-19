import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrUpdateMoviePage } from './create-or-update-movie.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOrUpdateMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrUpdateMoviePageRoutingModule {}
