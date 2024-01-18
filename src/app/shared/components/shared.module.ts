import { NgModule } from '@angular/core';
import { RateComponent } from './rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [RateComponent],
  exports: [RateComponent],
})
export class SharedModule {}
