import { Component } from '@angular/core';
import { Movie } from '../shared/interfaces/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie/movie.service';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private alertController: AlertController,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.movieService.getMovie(id).then((res) => (this.movie = res));
    }
  }

  async deleteMovieWarning() {
    const alert = await this.alertController.create({
      header: 'Delete movie',
      message: `Are you sure you want to delete: ${this.movie.title}?`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteMovie(),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async deleteMovie() {
    try {
      await this.alertController.dismiss();
      await this.movieService.deleteMovie(this.movie.id);
      await this.navController.navigateRoot('/home');
    } catch (error) {
      await this.showErrorToast();
    }
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
