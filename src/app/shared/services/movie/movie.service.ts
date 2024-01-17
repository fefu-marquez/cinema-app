import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Movie } from '../../interfaces/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private firebase: FirebaseService) { }

  getMovies(): Promise<Movie[]> {
    return this.firebase.collection<Movie>('movies');
  }
}
