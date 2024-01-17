import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieService } from '../shared/services/movie/movie.service';
import { IonicModule } from '@ionic/angular';
import { Movie } from '../shared/interfaces/movie.model';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  const testMovies: Movie[] = [
    {
      title: 'test',
      summary: 'test',
      posterURL: 'url',
      mpaRating: 'R',
      duration: 3.2,
    },
    {
      title: 'test',
      summary: 'test',
      posterURL: 'url',
      mpaRating: 'R',
      duration: 3.2,
    },
  ];

  beforeEach(() => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', {
      getMovies: Promise.resolve(testMovies),
    });
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies on ionViewWillEnter', async () => {
    fixture.detectChanges();
    component.ionViewWillEnter();
    await fixture.whenStable();
    expect(component.movies).toContain(testMovies[0]);
    expect(component.movies.length).toBe(2);
  });
});
