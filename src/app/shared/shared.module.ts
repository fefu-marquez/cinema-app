import { NgModule } from '@angular/core';
import { RateComponent } from './components/rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormatDurationPipe } from './pipes/format-duration/format-duration.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [RateComponent, FormatDurationPipe],
  exports: [RateComponent, FormatDurationPipe],
})
export class SharedModule {}
