import { Component } from '@angular/core';
import { MovieService } from '../shared/services/movie/movie.service';
import { Movie } from '../shared/interfaces/movie.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  movies: Movie[];
  summaryMaxLength: number = 80;
  constructor(
    private movieService: MovieService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.movieService.getMovies().then((res) => (this.movies = res));
  }

  goToMovieDetail(movie: Movie) {
    this.navController.navigateForward(`/movie/${movie.id}`);
  }
}
