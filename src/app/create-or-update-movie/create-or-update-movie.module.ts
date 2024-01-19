import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateOrUpdateMoviePageRoutingModule } from './create-or-update-movie-routing.module';
import { CreateOrUpdateMoviePage } from './create-or-update-movie.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrUpdateMoviePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CreateOrUpdateMoviePage]
})
export class CreateOrUpdateMoviePageModule {}
