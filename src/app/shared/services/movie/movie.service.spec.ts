import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Movie } from '../../interfaces/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  const testMovies: Movie[] = [
    {
      id: '1',
      title: 'test',
      summary: 'test',
      posterURL: 'url',
      mpaRating: 'R',
      duration: 3.2,
      rate: 3,
    },
    {
      id: '2',
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
      doc: Promise.resolve(testMovies[0]),
      delete: Promise.resolve(),
      create: Promise.resolve(testMovies[0]),
      update: Promise.resolve(testMovies[0])
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
    expect(firebaseServiceSpy.collection).toHaveBeenCalledTimes(1);
    expect(movies).toContain(testMovies[0]);
    expect(movies.length).toBe(2);
  });

  it('should get movies on getMovies', async () => {
    const movie = await service.getMovie('id');
    expect(firebaseServiceSpy.doc).toHaveBeenCalledTimes(1);
    expect(movie.title).toEqual(testMovies[0].title);
    expect(movie.id).toEqual(testMovies[0].id);
  });

  it('should delete movie on deleteMovie', async () => {
    await service.deleteMovie('id');
    expect(firebaseServiceSpy.delete).toHaveBeenCalledTimes(1);
  });

  it('should create movie on createMovie', async () => {
    const movie = await service.createMovie({});
    expect(firebaseServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(movie.title).toEqual(testMovies[0].title);
    expect(movie.id).toEqual(testMovies[0].id);
  });

  it('should update movie on updateMovie', async () => {
    const movie = await service.updateMovie({}, 'id');
    expect(firebaseServiceSpy.update).toHaveBeenCalledTimes(1);
    expect(movie.title).toEqual(testMovies[0].title);
    expect(movie.id).toEqual(testMovies[0].id);
  });
});
