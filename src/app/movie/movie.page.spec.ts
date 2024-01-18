import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MoviePage } from './movie.page';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../shared/services/movie/movie.service';
import { Movie } from '../shared/interfaces/movie.model';

describe('MoviePage', () => {
  let component: MoviePage;
  let fixture: ComponentFixture<MoviePage>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  const fakeMovie: Movie = {
    id: '2',
    title: 'test',
    summary: 'test',
    posterURL: 'url',
    mpaRating: 'R',
    duration: 3.2,
    rate: 0,
  };

  beforeEach(waitForAsync(() => {
    activatedRouteSpy = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        snapshot: { paramMap: { get: () => 'id' } },
      }
    );
    movieServiceSpy = jasmine.createSpyObj('MovieService', {
      getMovie: Promise.resolve(fakeMovie),
    });
    TestBed.configureTestingModule({
      declarations: [MoviePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: MovieService, useValue: movieServiceSpy },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(MoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie data on ionViewWillEnter', fakeAsync(() => {
    component.ionViewWillEnter();
    tick();
    expect(component.movie).toEqual(fakeMovie);
    expect(movieServiceSpy.getMovie).toHaveBeenCalledOnceWith('id');
  }));

  it('should go to home if no id', fakeAsync(() => {
    component.ionViewWillEnter();
    tick();
    expect(component.movie).toEqual(fakeMovie);
    expect(movieServiceSpy.getMovie).toHaveBeenCalledOnceWith('id');
  }));
});
