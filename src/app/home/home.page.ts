import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie/movie.service';
import { Movie } from '../shared/interfaces/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  movies: Movie[];
  constructor(private movieService: MovieService) { }

  ionViewWillEnter() {
    this.movieService.getMovies().then(res => this.movies = res);
  }
}
