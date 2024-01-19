import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MovieService } from '../shared/services/movie/movie.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../shared/interfaces/movie.model';

@Component({
  selector: 'app-create-or-update-movie',
  templateUrl: './create-or-update-movie.page.html',
  styleUrls: ['./create-or-update-movie.page.scss'],
})
export class CreateOrUpdateMoviePage {
  mode: 'create' | 'update';
  movieId: string;
  form: UntypedFormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    summary: ['', [Validators.required]],
    posterURL: ['', [Validators.required]],
    durationHours: ['', [Validators.required, Validators.min(0)]],
    durationMinutes: [
      '',
      [Validators.required, Validators.min(0), Validators.max(59)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private navController: NavController,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.mode = 'update';
      this.movieId = id;
      this.movieService.getMovie(this.movieId).then((res) => {
        this.form.patchValue({
          title: res.title,
          rate: res.rate,
          summary: res.summary,
          posterURL: res.posterURL,
          durationHours: Math.trunc(res.duration),
          durationMinutes: Math.round((res.duration % 1) * 60),
        });
      });
    } else {
      this.mode = 'create';
    }
  }

  onRateChange(rate: number) {
    this.form.get('rate')?.patchValue(rate);
  }

  async submit() {
    if (this.form.valid) {
      const movie = {
        title: this.form.value.title,
        rate: this.form.value.rate,
        summary: this.form.value.summary,
        posterURL: this.form.value.posterURL,
        duration:
          this.form.value.durationHours + this.form.value.durationMinutes / 60,
      };

      try {
        const model = await this.handleSubmit(movie);
        await this.navController.navigateRoot(`/movie/${model.id}`);
      } catch (error) {
        await this.showErrorToast();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  handleSubmit(movie: any): Promise<Movie> {
    if (this.mode == 'create') {
      return this.createMovie(movie);
    } else {
      return this.updateMovie(movie);
    }
  }

  private updateMovie(movie: any): Promise<Movie> {
    return this.movieService.updateMovie(movie, this.movieId);
  }

  private createMovie(movie: any): Promise<Movie> {
      return this.movieService.createMovie(movie);
  }

  
  private async showErrorToast() {
    const toast = await this.toastController.create({
      message: 'Something went wrong! Please, try again.',
      position: 'top',
      color: 'danger',
      duration: 5000,
      buttons: [
        {
          icon: 'close-circle',
          handler: () => this.toastController.dismiss(),
        },
      ],
    });
    await toast.present();
  }
}
