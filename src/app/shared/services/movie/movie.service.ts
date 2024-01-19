import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Movie } from '../../interfaces/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly firebaseCollection = 'movies';
  constructor(private firebase: FirebaseService) {}

  getMovies(): Promise<Movie[]> {
    return this.firebase.collection<Movie>(this.firebaseCollection);
  }

  getMovie(id: string): Promise<Movie> {
    return this.firebase.doc<Movie>(this.firebaseCollection, id);
  }

  deleteMovie(id: string): Promise<void> {
    return this.firebase.delete(this.firebaseCollection, id);
  }

  createMovie(movie: any): Promise<Movie> {
    return this.firebase.create<Movie>(this.firebaseCollection, movie);
  }

  updateMovie(movie: any, id: string): Promise<Movie> {
    return this.firebase.update<Movie>(this.firebaseCollection, movie, id);
  }
}
