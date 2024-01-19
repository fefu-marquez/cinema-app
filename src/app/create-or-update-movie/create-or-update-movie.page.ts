import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie/movie.service';
import { Movie } from '../shared/interfaces/movie.model';

@Component({
  selector: 'app-create-or-update-movie',
  templateUrl: './create-or-update-movie.page.html',
  styleUrls: ['./create-or-update-movie.page.scss'],
})
export class CreateOrUpdateMoviePage {
  form: UntypedFormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    summary: ['', [Validators.required]],
    posterURL: ['', [Validators.required]],
    durationHours: ['', [Validators.required, Validators.min(0)]],
    durationMinutes: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
  });
  constructor(private formBuilder: FormBuilder, private movieService: MovieService) { }

  onRateChange(rate: number) {
    this.form.get('rate')?.patchValue(rate);
  }

  createMovie() {
    if (this.form.valid){
      const movie = {
        title: this.form.value.title,
        rate: this.form.value.rate,
        summary: this.form.value.summary,
        posterURL: this.form.value.posterURL,
        duration: this.form.value.durationHours + this.form.value.durationMinutes / 60,
      }

      this.movieService.createMovie(movie);
      // TODO: Redirect user to home
      // TODO: Show error if fails
    }
  }
}
