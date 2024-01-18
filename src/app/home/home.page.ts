import { Component } from '@angular/core';
import { MovieService } from '../shared/services/movie/movie.service';
import { Movie } from '../shared/interfaces/movie.model';
type RateEvent = MouseEvent | { offsetX: number };
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  movies: Movie[];
  summaryMaxLength: number = 80;
  constructor(private movieService: MovieService) {}

  ionViewWillEnter() {
    this.movieService.getMovies().then((res) => {
      this.movies = res;
      this.movies.forEach((movie) => (movie.rate = 0));
    });
  }

  rateMovie(rate: number, movie: Movie, event: RateEvent) {
    rate += event.offsetX < 12 ? 0.5 : 1;
    movie.rate = rate;
  }

  starNames(rate: number): string[] {
    const starNames = ['star', 'star', 'star', 'star', 'star'];

    for (let i = 5; i > Math.ceil(rate); i--) {
      starNames[i - 1] += '-outline';
    }

    if (rate - Math.trunc(rate) == 0.5) {
      starNames[Math.trunc(rate)] += '-half-outline';
    }

    return starNames;
  }
}
