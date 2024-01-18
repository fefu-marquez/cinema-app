import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Movie } from '../../interfaces/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  const testMovies: Movie[] = [
    {
      title: 'test',
      summary: 'test',
      posterURL: 'url',
      mpaRating: 'R',
      duration: 3.2,
      rate: 3,
    },
    {
      title: 'test',
      summary: 'test',
      posterURL: 'url',
      mpaRating: 'R',
      duration: 3.2,
      rate: 0,
    },
  ];

  beforeEach(() => {
    firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', {
      collection: Promise.resolve(testMovies),
    });
    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseService, useValue: firebaseServiceSpy }],
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies on getMovies', async () => {
    const movies = await service.getMovies();
    expect(movies).toContain(testMovies[0]);
    expect(movies.length).toBe(2);
  });
});
