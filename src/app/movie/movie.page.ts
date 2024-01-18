import { Component } from '@angular/core';
import { Movie } from '../shared/interfaces/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.movieService.getMovie(id).then((res) => (this.movie = res));
    }
  }
}
