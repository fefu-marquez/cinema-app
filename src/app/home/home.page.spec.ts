import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieService } from '../shared/services/movie/movie.service';
import { IonicModule, NavController } from '@ionic/angular';
import { Movie } from '../shared/interfaces/movie.model';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  const testMovies: Movie[] = [
    {
      id: '1',
      title: 'test',
      summary: 'test',
      posterURL: '',
      mpaRating: 'R',
      duration: 3.2,
      rate: 3,
    },
    {
      id: '2',
      title: 'test',
      summary: 'test',
      posterURL: '',
      mpaRating: 'R',
      duration: 3.2,
      rate: 0,
    },
  ];
  const longMovie: Movie[] = [
    {
      id: '2',
      title: 'test',
      summary:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus justo ut aliquam eleifend. Vivamus et odio quis enim elementum ultricies eu ut nunc. Duis tempor odio sed mattis consectetur. Donec ac porttitor lacus. Vestibulum sit amet ex felis. Vivamus sodales tortor porttitor, faucibus urna ac, ultrices ante. Praesent interdum cursus tristique. Praesent elementum hendrerit tellus, eu posuere nisi accumsan in. Sed tincidunt cursus dictum. Quisque non eros nec quam varius vestibulum. Nunc nec nunc nec leo porttitor vestibulum. Nam eu malesuada quam, eu mattis nulla. Vestibulum suscipit nec lacus et rutrum. Nullam pulvinar placerat nunc, non luctus est vehicula sit amet. ',
      posterURL: '',
      mpaRating: 'R',
      duration: 3.2,
      rate: 0,
    },
  ];

  beforeEach(() => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', {
      getMovies: Promise.resolve(testMovies),
    });
    navControllerSpy = jasmine.createSpyObj('NavController', {
      navigateForward: Promise.resolve()
    });
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: NavController, useValue: navControllerSpy },
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies on ionViewWillEnter', fakeAsync(() => {
    fixture.detectChanges();
    component.ionViewWillEnter();
    tick();
    expect(component.movies).toContain(testMovies[0]);
    expect(component.movies.length).toBe(2);
  }));

  it('should not truncate short text on summary', fakeAsync(() => {
    fixture.detectChanges();
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    const text = fixture.debugElement.queryAll(By.css('div[name="Summary"]'))[0]
      .nativeElement.textContent;
    expect(text).not.toContain('...');
    expect(text).not.toContain('See more');
  }));
  
  it('should truncate long text on summary', fakeAsync(() => {
    component.summaryMaxLength = 30;
    movieServiceSpy.getMovies.and.resolveTo(longMovie);
    fixture.detectChanges();
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('div[name="Summary"]'))
      .nativeElement.textContent;
    expect(text).toContain('...');
    expect(text).toContain('See more');
    expect(text.length).toBe(30 + 4 + 8);
  }));

  it('should navigate to movie detail when user clicks movie', fakeAsync(() => {
    component.ionViewWillEnter();
    tick();
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('ion-item[name="Movie"]'))[0].nativeElement.click();
    tick();
    expect(navControllerSpy.navigateForward).toHaveBeenCalledOnceWith('/movie/1');
  }));

  it('should go to create page when user clicks add button',  () => {
    fixture.debugElement.query(By.css('ion-fab-button[name="Add"]')).nativeElement.click();
    expect(navControllerSpy.navigateForward).toHaveBeenCalledOnceWith('/create');
  });
});
